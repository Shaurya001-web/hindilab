/**
 * Reusable Button component with variants.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  onClick,
  disabled = false,
  className = '',
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-250 cursor-pointer select-none';

  const variants = {
    primary:
      'bg-gradient-to-r from-primary-500 to-primary-400 text-white shadow-[var(--shadow-button)] hover:shadow-[0_6px_20px_rgba(255,107,53,0.4)] hover:scale-[1.03] active:scale-[0.98]',
    secondary:
      'bg-white text-primary-600 border-2 border-primary-200 hover:border-primary-400 hover:bg-primary-50 active:scale-[0.98]',
    ghost:
      'bg-transparent text-primary-600 hover:bg-primary-50 active:scale-[0.98]',
    success:
      'bg-gradient-to-r from-success-500 to-success-400 text-white shadow-[0_4px_14px_rgba(76,175,80,0.3)] hover:scale-[1.03] active:scale-[0.98]',
    danger:
      'bg-gradient-to-r from-error-500 to-error-400 text-white shadow-[0_4px_14px_rgba(244,67,54,0.3)] hover:scale-[1.03] active:scale-[0.98]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-2.5',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${
        disabled ? 'opacity-50 cursor-not-allowed scale-100 hover:scale-100' : ''
      } ${className}`}
      {...props}
    >
      {icon && <span className="text-[1.2em]">{icon}</span>}
      {children}
    </button>
  );
}
