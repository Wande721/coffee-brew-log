export default function ConfirmDeleteModal({ brew, onConfirm, onCancel, deleting }) {
  return (
    <div className="fixed inset-0 bg-espresso/50 flex items-center justify-center p-4 z-50" role="dialog" aria-modal="true">
      <div className="bg-kraft rounded-lg shadow-xl max-w-sm w-full p-6">
        <h2 className="text-xl font-semibold mb-2">Delete this brew?</h2>
        <p className="text-sm text-espresso-light mb-5">
          "{brew.coffeeName}" ({brew.method}) will be permanently removed. This can't be undone.
        </p>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-2 rounded-md border border-espresso/25 text-sm">Cancel</button>
          <button
            onClick={onConfirm}
            disabled={deleting}
            className="px-4 py-2 rounded-md bg-cherry hover:bg-cherry-dark disabled:opacity-50 text-kraft text-sm font-medium"
          >
            {deleting ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}