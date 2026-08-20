/**
 * Wrapper component for the interactive widget cards to match the design from screenshots.
 */
export default function WidgetCard({ icon, title, category, level, children }) {
  return (
    <div className="card-static bg-white border border-border overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="p-4 sm:p-5 flex items-start gap-3 border-b border-border/50">
        <div className="w-10 h-10 rounded-xl gradient-primary text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-text-primary text-[15px] leading-tight mb-0.5">
            {title}
          </h3>
          <div className="text-[11px] text-text-muted flex items-center gap-1">
            <span>{category}</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="text-primary-500 font-medium">{level}</span>
          </div>
        </div>
      </div>
      
      {/* Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
