import { useState, useCallback, useRef } from 'react';
import { useAudioRecorder } from './useAudioRecorder';
import { useAudioPlayer } from './useAudioPlayer';
import { RECORDING_STATES } from '../utils/constants';

/**
 * Hook for the reading practice flow:
 * idle → recording → analyzing → result
 *
 * Tracks multiple attempts with scores and measures recording
 * duration for reading speed calculation.
 */
export function useReadingPractice() {
  const [state, setState] = useState(RECORDING_STATES.IDLE);
  const [scoreResult, setScoreResult] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [apiError, setApiError] = useState(null);

  const recorder = useAudioRecorder();
  const { playAudio, isPlaying, stop: stopAudio } = useAudioPlayer();
  const recordingStartRef = useRef(null);

  /**
   * Play reference audio for the passage via Sarvam TTS.
   */
  const playReference = useCallback(async (passageText) => {
    await playAudio(null, passageText);
  }, [playAudio]);

  /**
   * Start recording the student's reading.
   */
  const startRecording = useCallback(async () => {
    setState(RECORDING_STATES.RECORDING);
    setApiError(null);
    setScoreResult(null);
    recorder.resetRecording();
    recordingStartRef.current = Date.now();
    await recorder.startRecording();
  }, [recorder]);

  /**
   * Stop recording and send to backend for analysis.
   */
  const stopAndAnalyze = useCallback(async (referenceText) => {
    const blob = await recorder.stopRecording();
    const durationSec = recordingStartRef.current
      ? (Date.now() - recordingStartRef.current) / 1000
      : null;
    setState(RECORDING_STATES.ANALYZING);
    setApiError(null);

    try {
      const audioToUse = blob || recorder.audioBlob;
      if (!audioToUse) {
        setApiError('हमें आपकी आवाज़ सुनाई नहीं दी। कृपया फिर से प्रयास करें।');
        setState(RECORDING_STATES.IDLE);
        return;
      }

      const formData = new FormData();
      formData.append('audio', audioToUse, 'recording.webm');
      formData.append('referenceText', referenceText);
      if (durationSec) {
        formData.append('duration', durationSec.toString());
      }

      const response = await fetch('/api/pronunciation-score', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setScoreResult(result);
        setAttempts((prev) => [
          ...prev,
          { score: result.finalScore, timestamp: Date.now() },
        ]);
        setState(RECORDING_STATES.RESULT);

        // Auto-play the tutor's feedback
        if (result.tutorFeedbackAudio) {
          playAudio(result.tutorFeedbackAudio);
        }
      } else {
        const errData = await response.json().catch(() => ({}));
        setApiError(errData.error || 'अभी परिणाम प्राप्त नहीं हो पाया। कृपया दोबारा प्रयास करें।');
        setState(RECORDING_STATES.IDLE);
      }
    } catch (err) {
      console.error('Reading assessment error:', err);
      setApiError('अभी परिणाम प्राप्त नहीं हो पाया। कृपया दोबारा प्रयास करें।');
      setState(RECORDING_STATES.IDLE);
    }
  }, [recorder]);

  /**
   * Reset to idle to retry the same passage.
   */
  const reset = useCallback(() => {
    setState(RECORDING_STATES.IDLE);
    setScoreResult(null);
    setApiError(null);
    recorder.resetRecording();
  }, [recorder]);

  /**
   * Full reset — also clears attempt history (for new passage).
   */
  const resetFull = useCallback(() => {
    reset();
    setAttempts([]);
  }, [reset]);

  return {
    state,
    scoreResult,
    attempts,
    analyserData: recorder.analyserData,
    isRecording: recorder.isRecording,
    error: recorder.error || apiError,
    isPlayingReference: isPlaying,
    startRecording,
    stopAndAnalyze,
    playReference,
    stopAudio,
    reset,
    resetFull,
  };
}
