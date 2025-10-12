import React, { useEffect, useState } from 'react';

const apiBase = () => import.meta.env.VITE_API_URL || 'http://localhost:4000';

function Admin() {
  const [adminKey, setAdminKey] = useState(localStorage.getItem('admin_key') || '');
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (adminKey) {
      fetchAll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminKey]);

  const headers = () => ({ 'Content-Type': 'application/json', 'x-admin-key': adminKey });

  async function fetchAll() {
    setLoading(true); setError('');
    try {
      const s = await fetch(`${apiBase()}/admin/stats`, { headers: headers() });
      if (!s.ok) throw new Error('Unauthorized or server error');
      const sdata = await s.json();
      setStats(sdata);

      const res = await fetch(`${apiBase()}/admin/bookings`, { headers: headers() });
      if (!res.ok) throw new Error('Failed to fetch bookings');
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch (err) {
      setError(err.message || 'Error');
    } finally {
      setLoading(false);
    }
  }

  const saveKey = () => {
    localStorage.setItem('admin_key', adminKey);
    fetchAll();
  };

  const logout = () => {
    localStorage.removeItem('admin_key');
    setAdminKey('');
    setBookings([]);
    setStats(null);
  };

  async function updateStatus(id, status) {
    setLoading(true); setError('');
    try {
      const res = await fetch(`${apiBase()}/admin/bookings/${id}/status`, {
        method: 'PATCH', headers: headers(), body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error('Failed to update');
      const body = await res.json();
      // refresh
      await fetchAll();
      setSelected(body.booking || null);
    } catch (err) {
      setError(err.message || 'Error');
    } finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen p-8 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

        {!adminKey ? (
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="mb-2 text-sm text-gray-600">Enter admin key to continue (x-admin-key header will be sent)</p>
            <input className="w-full p-2 border rounded mb-3" value={adminKey} onChange={e => setAdminKey(e.target.value)} placeholder="admin key" />
            <div className="flex gap-2">
              <button onClick={saveKey} className="px-4 py-2 bg-blue-600 text-white rounded">Save & Load</button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="bg-white p-4 rounded-xl shadow">
                  <div className="text-sm text-gray-500">Total</div>
                  <div className="text-xl font-bold">{stats?.total ?? '—'}</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow">
                  <div className="text-sm text-gray-500">Confirmed</div>
                  <div className="text-xl font-bold text-green-600">{stats?.confirmed ?? '—'}</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow">
                  <div className="text-sm text-gray-500">Pending</div>
                  <div className="text-xl font-bold text-amber-600">{stats?.pending ?? '—'}</div>
                </div>
              </div>
              <div>
                <button onClick={logout} className="px-3 py-2 bg-red-50 text-red-700 rounded">Logout</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl shadow">
                <h2 className="font-semibold mb-3">Bookings</h2>
                {loading && <div>Loading...</div>}
                {error && <div className="text-red-600">{error}</div>}
                <div className="space-y-3 max-h-[60vh] overflow-auto">
                  {bookings.length === 0 && <div className="text-sm text-gray-500">No bookings</div>}
                  {bookings.map(b => (
                    <div key={b.id} className="p-3 border rounded flex justify-between items-center">
                      <div>
                        <div className="font-medium">{b.user?.name} — {b.room_type}</div>
                        <div className="text-sm text-gray-500">{b.start_date} → {b.end_date} • ₦{Number(b.total_price).toLocaleString()}</div>
                        <div className="text-xs text-gray-400">Status: {b.status}</div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button onClick={() => setSelected(b)} className="text-sm px-3 py-1 bg-gray-100 rounded">View</button>
                        <div className="flex gap-1">
                          <button onClick={() => updateStatus(b.id, 'CONFIRMED')} className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded">Confirm</button>
                          <button onClick={() => updateStatus(b.id, 'CANCELLED')} className="text-xs px-2 py-1 bg-red-50 text-red-700 rounded">Cancel</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow">
                <h2 className="font-semibold mb-3">Details</h2>
                {selected ? (
                  <div>
                    <div className="text-sm text-gray-500">Guest</div>
                    <div className="font-medium">{selected.user?.name} • {selected.user?.email} • {selected.user?.phone}</div>
                    <div className="mt-3 text-sm text-gray-500">Dates</div>
                    <div className="font-medium">{selected.start_date} → {selected.end_date} ({selected.pricing_breakdown?.nights} nights)</div>
                    <div className="mt-3 text-sm text-gray-500">Pricing</div>
                    <pre className="text-xs bg-gray-50 p-2 rounded">{JSON.stringify(selected.pricing_breakdown, null, 2)}</pre>
                    {selected.id_document_url && (
                      <div className="mt-3">
                        <div className="text-sm text-gray-500">ID Document</div>
                        <a className="text-blue-600" href={selected.id_document_url} target="_blank" rel="noreferrer">Open document</a>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">Select a booking to view details</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
