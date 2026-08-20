/**
 * Score calculation and feedback mapping for pronunciation assessment.
 */

/**
 * Calculate final pronunciation score from Azure Speech API components.
 * Formula: (Accuracy × 0.6) + (Fluency × 0.2) + (Completeness × 0.2)
 */
export function calculateFinalScore(accuracy, fluency, completeness) {
  return Math.round(accuracy * 0.6 + fluency * 0.2 + completeness * 0.2);
}

/**
 * Get Hindi feedback message based on score.
 */
export function getFeedback(score) {
  if (score >= 90) {
    return {
      emoji: '🌟',
      message: 'उत्कृष्ट उच्चारण!',
      messageEnglish: 'Excellent pronunciation!',
      level: 'excellent',
      color: '#4CAF50',
    };
  }
  if (score >= 75) {
    return {
      emoji: '👏',
      message: 'बहुत अच्छा!',
      messageEnglish: 'Very good!',
      level: 'great',
      color: '#FF9800',
    };
  }
  if (score >= 60) {
    return {
      emoji: '👍',
      message: 'अच्छा प्रयास!',
      messageEnglish: 'Good attempt!',
      level: 'good',
      color: '#2196F3',
    };
  }
  if (score >= 40) {
    return {
      emoji: '💪',
      message: 'थोड़ा और अभ्यास करें',
      messageEnglish: 'Practice a little more',
      level: 'practice',
      color: '#FF5722',
    };
  }
  return {
    emoji: '🔄',
    message: 'फिर से प्रयास करें',
    messageEnglish: 'Try again',
    level: 'retry',
    color: '#F44336',
  };
}

/**
 * Generate a mock pronunciation score for demo mode.
 * Returns realistic-looking scores in the 55–95 range.
 */
export function generateMockScore() {
  const accuracy = Math.floor(Math.random() * 30) + 65;
  const fluency = Math.floor(Math.random() * 25) + 70;
  const completeness = Math.floor(Math.random() * 20) + 75;
  const finalScore = calculateFinalScore(accuracy, fluency, completeness);

  return {
    accuracy,
    fluency,
    completeness,
    finalScore,
    feedback: getFeedback(finalScore),
  };
}

/**
 * Get child-friendly Hindi feedback for reading assessment scores.
 * Uses 4 tiers with encouraging, non-punitive messaging.
 */
export function getReadingFeedback(score) {
  if (score >= 90) {
    return {
      emoji: '🌟',
      message: 'उत्कृष्ट! आपने बहुत अच्छी तरह पढ़ा।',
      messageEnglish: 'Excellent! You read very well.',
      level: 'excellent',
      color: '#4CAF50',
    };
  }
  if (score >= 75) {
    return {
      emoji: '👏',
      message: 'बहुत अच्छा प्रयास! कुछ शब्दों का उच्चारण थोड़ा और स्पष्ट करें।',
      messageEnglish: 'Great attempt! Pronounce a few words more clearly.',
      level: 'great',
      color: '#FF9800',
    };
  }
  if (score >= 60) {
    return {
      emoji: '👍',
      message: 'अच्छी कोशिश! एक बार passage फिर से सुनें और धीरे-धीरे पढ़ें।',
      messageEnglish: 'Good try! Listen again and read slowly.',
      level: 'good',
      color: '#2196F3',
    };
  }
  return {
    emoji: '💪',
    message: 'कोई बात नहीं। पहले सही उच्चारण सुनें और फिर दोबारा पढ़कर देखें।',
    messageEnglish: 'No worries. Listen to the correct pronunciation and try again.',
    level: 'practice',
    color: '#FF5722',
  };
}
