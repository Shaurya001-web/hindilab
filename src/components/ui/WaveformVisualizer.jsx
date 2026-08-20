/**
 * Real-time audio waveform visualizer.
 * Renders animated bars from analyser frequency data.
 */
export default function WaveformVisualizer({ analyserData, isActive = false, barCount = 24 }) {
  // Take a subset of bars
  const bars = [];
  const step = Math.max(1, Math.floor(analyserData.length / barCount));

  for (let i = 0; i < barCount; i++) {
    const index = Math.min(i * step, analyserData.length - 1);
    const value = analyserData[index] || 0;
    // Normalize to 0–1 range, minimum height of 0.15
    const height = Math.max(0.15, value / 255);
    bars.push(height);
  }

  return (
    <div className="flex items-end justify-center gap-[3px] h-16 px-4">
      {bars.map((height, i) => (
        <div
          key={i}
          className="waveform-bar"
          style={{
            height: `${height * 100}%`,
            opacity: isActive ? 1 : 0.3,
            animationDelay: `${i * 0.05}s`,
            transition: 'height 0.1s ease, opacity 0.3s ease',
          }}
        />
      ))}
    </div>
  );
}
