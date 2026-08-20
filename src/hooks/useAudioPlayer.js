import { useState, useRef, useCallback } from 'react';

/**
 * Custom hook for audio playback and Text-to-Speech (TTS).
 * Uses Sarvam AI for TTS via backend proxy.
 */
export function useAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWord, setCurrentWord] = useState(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const animationRef = useRef(null);

  const updateProgress = useCallback(() => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      if (total > 0) {
        setProgress((current / total) * 100);
      }
    }
    animationRef.current = requestAnimationFrame(updateProgress);
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setCurrentWord(null);
    setProgress(0);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  }, []);

  const playAudio = useCallback(async (audioUrl, text) => {
    stop();
    setCurrentWord(text);

    // If an audio file URL is provided, play it
    if (audioUrl) {
      try {
        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        audio.addEventListener('loadedmetadata', () => setDuration(audio.duration));
        audio.addEventListener('ended', stop);
        audio.addEventListener('error', stop);

        await audio.play();
        setIsPlaying(true);
        updateProgress();
        return;
      } catch (err) {
        console.warn('Direct audio play failed:', err);
      }
    }

    // Otherwise, or if fallback, try Sarvam AI TTS
    if (text) {
      setIsPlaying(true);
      try {
        const response = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.base64Audio) {
            // Play base64 audio
            const audioSrc = `data:audio/wav;base64,${data.base64Audio}`;
            const audio = new Audio(audioSrc);
            audioRef.current = audio;
            
            audio.addEventListener('ended', stop);
            audio.addEventListener('error', () => {
              console.warn('Sarvam audio playback failed');
              speakHindiFallback(text);
            });

            await audio.play();
            updateProgress();
            return;
          }
        }
      } catch (err) {
        console.error('Sarvam TTS failed:', err);
      }

      // Fallback to browser TTS if Sarvam fails
      speakHindiFallback(text);
    }
  }, [stop, updateProgress]);

  const speakHindiFallback = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.8;
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = stop;
      utterance.onerror = stop;
      window.speechSynthesis.speak(utterance);
    } else {
      stop();
    }
  };

  return {
    isPlaying,
    progress,
    duration,
    currentWord,
    playAudio,
    stop
  };
}
