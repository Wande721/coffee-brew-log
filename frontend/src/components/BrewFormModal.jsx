import { useState, useEffect } from 'react';
import { BREW_METHODS, ROAST_LEVELS, GRIND_SIZES, EMPTY_BREW } from '../constants';

// Fields that must not be blank before the form can submit.
const REQUIRED_FIELDS = ['coffeeName', 'method', 'roastLevel', 'grindSize', 'brewTime', 'rating', 'notes'];

export default function BrewFormModal({ initialBrew, onSave, onClose, saving, serverError }) {
  const isEditMode = Boolean(initialBrew);
  const [form, setForm] = useState(initialBrew || EMPTY_BREW);
  const [touched, setTouched] = useState({});

  // If a different brew gets passed in while this modal is already open
  // (shouldn't normally happen, but keeps the form correct if it does).
  useEffect(() => {
    setForm(initialBrew || EMPTY_BREW);
    setTouched({});
  }, [initialBrew]);

  function fieldError(field) {
    const value = form[field];
    if (value === '' || value === null || value === undefined) return 'Required';
    if (typeof value === 'string' && value.trim() === '') return 'Required';
    return null;
  }

  const errors = Object.fromEntries(REQUIRED_FIELDS.map((f) => [f, fieldError(f)]));
  const isValid = Object.values(errors).every((e) => e === null);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleBlur(field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Mark every field as touched so all errors show if they try to
    // submit with blanks still present.
    setTouched(Object.fromEntries(REQUIRED_FIELDS.map((f) => [f, true])));
    if (!isValid) return; // hard stop — this is what blocks blank submissions
    onSave({ ...form, rating: Number(form.rating) });
  }

  const inputClass = (field) =>
    `w-full rounded-md border px-3 py-2 bg-white/70 focus:outline-none focus:ring-2 focus:ring-cherry/50 ${
      touched[field] && errors[field] ? 'border-cherry' : 'border-espresso/25'
    }`;

  return (
    <div className="fixed inset-0 bg-espresso/50 flex items-center justify-center p-4 z-50" role="dialog" aria-modal="true">
      <div className="bg-kraft rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-2xl font-semibold text-espresso">{isEditMode ? 'Edit brew' : 'Log a brew'}</h2>
          <button onClick={onClose} aria-label="Close" className="text-espresso-light hover:text-espresso text-xl leading-none">×</button>
        </div>

        {serverError && (
          <div className="mb-4 rounded-md bg-cherry/10 border border-cherry/40 text-cherry text-sm px-3 py-2">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Coffee name</label>
            <input
              type="text"
              className={inputClass('coffeeName')}
              value={form.coffeeName}
              onChange={(e) => handleChange('coffeeName', e.target.value)}
              onBlur={() => handleBlur('coffeeName')}
              placeholder="Ethiopia Yirgacheffe"
            />
            {touched.coffeeName && errors.coffeeName && <p className="text-cherry text-xs mt-1">{errors.coffeeName}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Method</label>
              <select className={inputClass('method')} value={form.method}
                onChange={(e) => handleChange('method', e.target.value)} onBlur={() => handleBlur('method')}>
                <option value="">Select…</option>
                {BREW_METHODS.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
              {touched.method && errors.method && <p className="text-cherry text-xs mt-1">{errors.method}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Roast level</label>
              <select className={inputClass('roastLevel')} value={form.roastLevel}
                onChange={(e) => handleChange('roastLevel', e.target.value)} onBlur={() => handleBlur('roastLevel')}>
                <option value="">Select…</option>
                {ROAST_LEVELS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
              {touched.roastLevel && errors.roastLevel && <p className="text-cherry text-xs mt-1">{errors.roastLevel}</p>}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Grind</label>
              <select className={inputClass('grindSize')} value={form.grindSize}
                onChange={(e) => handleChange('grindSize', e.target.value)} onBlur={() => handleBlur('grindSize')}>
                <option value="">Select…</option>
                {GRIND_SIZES.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
              {touched.grindSize && errors.grindSize && <p className="text-cherry text-xs mt-1">{errors.grindSize}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Brew time</label>
              <input type="text" className={inputClass('brewTime')} value={form.brewTime}
                onChange={(e) => handleChange('brewTime', e.target.value)} onBlur={() => handleBlur('brewTime')}
                placeholder="3:30" />
              {touched.brewTime && errors.brewTime && <p className="text-cherry text-xs mt-1">{errors.brewTime}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Rating</label>
              <select className={inputClass('rating')} value={form.rating}
                onChange={(e) => handleChange('rating', e.target.value)} onBlur={() => handleBlur('rating')}>
                <option value="">Select…</option>
                {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
              {touched.rating && errors.rating && <p className="text-cherry text-xs mt-1">{errors.rating}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tasting notes</label>
            <textarea className={inputClass('notes')} rows={3} value={form.notes}
              onChange={(e) => handleChange('notes', e.target.value)} onBlur={() => handleBlur('notes')}
              placeholder="Floral, bright acidity, hints of citrus" />
            {touched.notes && errors.notes && <p className="text-cherry text-xs mt-1">{errors.notes}</p>}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border border-espresso/25 text-sm">
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || (Object.keys(touched).length > 0 && !isValid)}
              className="px-4 py-2 rounded-md bg-cherry hover:bg-cherry-dark disabled:opacity-50 disabled:cursor-not-allowed text-kraft text-sm font-medium"
            >
              {saving ? 'Saving…' : isEditMode ? 'Save changes' : 'Log brew'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}