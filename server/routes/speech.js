import { Router } from 'express';
import multer from 'multer';
import { GoogleGenAI } from '@google/genai';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
}

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
  const ref = normalizeHindi(reference);
  const trans = normalizeHindi(transcript);

  if (!trans || trans.length === 0) {
    return { accuracy: 0, fluency: 0, completeness: 0, finalScore: 0 };
  }

  const refWords = splitWords(reference);
  const transWords = splitWords(transcript);

  if (refWords.length === 0) {
    return { accuracy: 0, fluency: 0, completeness: 0, finalScore: 0 };
  }

  const { wordResults, extraWords, stats } = compareWords(reference, transcript);

  // Word-level scoring on attempted words
  let wordScoreSum = 0;
  for (const w of wordResults) {
    if (w.status === 'correct') {
      wordScoreSum += 100;
    } else if (w.status === 'mispronounced') {
      wordScoreSum += (w.score || 60);
    }
  }

  const attemptedWords = stats.correct + stats.mispronounced;
  const completeness = Math.min(100, Math.round((attemptedWords / refWords.length) * 100));

  // Word accuracy among the attempted words
  const accuracy = attemptedWords > 0 
    ? Math.round(wordScoreSum / attemptedWords) 
    : 0;

  // Fluency: sequence and penalizing unrelated filler words
  const extraPenalty = stats.extra > 0 ? Math.min(20, stats.extra * 4) : 0;
  const fluency = Math.max(0, Math.min(100, accuracy - extraPenalty));

  // Fair scoring: rewards partial reading appropriately (50% read correctly -> ~55-65 score)
  let finalScore = 0;
  if (attemptedWords > 0) {
    const rawRatio = (stats.correct * 100 + stats.mispronounced * 60) / (refWords.length * 100);
    const attemptRatio = attemptedWords / refWords.length;
    
    // Base score from correct words ratio
    finalScore = Math.round(rawRatio * 100);

    // If child read a good chunk (e.g. 40%+ of words) with high word accuracy, give encouraging benchmark
    if (attemptRatio >= 0.35 && accuracy >= 65) {
      const benchmarkScore = Math.round(40 + (attemptRatio * 45) * (accuracy / 100));
      finalScore = Math.max(finalScore, benchmarkScore);
    }
  }

  finalScore = Math.min(100, Math.max(0, finalScore));

  return { accuracy, fluency, completeness, finalScore };
}

function getHindiFeedback(score) {
  if (score >= 90) return { emoji: '🌟', message: 'उत्कृष्ट उच्चारण!', level: 'excellent' };
  if (score >= 75) return { emoji: '👏', message: 'बहुत अच्छा!', level: 'great' };
  if (score >= 50) return { emoji: '👍', message: 'अच्छा प्रयास!', level: 'good' };
  if (score >= 30) return { emoji: '💪', message: 'थोड़ा और अभ्यास करें', level: 'practice' };
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
        
        const { wordResults, extraWords, stats } = compareWords(referenceText, transcript);
        const scores = calculateScore(referenceText, transcript);

        // Calculate reading speed if duration provided
        let readingSpeed = null;
        if (duration && duration > 0 && stats.correct > 0) {
          readingSpeed = Math.round((stats.correct / duration) * 60); // words per minute
        }

        // Call Gemini for super-fast, concise conversational tutor feedback
        let tutorFeedbackText = null;
        let tutorFeedbackAudio = null;
        
        const ai = getGeminiClient();
        if (ai && transcript && transcript.trim().length > 0) {
          try {
            const mispronouncedWords = wordResults
              .filter(w => w.status === 'mispronounced')
              .map(w => `"${w.word}" (सुना गया: "${w.heard || ''}")`)
              .slice(0, 3)
              .join(', ');

            const missingWords = wordResults
              .filter(w => w.status === 'missing')
              .map(w => `"${w.word}"`)
              .slice(0, 3)
              .join(', ');

            const prompt = `आप एक हिंदी उच्चारण शिक्षक हैं। विद्यार्थी ने एक वाक्य पढ़ा है।

पाठ: "${referenceText}"
विद्यार्थी ने बोला: "${transcript}"
स्कोर: ${scores.finalScore}%
गलत शब्द: ${mispronouncedWords || "कोई नहीं"}
छूटे शब्द: ${missingWords || "कोई नहीं"}

ठीक 3 वाक्यों में जवाब दें, एक भी वाक्य ज़्यादा या कम नहीं:
वाक्य 1: यदि स्कोर 0 है या विद्यार्थी ने कुछ और ही बोला है, तो स्पष्ट रूप से बताएं कि यह बिल्कुल गलत था। अन्यथा प्रोत्साहन दें और बताएं कि कुल मिलाकर प्रयास कैसा रहा।
वाक्य 2: बताएं कि कौन-से शब्द गलत थे और उन्हें सही कैसे बोलना है (यदि कोई शब्द सही नहीं बोला गया, तो बताएं कि दोबारा पूरा वाक्य पढ़ना होगा)।
वाक्य 3: एक बार पूरा सही वाक्य बोलकर सुनाएं, जैसे "सुनिए, इसे ऐसे बोलते हैं" कहकर।

नियम: केवल शुद्ध देवनागरी हिंदी। कोई बुलेट, तारे, हेडिंग, या अंग्रेज़ी नहीं। यह सीधा आवाज़ में बोला जाएगा।`;
            
            const llmResponse = await ai.models.generateContent({
              model: 'gemini-2.5-flash',
              contents: prompt,
              config: {
                maxOutputTokens: 2000,
                temperature: 0.7,
              }
            });
            
            tutorFeedbackText = llmResponse.text?.trim();
            
            // Get fast TTS for the short tutor feedback using Sarvam bulbul:v3
            if (tutorFeedbackText && process.env.SARVAM_API_KEY) {
              const safeTtsInput = tutorFeedbackText;

              const ttsResponse = await fetch('https://api.sarvam.ai/text-to-speech', {
                method: 'POST',
                headers: {
                  'api-subscription-key': process.env.SARVAM_API_KEY,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  inputs: [safeTtsInput],
                  target_language_code: "hi-IN",
                  speaker: "shreya",
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
              } else {
                console.error("Sarvam TTS for tutor failed:", await ttsResponse.text());
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
          speaker: "shreya",
          pace: 1.0,
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
