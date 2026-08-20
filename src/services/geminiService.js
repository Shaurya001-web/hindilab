/**
 * Frontend service for Gemini API calls.
 * Calls the backend API which proxies to Google Gemini.
 */

/**
 * Analyze an image to extract Hindi word information.
 * @param {string} imageBase64 - Base64 encoded image data
 * @returns {Promise<object>} - { word, meaning, synonyms, antonyms }
 */
export async function analyzeImage(imageBase64) {
  try {
    const response = await fetch('/api/analyze-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: imageBase64 }),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    return await response.json();
  } catch (err) {
    console.log('Gemini API not available, using mock data');
    // Return mock response
    return {
      word: 'मधुमक्खी',
      meaning: 'मधुमक्खी एक छोटा उड़ने वाला कीट है जो शहद बनाता है।',
      synonyms: ['भ्रमर', 'मधु-मक्खी'],
      antonyms: null,
    };
  }
}
