export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6" aria-label="Loading page">
      <div className="h-48 animate-pulse rounded-xl bg-slate-200" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div
            key={item}
            className="h-64 animate-pulse rounded-lg bg-slate-200"
          />
        ))}
      </div>
    </div>
  );
}
