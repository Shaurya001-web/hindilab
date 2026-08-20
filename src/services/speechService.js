/**
 * Frontend service for speech/pronunciation API calls.
 */

/**
 * Send recorded audio to backend for pronunciation scoring.
 * @param {Blob} audioBlob - Recorded audio blob
 * @param {string} referenceText - The Hindi word to compare against
 * @returns {Promise<object>} - { accuracy, fluency, completeness, finalScore, feedback }
 */
export async function getPronunciationScore(audioBlob, referenceText) {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'recording.webm');
  formData.append('referenceText', referenceText);

  const response = await fetch('/api/pronunciation-score', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Pronunciation scoring failed');
  }

  return await response.json();
}
