export default function Header({ brewCount, onNewBrew }) {
  return (
    <header className="border-b-2 border-espresso/15 pb-5 mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-cherry mb-1">Micro-Roastery Log</p>
        {/* Required title format: "Brews: {brewCount}" */}
        <h1 className="text-4xl sm:text-5xl font-bold text-espresso">
          Brews: <span className="text-cherry">{brewCount}</span>
        </h1>
      </div>
      <button
        onClick={onNewBrew}
        className="rounded-md bg-cherry hover:bg-cherry-dark transition-colors text-kraft font-medium px-5 py-2.5 shadow-sm"
      >
        + Log a brew
      </button>
    </header>
  );
}