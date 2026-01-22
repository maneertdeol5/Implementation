export default function ClientUpdateFormPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Submit weekly update
        </h2>
        <p className="text-sm text-slate-600">
          One update per client per week. Red or Yellow requires rationale.
        </p>
      </div>
      <form className="grid gap-4">
        <label className="grid gap-2 text-sm text-slate-600">
          Week ending
          <input
            type="date"
            className="rounded-md border border-slate-200 px-3 py-2 text-sm"
          />
        </label>
        <label className="grid gap-2 text-sm text-slate-600">
          Overall status
          <select className="rounded-md border border-slate-200 px-3 py-2 text-sm">
            <option>Green</option>
            <option>Yellow</option>
            <option>Red</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm text-slate-600">
          Rationale (required for Yellow or Red)
          <textarea
            rows={4}
            className="rounded-md border border-slate-200 px-3 py-2 text-sm"
            placeholder="Explain the drivers behind the current status."
          />
        </label>
        <label className="grid gap-2 text-sm text-slate-600">
          Key wins and risks
          <textarea
            rows={3}
            className="rounded-md border border-slate-200 px-3 py-2 text-sm"
            placeholder="Highlight wins, blockers, and escalations."
          />
        </label>
        <button
          type="button"
          className="w-fit rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
        >
          Save draft
        </button>
      </form>
    </div>
  );
}
