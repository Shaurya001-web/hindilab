/**
 * Loading spinner with Hindi text.
 */
export default function LoadingSpinner({ text = 'लोड हो रहा है...', size = 'md' }) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <div className={`${sizes[size]} relative`}>
        <div className="absolute inset-0 rounded-full border-3 border-primary-100" />
        <div className="absolute inset-0 rounded-full border-3 border-transparent border-t-primary-500 animate-spin" />
      </div>
      {text && (
        <p className="hindi-text text-text-secondary text-sm animate-pulse">{text}</p>
      )}
    </div>
  );
}
