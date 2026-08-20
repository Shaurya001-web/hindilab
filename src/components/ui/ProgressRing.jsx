import { useEffect, useState } from 'react';
import CountUp from './CountUp';

/**
 * Circular progress ring for displaying pronunciation scores.
 * Animates the score counting up and the ring filling.
 */
export default function ProgressRing({
  score = 0,
  size = 140,
  strokeWidth = 10,
  color = '#FF6B35',
  animated = true,
}) {
  const [offset, setOffset] = useState(2 * Math.PI * ((size - strokeWidth) / 2));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    // We delay the offset change slightly so the CSS transition triggers
    const timer = setTimeout(() => {
      setOffset(circumference - (score / 100) * circumference);
    }, 100);
    return () => clearTimeout(timer);
  }, [score, circumference]);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="score-ring">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#F0E6D9"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="progress transition-[stroke-dashoffset] duration-[1.5s] ease-out"
        />
      </svg>
      {/* Score number */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-bold leading-none"
          style={{ fontSize: size * 0.28, color }}
        >
          {animated ? (
            <CountUp from={0} to={score} duration={1.5} />
          ) : (
            score
          )}
        </span>
        <span className="text-text-muted text-xs mt-1">/ 100</span>
      </div>
    </div>
  );
}
