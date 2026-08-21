import { useState, useRef, useCallback } from 'react';

/**
 * Custom hook for audio playback and Text-to-Speech (TTS).
 * Uses Sarvam AI for TTS via backend proxy.
 */
export function useAudioPlayer() {
  const chunkQueue = useRef([]);
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
    chunkQueue.current = []; // Clear queue
    setIsPlaying(false);
    setCurrentWord(null);
    setProgress(0);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  }, []);

  const playNextChunk = useCallback(async () => {
    if (chunkQueue.current.length === 0) {
      setIsPlaying(false);
      return;
    }

    const { audioUrl, text } = chunkQueue.current.shift();
    setCurrentWord(text);
    setIsPlaying(true);

    if (audioUrl) {
      try {
        let audioSrc = audioUrl;
        if (typeof audioUrl === 'string' && !audioUrl.startsWith('http') && !audioUrl.startsWith('data:') && !audioUrl.startsWith('blob:') && !audioUrl.startsWith('/')) {
          audioSrc = `data:audio/wav;base64,${audioUrl}`;
        }

        const audio = new Audio(audioSrc);
        audioRef.current = audio;

        audio.addEventListener('loadedmetadata', () => setDuration(audio.duration));
        audio.addEventListener('ended', playNextChunk);
        audio.addEventListener('error', (e) => {
          console.warn('Audio chunk error, skipping to next:', e);
          playNextChunk();
        });

        await audio.play();
        updateProgress();
      } catch (err) {
        console.warn('Audio play failed, skipping to next:', err);
        playNextChunk();
      }
    } else if (text) {
        speakHindiFallback(text);
    } else {
        playNextChunk();
    }
  }, [updateProgress]);

  const queueAudioChunk = useCallback((audioUrl, text) => {
    chunkQueue.current.push({ audioUrl, text });
    setIsPlaying(prevIsPlaying => {
        if (!prevIsPlaying) {
            setTimeout(playNextChunk, 0); // Start playing if idle
        }
        return true; 
    });
  }, [playNextChunk]);

  const playAudio = useCallback(async (audioUrl, text) => {
    stop(); // Clear any existing queue
    queueAudioChunk(audioUrl, text);
  }, [stop, queueAudioChunk]);

  const speakHindiFallback = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.8;
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = playNextChunk; // Proceed to next chunk in queue
      utterance.onerror = playNextChunk;
      window.speechSynthesis.speak(utterance);
    } else {
      playNextChunk();
    }
  };

  return {
    isPlaying,
    progress,
    duration,
    currentWord,
    playAudio,
    queueAudioChunk,
    stop
  };
}
