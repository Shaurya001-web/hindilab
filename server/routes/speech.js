import { Router } from 'express';
import multer from 'multer';
import { GoogleGenAI } from '@google/genai';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

function levenshteinDistance(s1, s2) {
  const m = s1.length;
  const n = s2.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1, // Deletion
          dp[i][j - 1] + 1, // Insertion
          dp[i - 1][j - 1] + 1 // Substitution
        );
      }
    }
  }
  return dp[m][n];
}

/**
 * Normalize Hindi text for comparison: remove punctuation, extra spaces, lowercase.
 */
function normalizeHindi(text) {
  return text
    .replace(/[।,\.\!\?\-\:;\"\'()]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

/**
 * Split Hindi text into words, filtering empty strings.
 */
function splitWords(text) {
  return normalizeHindi(text).split(' ').filter(Boolean);
}

/**
 * Perform word-level comparison between reference and transcript.
 * Uses a simple alignment approach: for each reference word, find the best
 * match in the transcript within a sliding window.
 */
function compareWords(referenceText, transcriptText) {
  const refWords = splitWords(referenceText);
  const transWords = splitWords(transcriptText);

  if (refWords.length === 0) return { wordResults: [], stats: { correct: 0, mispronounced: 0, missing: 0, extra: 0 } };

  const wordResults = [];
  const usedTransIndices = new Set();

  // For each reference word, try to find the best matching transcript word
  for (let i = 0; i < refWords.length; i++) {
    const refWord = refWords[i];
    let bestMatch = null;
    let bestScore = Infinity;
    let bestIndex = -1;

    // Search in a window around the expected position
    const expectedPos = Math.round((i / refWords.length) * transWords.length);
    const windowSize = Math.max(3, Math.ceil(transWords.length * 0.3));

    for (let j = Math.max(0, expectedPos - windowSize); j < Math.min(transWords.length, expectedPos + windowSize); j++) {
      if (usedTransIndices.has(j)) continue;

      const dist = levenshteinDistance(refWord, transWords[j]);
      if (dist < bestScore) {
        bestScore = dist;
        bestMatch = transWords[j];
        bestIndex = j;
      }
    }

    // Decide status based on the best match quality
    const maxLen = Math.max(refWord.length, 1);
    const similarity = bestMatch ? (1 - bestScore / Math.max(refWord.length, bestMatch.length)) : 0;

    if (bestMatch && similarity >= 0.8) {
      // Good match — word read correctly
      usedTransIndices.add(bestIndex);
      wordResults.push({ word: refWord, status: 'correct', score: Math.round(similarity * 100) });
    } else if (bestMatch && similarity >= 0.4) {
      // Partial match — mispronounced
      usedTransIndices.add(bestIndex);
      wordResults.push({ word: refWord, status: 'mispronounced', score: Math.round(similarity * 100), heard: bestMatch });
    } else {
      // No match — word was missed
      wordResults.push({ word: refWord, status: 'missing', score: 0 });
    }
  }

  // Find extra words in transcript that weren't matched to any reference word
  const extraWords = transWords
    .filter((_, idx) => !usedTransIndices.has(idx))
    .map((word) => ({ word, status: 'extra', score: 0 }));

  const stats = {
    correct: wordResults.filter((w) => w.status === 'correct').length,
    mispronounced: wordResults.filter((w) => w.status === 'mispronounced').length,
    missing: wordResults.filter((w) => w.status === 'missing').length,
    extra: extraWords.length,
    total: refWords.length,
  };

  return { wordResults, extraWords, stats };
}

function calculateScore(reference, transcript) {
  // Normalize strings
  const ref = normalizeHindi(reference);
  const trans = normalizeHindi(transcript);

  if (!trans) return { accuracy: 0, fluency: 0, completeness: 0, finalScore: 0 };

  const distance = levenshteinDistance(ref, trans);
  const maxLength = Math.max(ref.length, trans.length);

  // Convert distance to a percentage score (0-100)
  let accuracy = Math.max(0, Math.round((1 - distance / maxLength) * 100));

  // If accuracy is too low (e.g. completely different word, but matching a single vowel), fail it completely
  if (accuracy < 40) {
    return { accuracy, fluency: 0, completeness: 0, finalScore: accuracy };
  }

  // Word-level comparison for fluency and completeness
  const refWords = splitWords(reference);
  const transWords = splitWords(transcript);

  // Completeness: what fraction of reference words were captured
  const { stats } = compareWords(reference, transcript);
  const completeness = refWords.length > 0
    ? Math.round(((stats.correct + stats.mispronounced) / refWords.length) * 100)
    : 0;

  // Fluency: based on word order preservation and no extra words
  const orderScore = stats.total > 0 ? (stats.correct / stats.total) : 0;
  const extraPenalty = stats.extra > 0 ? Math.min(0.2, stats.extra * 0.05) : 0;
  const fluency = Math.min(100, Math.max(0, Math.round((orderScore * 0.8 + 0.2 - extraPenalty) * 100)));

  const finalScore = Math.round(accuracy * 0.6 + fluency * 0.2 + completeness * 0.2);

  return { accuracy, fluency, completeness, finalScore };
}

function getHindiFeedback(score) {
  if (score >= 90) return { emoji: '🌟', message: 'उत्कृष्ट उच्चारण!', level: 'excellent' };
  if (score >= 75) return { emoji: '👏', message: 'बहुत अच्छा!', level: 'great' };
  if (score >= 60) return { emoji: '👍', message: 'अच्छा प्रयास!', level: 'good' };
  if (score >= 40) return { emoji: '💪', message: 'थोड़ा और अभ्यास करें', level: 'practice' };
  return { emoji: '🔄', message: 'फिर से प्रयास करें', level: 'retry' };
}

/**
 * POST /api/pronunciation-score
 * Uses Sarvam AI for Speech-to-Text and local scoring.
 * Enhanced with word-level comparison for reading assessment.
 */
router.post('/pronunciation-score', upload.single('audio'), async (req, res) => {
  try {
    const referenceText = req.body.referenceText;
    const audioBuffer = req.file?.buffer;
    const duration = req.body.duration ? parseFloat(req.body.duration) : null;

    if (!referenceText) {
      return res.status(400).json({ error: 'referenceText is required' });
    }

    if (!audioBuffer) {
      return res.status(400).json({ error: 'Audio file is required' });
    }

    if (process.env.SARVAM_API_KEY && process.env.MOCK_MODE !== 'true') {
      // Create a Blob from the Buffer for the native FormData
      const audioBlob = new Blob([audioBuffer], { type: 'audio/webm' });
      
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.webm');
      // Sarvam requires model name
      formData.append('model', 'saaras:v3');

      const response = await fetch('https://api.sarvam.ai/speech-to-text', {
        method: 'POST',
        headers: {
          'api-subscription-key': process.env.SARVAM_API_KEY,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const transcript = data.transcript || "";
        
        const scores = calculateScore(referenceText, transcript);
        const { wordResults, extraWords, stats } = compareWords(referenceText, transcript);

        // Calculate reading speed if duration provided
        let readingSpeed = null;
        if (duration && duration > 0) {
          const wordCount = splitWords(referenceText).length;
          readingSpeed = Math.round((wordCount / duration) * 60); // words per minute
        }

        // Call Gemini for conversational tutor feedback
        let tutorFeedbackText = null;
        let tutorFeedbackAudio = null;
        
        if (process.env.GEMINI_API_KEY && transcript && transcript.trim().length > 0) {
          try {
            const prompt = `You are a friendly Hindi language tutor for children. The child was supposed to read this text: "${referenceText}". They actually read this: "${transcript}". Give them very short (1-2 sentences max), encouraging feedback in Hindi (Devanagari script) on their reading. If they made a mistake (like substituting or skipping a word), gently tell them the correct pronunciation. If it was perfect, praise them enthusiastically!`;
            
            const llmResponse = await ai.models.generateContent({
              model: 'gemini-2.5-flash',
              contents: prompt,
            });
            
            tutorFeedbackText = llmResponse.text;
            
            // Get TTS for the tutor feedback
            const ttsResponse = await fetch('https://api.sarvam.ai/text-to-speech', {
              method: 'POST',
              headers: {
                'api-subscription-key': process.env.SARVAM_API_KEY,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                inputs: [tutorFeedbackText],
                target_language_code: "hi-IN",
                speaker: "meera",
                pace: 1.0,
                speech_sample_rate: 8000,
                enable_preprocessing: true,
                model: "bulbul:v3"
              }),
            });
            
            if (ttsResponse.ok) {
              const ttsData = await ttsResponse.json();
              if (ttsData.audios && ttsData.audios.length > 0) {
                tutorFeedbackAudio = ttsData.audios[0];
              }
            }
          } catch (err) {
            console.error("Gemini Tutor Feedback Error:", err);
          }
        }

        return res.json({
          transcript,
          ...scores,
          feedback: getHindiFeedback(scores.finalScore),
          wordResults,
          extraWords,
          wordStats: stats,
          readingSpeed,
          tutorFeedbackText,
          tutorFeedbackAudio,
          _source: 'sarvam'
        });
      } else {
        const errData = await response.text();
        console.error('Sarvam STT API failed:', errData);
        return res.status(502).json({ error: 'Sarvam Speech-to-Text service failed temporarily' });
      }
    }
    const accuracy = Math.floor(Math.random() * 30) + 65;
    const fluency = Math.floor(Math.random() * 25) + 70;
    const completeness = Math.floor(Math.random() * 20) + 75;
    const finalScore = Math.round(accuracy * 0.6 + fluency * 0.2 + completeness * 0.2);

    res.json({
      transcript: "मॉक ट्रांसक्रिप्ट (Mock Transcript)",
      accuracy,
      fluency,
      completeness,
      finalScore,
      feedback: getHindiFeedback(finalScore),
      wordResults: [],
      extraWords: [],
      wordStats: { correct: 0, mispronounced: 0, missing: 0, extra: 0, total: 0 },
      readingSpeed: null,
      _mock: true,
    });
  } catch (error) {
    console.error('Pronunciation scoring error:', error);
    res.status(500).json({ error: 'Pronunciation scoring failed unexpectedly' });
  }
});

/**
 * POST /api/tts
 * Uses Sarvam AI to convert text to speech.
 */
router.post('/tts', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'text is required' });
    }
    
    if (process.env.SARVAM_API_KEY && process.env.MOCK_MODE !== 'true') {
      const response = await fetch('https://api.sarvam.ai/text-to-speech', {
        method: 'POST',
        headers: {
          'api-subscription-key': process.env.SARVAM_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: [text],
          target_language_code: "hi-IN",
          speaker: "anushka",
          pace: 1.1,
          speech_sample_rate: 8000,
          enable_preprocessing: true,
          model: "bulbul:v3"
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.audios && data.audios.length > 0) {
          return res.json({ base64Audio: data.audios[0] });
        }
      } else {
        const errData = await response.text();
        console.error('Sarvam TTS API failed:', errData);
        return res.status(502).json({ error: 'Sarvam Text-to-Speech service failed temporarily' });
      }
    }
    
    res.status(503).json({ error: 'TTS unavailable or in mock mode' });
  } catch (error) {
    console.error('TTS error:', error);
    res.status(500).json({ error: 'TTS failed unexpectedly' });
  }
});

export default router;
