import { useEffect, useState } from "react";
import { api } from "./services/api.js";

export default function App() {
  const [health, setHealth] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function checkHealth() {
      try {
        const { data } = await api.get("/health");
        if (active) setHealth(data);
      } catch (err) {
        if (active) {
          setError(err.response?.data?.message || "Backend API is not reachable yet.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    checkHealth();
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
        <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">
          Step 01 · Foundation Ready
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">UFood Platform</h1>
        <p className="mt-2 text-sm text-slate-600">
          Multi-vendor food delivery starter shell connected to your Express 5 API.
        </p>

        <div className="mt-6 rounded-xl bg-slate-50 p-4 border border-slate-200">
          <h2 className="text-sm font-semibold text-slate-800">API Health Check</h2>
          {loading && <p className="mt-2 text-sm text-slate-500">Checking backend...</p>}
          {!loading && error && (
            <p className="mt-2 text-sm text-red-600">Offline: {error}</p>
          )}
          {!loading && health && (
            <dl className="mt-2 space-y-1 text-sm text-slate-700">
              <div className="flex justify-between">
                <dt className="text-slate-500">Service</dt>
                <dd className="font-mono font-medium text-teal-700">{health.service}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Environment</dt>
                <dd className="font-mono">{health.environment}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Database</dt>
                <dd className="font-mono">{health.database}</dd>
              </div>
            </dl>
          )}
        </div>
      </div>
    </main>
  );
}
