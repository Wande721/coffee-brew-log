import { BREW_METHODS } from '../constants';

export default function FilterBar({ selectedMethod, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-xs uppercase tracking-wide text-espresso-light mr-1">Filter:</span>
      <button
        onClick={() => onChange('')}
        className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
          selectedMethod === ''
            ? 'bg-espresso text-kraft border-espresso'
            : 'border-espresso/25 text-espresso hover:border-espresso/50'
        }`}
      >
        All methods
      </button>
      {BREW_METHODS.map((method) => (
        <button
          key={method}
          onClick={() => onChange(method)}
          className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
            selectedMethod === method
              ? 'bg-espresso text-kraft border-espresso'
              : 'border-espresso/25 text-espresso hover:border-espresso/50'
          }`}
        >
          {method}
        </button>
      ))}
    </div>
  );
}