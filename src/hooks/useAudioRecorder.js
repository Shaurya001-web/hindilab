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
  const [webSpeechTranscript, setWebSpeechTranscript] = useState(null);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);
  const audioContextRef = useRef(null);
  const speechRecognitionRef = useRef(null);
  const transcriptRef = useRef('');

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
      setWebSpeechTranscript(null); // Reset transcript
      chunksRef.current = [];
      transcriptRef.current = '';

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });
      streamRef.current = stream;

      // Start Web Speech API in parallel
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        speechRecognitionRef.current = new SpeechRecognition();
        speechRecognitionRef.current.lang = 'hi-IN';
        speechRecognitionRef.current.continuous = true;
        speechRecognitionRef.current.interimResults = true;

        speechRecognitionRef.current.onresult = (event) => {
          let finalTrans = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTrans += event.results[i][0].transcript;
            }
          }
          if (finalTrans) {
            transcriptRef.current += finalTrans + ' ';
            setWebSpeechTranscript(transcriptRef.current.trim());
          }
        };
        
        speechRecognitionRef.current.onerror = (e) => {
          console.warn("Web Speech API error:", e.error);
        };
        
        try {
          speechRecognitionRef.current.start();
        } catch (e) {
          console.warn("Failed to start Web Speech API", e);
        }
      }

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
      if (speechRecognitionRef.current) {
        try {
            speechRecognitionRef.current.stop();
        } catch(e) {}
      }

      if (!mediaRecorderRef.current || mediaRecorderRef.current.state === 'inactive') {
        resolve({ blob: null, webSpeechTranscript: transcriptRef.current.trim() });
        return;
      }

      mediaRecorderRef.current.onstop = () => {
        const mimeType = mediaRecorderRef.current.mimeType;
        const blob = new Blob(chunksRef.current, { type: mimeType });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        resolve({ blob, webSpeechTranscript: transcriptRef.current.trim() });
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
    setWebSpeechTranscript(null);
    transcriptRef.current = '';
    setError(null);
  }, [audioUrl]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
      if (audioContextRef.current) audioContextRef.current.close();
      if (speechRecognitionRef.current) {
          try { speechRecognitionRef.current.stop(); } catch(e) {}
      }
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, []);

  return {
    isRecording,
    audioBlob,
    audioUrl,
    error,
    analyserData,
    webSpeechTranscript,
    startRecording,
    stopRecording,
    resetRecording,
  };
}
