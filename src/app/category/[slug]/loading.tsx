export default function Loading() {
  return (
    <div>
      <div className="skeleton h-24 w-full mb-4" />
      <div className="skeleton h-16 w-full mb-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-32" />)}
      </div>
    </div>
  );
}