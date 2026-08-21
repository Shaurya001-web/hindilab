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

// Conversational Agent Route
router.post('/converse', upload.single('audio'), async (req, res) => {
  try {
    const audioBuffer = req.file?.buffer;
    const history = req.body.history ? JSON.parse(req.body.history) : [];

    if (!audioBuffer) {
      return res.status(400).json({ error: 'Audio file is required' });
    }

    const ai = getGeminiClient();
    if (!process.env.SARVAM_API_KEY || !ai) {
      return res.status(500).json({ error: 'API keys are not configured' });
    }

    // 1. Speech-to-Text (Sarvam AI)
    const audioBlob = new Blob([audioBuffer], { type: 'audio/webm' });
    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.webm');
    formData.append('model', 'saaras:v3');

    const sttResponse = await fetch('https://api.sarvam.ai/speech-to-text', {
      method: 'POST',
      headers: {
        'api-subscription-key': process.env.SARVAM_API_KEY,
      },
      body: formData,
    });

    if (!sttResponse.ok) {
      console.error('STT Failed:', await sttResponse.text());
      return res.status(502).json({ error: 'Speech-to-Text service failed' });
    }

    const sttData = await sttResponse.json();
    const userTranscript = sttData.transcript;

    if (!userTranscript || userTranscript.trim() === '') {
      return res.json({ 
        transcript: '', 
        response: 'मुझे कुछ सुनाई नहीं दिया। कृपया फिर से बोलें। (I couldn\'t hear anything. Please speak again.)',
        audioBase64: null 
      });
    }

    // 2. LLM (Google Gemini)
    // Convert client history to Gemini format (user/model)
    const geminiHistory = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: "You are a friendly, encouraging Hindi language tutor for children and beginners. Keep your responses short (1-3 sentences maximum). Always speak in Hindi using Devanagari script. Be polite, encouraging, and natural. If the user makes a mistake, gently correct them while continuing the conversation. If they say hello, ask them how their day is or what they want to practice.",
      }
    });

    // If there is history, we can't easily set it via the create method in the new SDK if we want to stream or send a new message.
    // Wait, the new SDK `ai.chats.create` doesn't take history in the same way, or it takes it in config? 
    // Actually, in the new SDK (v0.1.x), it's `history` array in the create config.
    // Let's use generateContent with the full history array directly to avoid managing chat sessions.
    
    const contents = [
      {
        role: "user",
        parts: [{ text: "System Instruction: You are a friendly, encouraging Hindi language tutor for children and beginners. Keep your responses short (1-3 sentences maximum). Always speak in Hindi using Devanagari script. Be polite, encouraging, and natural." }]
      },
      {
        role: "model",
        parts: [{ text: "नमस्ते! मैं आपका हिंदी ट्यूटर हूँ। हम बातचीत शुरू करें?" }]
      },
      ...geminiHistory,
      {
        role: "user",
        parts: [{ text: userTranscript }]
      }
    ];

    const llmResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
    });

    const aiResponseText = llmResponse.text;

    // 3. Text-to-Speech (Sarvam AI)
    let audioBase64 = null;
    const ttsResponse = await fetch('https://api.sarvam.ai/text-to-speech', {
      method: 'POST',
      headers: {
        'api-subscription-key': process.env.SARVAM_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: [aiResponseText],
        target_language_code: "hi-IN",
        speaker: "shreya", // using friendly female voice
        pace: 1.0,
        speech_sample_rate: 8000,
        enable_preprocessing: true,
        model: "bulbul:v3"
      }),
    });

    if (ttsResponse.ok) {
      const ttsData = await ttsResponse.json();
      if (ttsData.audios && ttsData.audios.length > 0) {
        audioBase64 = ttsData.audios[0];
      }
    } else {
      console.error('TTS Failed:', await ttsResponse.text());
      // we can still return the text even if TTS fails
    }

    res.json({
      transcript: userTranscript,
      response: aiResponseText,
      audioBase64: audioBase64,
    });

  } catch (error) {
    console.error('Conversation Error:', error);
    res.status(500).json({ error: 'An unexpected error occurred during the conversation pipeline.' });
  }
});

export default router;
