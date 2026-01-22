export function Header() {
  return (
    <header className="flex h-16 items-center border-b border-slate-200 bg-white px-6">
      <h1 className="text-lg font-semibold text-slate-900">
        Client Control Tower
      </h1>
      <div className="ml-auto flex items-center gap-x-4">
        {/* Placeholder for user profile */}
        <div className="h-8 w-8 rounded-full bg-slate-200" />
      </div>
    </header>
  );
}
