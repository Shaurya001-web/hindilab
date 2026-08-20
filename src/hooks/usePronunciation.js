import { useState, useCallback } from 'react';
import { useAudioRecorder } from './useAudioRecorder';
import { useAudioPlayer } from './useAudioPlayer';
import { generateMockScore } from '../utils/scoreUtils';
import { RECORDING_STATES } from '../utils/constants';

/**
 * Hook that wraps the full pronunciation scoring flow:
 * idle → listening → recording → analyzing → result
 */
export function usePronunciation() {
  const [state, setState] = useState(RECORDING_STATES.IDLE);
  const [scoreResult, setScoreResult] = useState(null);
  const recorder = useAudioRecorder();
  const { playAudio } = useAudioPlayer();

  const [apiError, setApiError] = useState(null);

  const startPractice = useCallback(async () => {
    setState(RECORDING_STATES.RECORDING);
    setApiError(null);
    recorder.resetRecording();
    await recorder.startRecording();
  }, [recorder]);

  const stopAndAnalyze = useCallback(async (word) => {
    const blob = await recorder.stopRecording();
    setState(RECORDING_STATES.ANALYZING);
    setApiError(null);

    try {
      const audioToUse = blob || recorder.audioBlob;
      if (audioToUse) {
        const formData = new FormData();
        formData.append('audio', audioToUse, 'recording.webm');
        formData.append('referenceText', word);

        const response = await fetch('/api/pronunciation-score', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          // If the backend indicates it fell back to mock due to missing API keys
          if (result._mock) {
             console.warn("Backend used mock scoring");
          }
          setScoreResult(result);
          setState(RECORDING_STATES.RESULT);
          setTimeout(() => playAudio(null, word), 500);
          return;
        } else {
          const errData = await response.json();
          setApiError(errData.error || 'Failed to analyze pronunciation');
          setState(RECORDING_STATES.IDLE);
          return;
        }
      } else {
        setApiError('No audio recorded');
        setState(RECORDING_STATES.IDLE);
        return;
      }
    } catch (err) {
      console.error('API error:', err);
      setApiError('Network error connecting to the server');
      setState(RECORDING_STATES.IDLE);
    }
  }, [recorder, playAudio]);

  const reset = useCallback(() => {
    setState(RECORDING_STATES.IDLE);
    setScoreResult(null);
    setApiError(null);
    recorder.resetRecording();
  }, [recorder]);

  return {
    state,
    scoreResult,
    analyserData: recorder.analyserData,
    isRecording: recorder.isRecording,
    error: recorder.error || apiError,
    startPractice,
    stopAndAnalyze,
    reset,
  };
}
