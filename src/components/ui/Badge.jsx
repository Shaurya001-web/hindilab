/**
 * Badge component for labels, difficulty, and tags.
 */
export default function Badge({ children, color = '#FF6B35', variant = 'filled', size = 'md', className = '' }) {
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  if (variant === 'filled') {
    return (
      <span
        className={`inline-flex items-center font-medium rounded-full ${sizes[size]} ${className}`}
        style={{ backgroundColor: color + '20', color: color }}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${sizes[size]} ${className}`}
      style={{ borderColor: color + '40', color: color }}
    >
      {children}
    </span>
  );
}
