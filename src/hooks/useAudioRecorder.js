import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Custom hook for recording audio from the microphone.
 * Uses MediaRecorder API with Web Audio API for waveform visualization.
 */
export function useAudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState(null);
  const [analyserData, setAnalyserData] = useState(new Uint8Array(32).fill(128));

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);
  const audioContextRef = useRef(null);

  const updateAnalyser = useCallback(() => {
    if (analyserRef.current) {
      const data = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(data);
      // Downsample to 32 bars
      const barCount = 32;
      const step = Math.floor(data.length / barCount);
      const bars = new Uint8Array(barCount);
      for (let i = 0; i < barCount; i++) {
        bars[i] = data[i * step];
      }
      setAnalyserData(bars);
    }
    animationRef.current = requestAnimationFrame(updateAnalyser);
  }, []);

  const startRecording = useCallback(async () => {
    try {
      setError(null);
      setAudioBlob(null);
      setAudioUrl(null);
      chunksRef.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });
      streamRef.current = stream;

      // Set up audio analysis for waveform
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      source.connect(analyserRef.current);

      // Start waveform animation
      updateAnalyser();

      // Set up MediaRecorder
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : 'audio/webm';

      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = null; // Replaced by the Promise in stopRecording

      recorder.start(100); // Collect data every 100ms
      setIsRecording(true);
    } catch (err) {
      if (err.name === 'NotAllowedError') {
        setError('माइक्रोफ़ोन की अनुमति नहीं दी गई। कृपया अनुमति दें।');
      } else {
        setError('माइक्रोफ़ोन शुरू करने में समस्या हुई।');
      }
      console.error('Recording error:', err);
    }
  }, [updateAnalyser]);

  const stopRecording = useCallback(() => {
    return new Promise((resolve) => {
      if (!mediaRecorderRef.current || mediaRecorderRef.current.state === 'inactive') {
        resolve(null);
        return;
      }

      mediaRecorderRef.current.onstop = () => {
        const mimeType = mediaRecorderRef.current.mimeType;
        const blob = new Blob(chunksRef.current, { type: mimeType });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        resolve(blob);
      };

      mediaRecorderRef.current.stop();

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }

      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }

      setIsRecording(false);
      setAnalyserData(new Uint8Array(32).fill(0));
    });
  }, []);

  const resetRecording = useCallback(() => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioBlob(null);
    setAudioUrl(null);
    setError(null);
  }, [audioUrl]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
      if (audioContextRef.current) audioContextRef.current.close();
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, []);

  return {
    isRecording,
    audioBlob,
    audioUrl,
    error,
    analyserData,
    startRecording,
    stopRecording,
    resetRecording,
  };
}
