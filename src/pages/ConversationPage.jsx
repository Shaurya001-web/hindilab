import React, { useState, useRef, useEffect } from 'react';
import Button from '../components/ui/Button';

export default function ConversationPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');
  
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const chatEndRef = useRef(null);
  const audioPlayer = useRef(new Audio());

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isProcessing]);

  const startRecording = async () => {
    try {
      setError('');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        await sendAudioToAgent(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Microphone error:', err);
      setError('Please allow microphone access to talk to the AI.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      setIsProcessing(true);
    }
  };

  const sendAudioToAgent = async (audioBlob) => {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'speech.webm');
      // Pass conversation history so the agent remembers context
      formData.append('history', JSON.stringify(history));

      const res = await fetch('/api/agent/converse', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Failed to reach the AI agent.');
      }

      const data = await res.json();
      
      const newHistory = [...history];
      if (data.transcript) {
        newHistory.push({ role: 'user', text: data.transcript });
      }
      if (data.response) {
        newHistory.push({ role: 'model', text: data.response });
      }
      
      setHistory(newHistory);
      setIsProcessing(false);

      if (data.audioBase64) {
        playAudio(data.audioBase64);
      }

    } catch (err) {
      console.error(err);
      setError('Something went wrong while talking to the AI.');
      setIsProcessing(false);
    }
  };

  const playAudio = (base64String) => {
    audioPlayer.current.src = `data:audio/wav;base64,${base64String}`;
    audioPlayer.current.play().catch(e => console.error("Audio play failed:", e));
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center pt-28 pb-20 px-4">
      <div className="w-full max-w-3xl flex flex-col h-[75vh] bg-white rounded-3xl shadow-xl overflow-hidden border border-border">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-4 text-white flex items-center gap-4 shrink-0 shadow-md z-10">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl">
            🤖
          </div>
          <div>
            <h2 className="font-bold text-xl">हिंदी AI Tutor</h2>
            <p className="text-white/80 text-sm">Practice your conversational Hindi!</p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-surface/50 flex flex-col gap-6">
          {history.length === 0 && !isProcessing && (
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
              <div className="text-6xl mb-4">🎤</div>
              <p className="font-bold text-lg text-text-primary">Press and hold the microphone to say hello!</p>
              <p className="text-text-secondary mt-2">Example: "नमस्ते! आप कैसे हैं?"</p>
            </div>
          )}

          {history.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-primary-500 text-white rounded-br-none' 
                    : 'bg-white border border-border text-text-primary rounded-bl-none hindi-text text-lg leading-relaxed'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-white border border-border p-4 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <span className="text-sm text-text-muted ml-2">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Controls */}
        <div className="p-6 bg-white border-t border-border flex flex-col items-center justify-center shrink-0">
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          
          <button
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            onTouchStart={startRecording}
            onTouchEnd={stopRecording}
            disabled={isProcessing}
            className={`
              relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg
              ${isProcessing ? 'bg-gray-200 cursor-not-allowed opacity-50' : 
                isRecording ? 'bg-red-500 scale-110 shadow-red-500/50' : 'bg-primary-500 hover:bg-primary-600 hover:scale-105'}
            `}
          >
            {/* Pulsing ring when recording */}
            {isRecording && (
              <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping opacity-75"></div>
            )}
            
            <svg 
              className={`w-10 h-10 ${isRecording ? 'text-white' : 'text-white'}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isRecording ? (
                // Stop icon
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              ) : (
                // Mic icon
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              )}
            </svg>
          </button>
          
          <p className="text-text-muted text-sm mt-4 font-medium">
            {isRecording ? 'Release to send...' : 'Hold to speak in Hindi'}
          </p>
        </div>

      </div>
    </div>
  );
}
