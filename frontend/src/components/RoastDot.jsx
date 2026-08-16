const ROAST_COLORS = {
  Light: 'bg-roast-light',
  Medium: 'bg-roast-medium',
  Dark: 'bg-roast-dark',
};

export default function RoastDot({ level }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-2.5 w-2.5 rounded-full ${ROAST_COLORS[level] || 'bg-espresso-light'}`} />
      <span className="text-xs uppercase tracking-wide text-espresso-light">{level}</span>
    </span>
  );
}