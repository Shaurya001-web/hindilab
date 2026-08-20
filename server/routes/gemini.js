import { Router } from 'express';

const router = Router();

/**
 * POST /api/analyze-image
 * Analyze an image and return Hindi word information.
 * Uses Gemini API if key is available, otherwise returns mock data.
 */
router.post('/analyze-image', async (req, res) => {
  try {
    const { image } = req.body;

    if (!image || typeof image !== 'string') {
      return res.status(400).json({ error: 'Valid base64 image data is required' });
    }

    // Check if Gemini API key is available
    if (process.env.GEMINI_API_KEY && process.env.MOCK_MODE !== 'true') {
      // Real Gemini API call
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Identify the object in this image and return a JSON object with:
1. "word": The Hindi word for the object
2. "meaning": A simple meaning in Hindi suitable for children (1-2 sentences)
3. "synonyms": An array of Hindi synonyms (2-3 if available)
4. "antonyms": An array of Hindi antonyms (only if real/valid antonyms exist, otherwise null)

Return ONLY the JSON object, no other text.`,
                  },
                  {
                    inline_data: {
                      mime_type: 'image/jpeg',
                      data: image,
                    },
                  },
                ],
              },
            ],
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        // Parse JSON from the response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const result = JSON.parse(jsonMatch[0]);
          return res.json(result);
        }
      }
    }

    // Mock response
    res.json({
      word: 'मधुमक्खी',
      meaning: 'मधुमक्खी एक छोटा उड़ने वाला कीट है जो शहद बनाता है।',
      synonyms: ['भ्रमर', 'मधु-मक्खी'],
      antonyms: null,
      _mock: true,
    });
  } catch (error) {
    console.error('Gemini API error:', error);
    res.status(500).json({ error: 'Image analysis failed unexpectedly' });
  }
});

export default router;
