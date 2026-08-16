import BrewCard from './BrewCard';

export default function BrewList({ brews, onEdit, onDelete, loading }) {
  if (loading) {
    return <p className="text-espresso-light">Loading brews…</p>;
  }

  if (brews.length === 0) {
    return (
      <div className="border-2 border-dashed border-espresso/20 rounded-lg p-10 text-center">
        <p className="text-lg text-espresso-light">No brews logged yet.</p>
        <p className="text-sm text-espresso-light/80 mt-1">Log your first brew to start the record.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {brews.map((brew) => (
        <BrewCard key={brew.id} brew={brew} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}