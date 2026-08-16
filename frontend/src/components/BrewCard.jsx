import RoastDot from './RoastDot';

function Stars({ rating }) {
  return (
    <span className="text-sm text-cherry" aria-label={`${rating} out of 5 stars`}>
      {'★'.repeat(rating)}
      <span className="text-espresso/20">{'★'.repeat(5 - rating)}</span>
    </span>
  );
}

export default function BrewCard({ brew, onEdit, onDelete }) {
  return (
    <article className="bg-white/40 border border-espresso/15 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="inline-block text-[11px] uppercase tracking-wide bg-espresso text-kraft rounded px-2 py-0.5">
            {brew.method}
          </span>
          <h2 className="text-xl font-semibold mt-2 text-espresso">{brew.coffeeName}</h2>
        </div>
        <Stars rating={brew.rating} />
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
        <RoastDot level={brew.roastLevel} />
        <span className="text-xs text-espresso-light">Grind: {brew.grindSize}</span>
        <span className="text-xs text-espresso-light">Time: {brew.brewTime}</span>
      </div>

      <p className="text-sm text-espresso-light leading-relaxed flex-1">{brew.notes}</p>

      <div className="flex gap-2 pt-2 border-t border-espresso/10">
        <button
          onClick={() => onEdit(brew)}
          className="text-sm px-3 py-1.5 rounded border border-espresso/25 hover:bg-espresso/5 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(brew)}
          className="text-sm px-3 py-1.5 rounded border border-cherry/40 text-cherry hover:bg-cherry/10 transition-colors"
        >
          Delete
        </button>
      </div>
    </article>
  );
}