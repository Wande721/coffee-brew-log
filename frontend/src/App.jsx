import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import BrewList from './components/BrewList';
import BrewFormModal from './components/BrewFormModal';
import ConfirmDeleteModal from './components/ConfirmDeleteModal';
import { fetchBrews, createBrew, updateBrew, deleteBrew } from './api/brews';

export default function App() {
  const [brews, setBrews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [methodFilter, setMethodFilter] = useState('');

  const [formOpen, setFormOpen] = useState(false);
  const [editingBrew, setEditingBrew] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadBrews = useCallback(async (method) => {
    setLoading(true);
    setLoadError(null);
    try {
      const data = await fetchBrews(method || undefined);
      setBrews(data);
    } catch (err) {
      setLoadError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBrews(methodFilter);
  }, [methodFilter, loadBrews]);

  useEffect(() => {
    document.title = `Brews: ${brews.length}`;
  }, [brews.length]);

  function openCreateForm() {
    setEditingBrew(null);
    setFormError(null);
    setFormOpen(true);
  }

  function openEditForm(brew) {
    setEditingBrew(brew);
    setFormError(null);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingBrew(null);
    setFormError(null);
  }

  async function handleSave(formValues) {
    setSaving(true);
    setFormError(null);
    try {
      if (editingBrew) {
        const updated = await updateBrew(editingBrew.id, formValues);
        setBrews((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
      } else {
        const created = await createBrew(formValues);
        if (!methodFilter || created.method === methodFilter) {
          setBrews((prev) => [created, ...prev]);
        }
      }
      closeForm();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleConfirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteBrew(deleteTarget.id);
      setBrews((prev) => prev.filter((b) => b.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      setLoadError(err.message);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Header brewCount={brews.length} onNewBrew={openCreateForm} />
        <FilterBar selectedMethod={methodFilter} onChange={setMethodFilter} />

        {loadError && (
          <div className="mb-4 rounded-md bg-cherry/10 border border-cherry/40 text-cherry text-sm px-3 py-2">
            {loadError}
          </div>
        )}

        <BrewList brews={brews} onEdit={openEditForm} onDelete={setDeleteTarget} loading={loading} />
      </div>

      {formOpen && (
        <BrewFormModal
          initialBrew={editingBrew}
          onSave={handleSave}
          onClose={closeForm}
          saving={saving}
          serverError={formError}
        />
      )}

      {deleteTarget && (
        <ConfirmDeleteModal
          brew={deleteTarget}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTarget(null)}
          deleting={deleting}
        />
      )}
    </div>
  );
}