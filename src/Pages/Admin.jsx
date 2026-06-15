import React, { useEffect, useState, useCallback, useRef } from 'react';
import { backendUrl } from '../App';
import {
  Wifi, Wind, Monitor, Zap, Shield, Activity, Briefcase,
  Sun, Droplet, RefreshCw, Coffee, MapPin, Anchor, SlidersHorizontal,
} from 'lucide-react';

// ── Predefined amenity options ──────────────────────────────────────────────
const AMENITY_OPTIONS = [
  { name: 'High-Speed WiFi',          Icon: Wifi },
  { name: 'Full Kitchen',             Icon: Coffee },
  { name: 'Shared Kitchen',           Icon: Coffee },
  { name: 'Air Conditioning',         Icon: Wind },
  { name: 'Smart TV',                 Icon: Monitor },
  { name: 'DSTV / Cable TV',          Icon: Monitor },
  { name: 'Free Parking',             Icon: MapPin },
  { name: 'Private Balcony',          Icon: Sun },
  { name: 'Private Bathroom',         Icon: Droplet },
  { name: 'Washing Machine',          Icon: RefreshCw },
  { name: 'Generator / Backup Power', Icon: Zap },
  { name: 'Security / Gated',         Icon: Shield },
  { name: 'Swimming Pool',            Icon: Anchor },
  { name: 'Gym / Fitness',            Icon: Activity },
  { name: 'Work Desk',                Icon: Briefcase },
  { name: 'Iron & Board',             Icon: SlidersHorizontal },
];

const DUMMY_PROPERTIES = [
  {
    room_key: 'entire', name: '2 Bedroom Apartment',
    subtitle: 'Spacious luxury apartment perfect for families',
    description: 'Experience luxury in our spacious 2-bedroom apartment. Featuring modern amenities, a fully equipped kitchen, elegant living spaces, and stunning balconies with breathtaking views.',
    category: 'Entire Apartment', base_price: 100000, max_guests: 4, min_nights: 1,
    bedrooms: 2, bathrooms: 2, sort_order: 1, property_group: 'main', blocks_group: true,
    amenities: ['High-Speed WiFi', 'Full Kitchen', 'Air Conditioning', 'Smart TV', 'Free Parking', 'Private Balcony'],
  },
  {
    room_key: 'room1', name: '1 Bedroom Suite',
    subtitle: 'Cozy and elegant for solo travelers or couples',
    description: 'Your perfect retreat awaits! This beautifully designed 1-bedroom suite offers comfort and privacy with access to premium shared spaces.',
    category: 'Private Room', base_price: 60000, max_guests: 2, min_nights: 2,
    bedrooms: 1, bathrooms: 1, sort_order: 2, property_group: 'main', blocks_group: false,
    amenities: ['High-Speed WiFi', 'Shared Kitchen', 'Air Conditioning', 'Private Bathroom'],
  },
];

const DUMMY_DISCOUNTS = [
  { code: 'WELCOME10', type: 'percentage', value: 10, description: '10% off for new guests',   usage_limit: 100, min_nights: 1, min_amount: 0 },
  { code: 'SUMMER20',  type: 'percentage', value: 20, description: '20% summer discount',       expiry_date: '2026-09-30', min_nights: 2, min_amount: 0 },
  { code: 'FLAT5000',  type: 'fixed',      value: 5000, description: 'Flat ₦5,000 off',         min_nights: 1, min_amount: 30000 },
  { code: 'WEEKLY5',   type: 'percentage', value: 5,  description: '5% off weekly stays',        min_nights: 7, min_amount: 0 },
  { code: 'VIP15',     type: 'percentage', value: 15, description: 'VIP guest — 15% off',        usage_limit: 50, min_nights: 1, min_amount: 0 },
];

const EMPTY_PROPERTY = {
  room_key: '', name: '', subtitle: '', description: '', category: 'Private Room',
  base_price: '', max_guests: 2, min_nights: 1, bedrooms: 1, bathrooms: 1,
  amenities: [], sort_order: 99, ical_urls: '', property_group: '', blocks_group: false,
};
const EMPTY_DISCOUNT = { code: '', type: 'percentage', value: '', description: '', usage_limit: '', min_nights: 1, min_amount: 0, expiry_date: '' };

// ── Small components ────────────────────────────────────────────────────────
function Badge({ children, color = 'gray' }) {
  const map = { green: 'bg-green-100 text-green-700', red: 'bg-red-100 text-red-700', amber: 'bg-amber-100 text-amber-700', blue: 'bg-blue-100 text-blue-700', gray: 'bg-gray-100 text-gray-600' };
  return <span className={`px-2 py-0.5 rounded text-xs font-semibold ${map[color]}`}>{children}</span>;
}

function AmenitiesPicker({ selected = [], onChange }) {
  const toggle = (name) =>
    onChange(selected.includes(name) ? selected.filter(a => a !== name) : [...selected, name]);
  return (
    <div className="grid grid-cols-2 gap-1.5">
      {AMENITY_OPTIONS.map(({ name, Icon }) => (
        <label key={name}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition select-none
            ${selected.includes(name) ? 'bg-blue-50 border-blue-400 text-blue-700' : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'}`}>
          <input type="checkbox" checked={selected.includes(name)} onChange={() => toggle(name)} className="sr-only" />
          <Icon size={14} className="shrink-0" />
          <span className="text-xs font-medium">{name}</span>
        </label>
      ))}
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────
function Admin() {
  const [adminKey, setAdminKey] = useState(localStorage.getItem('admin_key') || '');
  const [tab, setTab] = useState('bookings');

  // Bookings
  const [bookings, setBookings]   = useState([]);
  const [stats, setStats]         = useState(null);
  const [selected, setSelected]   = useState(null);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');

  // Properties
  const [properties, setProperties]   = useState([]);
  const [showPropForm, setShowPropForm] = useState(false);
  const [propForm, setPropForm]       = useState(EMPTY_PROPERTY);
  const [propLoading, setPropLoading] = useState(false);
  const [propMsg, setPropMsg]         = useState('');
  const [editingKey, setEditingKey]   = useState(null);
  const [editForm, setEditForm]       = useState({});
  const [imgUploading, setImgUploading] = useState(false);
  const imgInputRef = useRef(null);

  // Discounts
  const [discounts, setDiscounts]     = useState([]);
  const [showDiscForm, setShowDiscForm] = useState(false);
  const [discForm, setDiscForm]       = useState(EMPTY_DISCOUNT);
  const [discLoading, setDiscLoading] = useState(false);
  const [discMsg, setDiscMsg]         = useState('');

  const [syncLoading, setSyncLoading] = useState(false);
  const [syncMsg, setSyncMsg]         = useState('');

  const headers = useCallback(() => ({ 'Content-Type': 'application/json', 'x-admin-key': adminKey }), [adminKey]);

  // ── Data fetchers ──────────────────────────────────────────────────────────
  const fetchBookings = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const res = await fetch(`${backendUrl}/api/admin/bookings`, { headers: headers() });
      if (!res.ok) throw new Error('Unauthorized or server error');
      const d = await res.json();
      const list = d.bookings?.users || d.bookings?.all || (Array.isArray(d.bookings) ? d.bookings : []);
      setBookings(list);
      setStats({
        total: list.length,
        confirmed: list.filter(b => b.status === 'confirmed').length,
        pending: list.filter(b => !['confirmed', 'cancelled', 'blocked'].includes(b.status)).length,
      });
    } catch (err) { setError(err.message || 'Error'); }
    finally { setLoading(false); }
  }, [headers]);

  const fetchProperties = useCallback(async () => {
    setPropLoading(true); setPropMsg('');
    try {
      const res = await fetch(`${backendUrl}/api/admin/properties`, { headers: headers() });
      const d = await res.json();
      if (d.success) setProperties(d.properties || []);
      else setPropMsg(d.message || 'Failed to load properties');
    } catch { setPropMsg('Network error'); }
    finally { setPropLoading(false); }
  }, [headers]);

  const fetchDiscounts = useCallback(async () => {
    setDiscLoading(true); setDiscMsg('');
    try {
      const res = await fetch(`${backendUrl}/api/admin/discounts`, { headers: headers() });
      const d = await res.json();
      if (d.success) setDiscounts(d.discounts || []);
      else setDiscMsg(d.message || 'Failed to load discounts');
    } catch { setDiscMsg('Network error'); }
    finally { setDiscLoading(false); }
  }, [headers]);

  useEffect(() => {
    if (adminKey) { fetchBookings(); fetchProperties(); fetchDiscounts(); }
  }, [adminKey, fetchBookings, fetchProperties, fetchDiscounts]);

  // ── Auth ──────────────────────────────────────────────────────────────────
  const saveKey = (k) => { const key = k ?? adminKey; localStorage.setItem('admin_key', key); setAdminKey(key); };
  const logout  = () => { localStorage.removeItem('admin_key'); setAdminKey(''); setBookings([]); setStats(null); setProperties([]); setDiscounts([]); };

  // ── Bookings ──────────────────────────────────────────────────────────────
  const deleteBooking = async (id) => {
    if (!window.confirm('Delete this booking?')) return;
    setLoading(true);
    try { await fetch(`${backendUrl}/api/admin/bookings/${id}`, { method: 'DELETE', headers: headers() }); await fetchBookings(); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  // ── iCal sync ────────────────────────────────────────────────────────────
  const triggerSync = async () => {
    setSyncLoading(true); setSyncMsg('');
    try {
      const res = await fetch(`${backendUrl}/api/admin/sync`, { method: 'POST', headers: headers() });
      const d = await res.json();
      setSyncMsg(d.success ? `Sync done — +${d.newBookings ?? 0} new, ~${d.updatedBookings ?? 0} updated` : (d.message || 'Sync failed'));
      if (d.success) fetchBookings();
    } catch { setSyncMsg('Network error during sync'); }
    finally { setSyncLoading(false); }
  };

  // ── Properties CRUD ───────────────────────────────────────────────────────
  const seedProperties = async () => {
    setPropLoading(true); setPropMsg('');
    let created = 0, skipped = 0;
    for (const p of DUMMY_PROPERTIES) {
      const res = await fetch(`${backendUrl}/api/admin/properties`, { method: 'POST', headers: headers(), body: JSON.stringify(p) });
      (await res.json()).success ? created++ : skipped++;
    }
    setPropMsg(`Seeded: ${created} created, ${skipped} skipped.`);
    fetchProperties();
  };

  const createProperty = async (e) => {
    e.preventDefault(); setPropLoading(true); setPropMsg('');
    try {
      const payload = {
        ...propForm,
        amenities: Array.isArray(propForm.amenities) ? propForm.amenities : [],
        ical_urls: propForm.ical_urls ? propForm.ical_urls.split('\n').map(s => s.trim()).filter(Boolean) : [],
      };
      const res = await fetch(`${backendUrl}/api/admin/properties`, { method: 'POST', headers: headers(), body: JSON.stringify(payload) });
      const d = await res.json();
      if (d.success) { setPropMsg('Property created.'); setShowPropForm(false); setPropForm(EMPTY_PROPERTY); fetchProperties(); }
      else setPropMsg(d.message || 'Failed');
    } catch { setPropMsg('Network error'); }
    finally { setPropLoading(false); }
  };

  const startEdit = (p) => {
    setEditingKey(p.room_key);
    setEditForm({
      ...p,
      amenities: Array.isArray(p.amenities) ? p.amenities.map(a => typeof a === 'string' ? a : a.name) : [],
      ical_urls: Array.isArray(p.ical_urls) ? p.ical_urls.join('\n') : '',
    });
    setShowPropForm(false);
    setPropMsg('');
  };

  const saveEdit = async (e) => {
    e.preventDefault(); setPropLoading(true); setPropMsg('');
    try {
      const payload = {
        ...editForm,
        amenities: Array.isArray(editForm.amenities) ? editForm.amenities : [],
        ical_urls: typeof editForm.ical_urls === 'string'
          ? editForm.ical_urls.split('\n').map(s => s.trim()).filter(Boolean)
          : editForm.ical_urls,
      };
      delete payload.room_key;
      const res = await fetch(`${backendUrl}/api/admin/properties/${editingKey}`, { method: 'PUT', headers: headers(), body: JSON.stringify(payload) });
      const d = await res.json();
      if (d.success) { setPropMsg('Property updated.'); setEditingKey(null); fetchProperties(); }
      else setPropMsg(d.message || 'Update failed');
    } catch { setPropMsg('Network error'); }
    finally { setPropLoading(false); }
  };

  const deleteProperty = async (room_key) => {
    if (!window.confirm(`Deactivate property "${room_key}"?`)) return;
    await fetch(`${backendUrl}/api/admin/properties/${room_key}`, { method: 'DELETE', headers: headers() });
    fetchProperties();
  };

  // ── Image upload / remove ─────────────────────────────────────────────────
  const uploadImage = async (file) => {
    setImgUploading(true); setPropMsg('');
    try {
      const fd = new FormData();
      fd.append('image', file);
      const res = await fetch(`${backendUrl}/api/admin/properties/${editingKey}/images`, {
        method: 'POST',
        headers: { 'x-admin-key': adminKey }, // no Content-Type — browser sets multipart boundary
        body: fd,
      });
      const d = await res.json();
      if (d.success) { setEditForm(ef => ({ ...ef, images: d.property?.images || [...(ef.images || []), d.url] })); setPropMsg('Image uploaded.'); }
      else setPropMsg(d.message || 'Upload failed');
    } catch { setPropMsg('Upload error'); }
    finally { setImgUploading(false); }
  };

  const removeImage = async (url) => {
    if (!window.confirm('Remove this image?')) return;
    const res = await fetch(`${backendUrl}/api/admin/properties/${editingKey}/images`, {
      method: 'DELETE', headers: headers(), body: JSON.stringify({ image_url: url }),
    });
    const d = await res.json();
    if (d.success) setEditForm(ef => ({ ...ef, images: d.property?.images || (ef.images || []).filter(u => u !== url) }));
  };

  // ── Discounts CRUD ────────────────────────────────────────────────────────
  const seedDiscounts = async () => {
    setDiscLoading(true); setDiscMsg('');
    let created = 0, skipped = 0;
    for (const d of DUMMY_DISCOUNTS) {
      const res = await fetch(`${backendUrl}/api/admin/discounts`, { method: 'POST', headers: headers(), body: JSON.stringify(d) });
      (await res.json()).success ? created++ : skipped++;
    }
    setDiscMsg(`Seeded: ${created} created, ${skipped} skipped.`);
    fetchDiscounts();
  };

  const createDiscount = async (e) => {
    e.preventDefault(); setDiscLoading(true); setDiscMsg('');
    try {
      const res = await fetch(`${backendUrl}/api/admin/discounts`, { method: 'POST', headers: headers(), body: JSON.stringify(discForm) });
      const d = await res.json();
      if (d.success) { setDiscMsg('Discount code created.'); setShowDiscForm(false); setDiscForm(EMPTY_DISCOUNT); fetchDiscounts(); }
      else setDiscMsg(d.message || 'Failed');
    } catch { setDiscMsg('Network error'); }
    finally { setDiscLoading(false); }
  };

  const toggleDiscount = async (disc) => {
    await fetch(`${backendUrl}/api/admin/discounts/${disc.id}`, { method: 'PUT', headers: headers(), body: JSON.stringify({ is_active: !disc.is_active }) });
    fetchDiscounts();
  };

  const deleteDiscount = async (id) => {
    if (!window.confirm('Delete this discount code?')) return;
    await fetch(`${backendUrl}/api/admin/discounts/${id}`, { method: 'DELETE', headers: headers() });
    fetchDiscounts();
  };

  // ── Login screen ──────────────────────────────────────────────────────────
  if (!adminKey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-8">
        <div className="bg-white p-8 rounded-xl shadow max-w-sm w-full">
          <h1 className="text-xl font-bold mb-4">Admin Login</h1>
          <input className="w-full p-2 border rounded mb-3 text-sm" value={adminKey}
            onChange={e => setAdminKey(e.target.value)} onKeyDown={e => e.key === 'Enter' && saveKey()}
            placeholder="Admin key" type="password" />
          <button onClick={() => saveKey()} className="w-full px-4 py-2 bg-blue-600 text-white rounded font-semibold">Login</button>
        </div>
      </div>
    );
  }

  // ── Dashboard ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold text-slate-800">Admin Dashboard</h1>
            <nav className="flex gap-1">
              {['bookings', 'properties', 'discounts'].map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold capitalize transition ${tab === t ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
                  {t}
                </button>
              ))}
            </nav>
          </div>
          <button onClick={logout} className="px-3 py-1.5 bg-red-50 text-red-700 rounded text-sm font-semibold">Logout</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">

        {/* ════════════════════ BOOKINGS TAB ════════════════════ */}
        {tab === 'bookings' && (
          <div>
            <div className="flex gap-4 mb-6 flex-wrap">
              {[{ label: 'Total', val: stats?.total, color: 'text-slate-800' }, { label: 'Confirmed', val: stats?.confirmed, color: 'text-green-600' }, { label: 'Pending', val: stats?.pending, color: 'text-amber-600' }]
                .map(s => (
                  <div key={s.label} className="bg-white p-4 rounded-xl shadow-sm border">
                    <div className="text-xs text-gray-500 mb-1">{s.label}</div>
                    <div className={`text-2xl font-bold ${s.color}`}>{s.val ?? '—'}</div>
                  </div>
                ))}
            </div>
            {loading && <div className="text-sm text-gray-500 mb-3">Loading...</div>}
            {error   && <div className="text-red-600 text-sm mb-3">{error}</div>}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-sm border p-4">
                <h2 className="font-semibold mb-3 text-slate-700">Bookings</h2>
                <div className="space-y-2 max-h-[65vh] overflow-auto">
                  {bookings.length === 0 && <div className="text-sm text-gray-400">No bookings yet</div>}
                  {bookings.map(b => (
                    <div key={b.id} className="p-3 border rounded-lg hover:border-blue-200 transition">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <div className="font-medium text-sm">{b.name || b.user?.name} — <span className="text-gray-500">{b.room_type}</span></div>
                          <div className="text-xs text-gray-400 mt-0.5">{b.check_in || b.start_date} → {b.check_out || b.end_date} • ₦{Number(b.price || b.total_price || 0).toLocaleString()}</div>
                          <div className="mt-1">
                            <Badge color={b.status === 'confirmed' ? 'green' : b.status === 'cancelled' ? 'red' : 'amber'}>{b.status}</Badge>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 shrink-0">
                          <button onClick={() => setSelected(b)} className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">View</button>
                          <button onClick={() => deleteBooking(b.id)} className="text-xs px-2 py-1 bg-red-50 text-red-700 rounded">Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border p-4">
                <h2 className="font-semibold mb-3 text-slate-700">Booking Details</h2>
                {selected ? (
                  <div className="text-sm space-y-3">
                    <div><p className="text-xs text-gray-500 mb-0.5">Guest</p><p className="font-medium">{selected.name || selected.user?.name} • {selected.email || selected.user?.email} • {selected.phone || selected.user?.phone}</p></div>
                    <div><p className="text-xs text-gray-500 mb-0.5">Dates</p><p className="font-medium">{selected.check_in || selected.start_date} → {selected.check_out || selected.end_date}</p></div>
                    <div><p className="text-xs text-gray-500 mb-0.5">Room</p><p className="font-medium">{selected.room_type}</p></div>
                    <div><p className="text-xs text-gray-500 mb-0.5">Amount</p><p className="font-medium">₦{Number(selected.price || selected.total_price || 0).toLocaleString()}</p></div>
                    {selected.id_file_url && <div><p className="text-xs text-gray-500 mb-0.5">ID Document</p><a className="text-blue-600 underline" href={selected.id_file_url} target="_blank" rel="noreferrer">View document</a></div>}
                  </div>
                ) : <p className="text-sm text-gray-400">Select a booking to view details</p>}
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════ PROPERTIES TAB ════════════════════ */}
        {tab === 'properties' && (
          <div>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h2 className="font-semibold text-slate-700">Properties ({properties.length})</h2>
              <div className="flex gap-2 flex-wrap">
                <button onClick={triggerSync} disabled={syncLoading}
                  className="px-3 py-1.5 bg-purple-50 text-purple-700 border border-purple-200 rounded text-sm font-semibold hover:bg-purple-100 disabled:opacity-50">
                  {syncLoading ? 'Syncing...' : 'Sync iCal Now'}
                </button>
                <button onClick={seedProperties} disabled={propLoading}
                  className="px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded text-sm font-semibold hover:bg-amber-100 disabled:opacity-50">
                  Seed Defaults
                </button>
                <button onClick={() => { setShowPropForm(!showPropForm); setEditingKey(null); }}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm font-semibold hover:bg-blue-700">
                  + Add Property
                </button>
              </div>
            </div>

            {syncMsg && <div className={`mb-3 text-sm px-3 py-2 rounded ${syncMsg.startsWith('Sync done') ? 'bg-purple-50 text-purple-700' : 'bg-red-50 text-red-700'}`}>{syncMsg}</div>}
            {propMsg && <div className={`mb-3 text-sm px-3 py-2 rounded ${propMsg.includes('created') || propMsg.includes('updated') || propMsg.includes('Seeded') || propMsg.includes('Copied') || propMsg.includes('Image') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{propMsg}</div>}

            {/* ── Create form ── */}
            {showPropForm && (
              <form onSubmit={createProperty} className="bg-white border rounded-xl p-5 mb-5 space-y-4">
                <h3 className="font-bold text-slate-800">New Property</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: 'Room Key (unique ID, no spaces)', key: 'room_key', placeholder: 'e.g. villa_b', required: true },
                    { label: 'Property Name', key: 'name', placeholder: 'e.g. 3 Bedroom Villa', required: true },
                    { label: 'Short Subtitle', key: 'subtitle', placeholder: 'e.g. Perfect for families' },
                    { label: 'Category', key: 'category', placeholder: 'e.g. Entire Villa' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-xs text-gray-500 mb-0.5">{f.label}</label>
                      <input value={propForm[f.key]} onChange={e => setPropForm(p => ({ ...p, [f.key]: e.target.value }))}
                        placeholder={f.placeholder} className="w-full border rounded px-2 py-1.5 text-sm" required={!!f.required} />
                    </div>
                  ))}
                  {[
                    { label: 'Price Per Night (₦)', key: 'base_price' },
                    { label: 'Max Guests',           key: 'max_guests' },
                    { label: 'Min Nights',            key: 'min_nights' },
                    { label: 'Bedrooms',              key: 'bedrooms' },
                    { label: 'Bathrooms',             key: 'bathrooms' },
                    { label: 'Sort Order',            key: 'sort_order' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-xs text-gray-500 mb-0.5">{f.label}</label>
                      <input type="number" value={propForm[f.key]} onChange={e => setPropForm(p => ({ ...p, [f.key]: e.target.value }))}
                        className="w-full border rounded px-2 py-1.5 text-sm" required />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-0.5">Description</label>
                  <textarea value={propForm.description} onChange={e => setPropForm(p => ({ ...p, description: e.target.value }))}
                    rows={3} className="w-full border rounded px-2 py-1.5 text-sm resize-none" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">Amenities — tick all that apply</label>
                  <AmenitiesPicker selected={propForm.amenities} onChange={v => setPropForm(p => ({ ...p, amenities: v }))} />
                </div>

                <div className="border-t pt-4 space-y-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase">Calendar Sync (optional)</p>
                  <div>
                    <label className="block text-xs text-gray-500 mb-0.5">Airbnb / Booking.com iCal URLs (one per line)</label>
                    <textarea value={propForm.ical_urls} onChange={e => setPropForm(p => ({ ...p, ical_urls: e.target.value }))}
                      rows={2} className="w-full border rounded px-2 py-1.5 text-xs font-mono resize-none"
                      placeholder={"https://www.airbnb.com/calendar/ical/xxx.ics\nhttps://www.booking.com/ical/xxx.ics"} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-0.5">Property Group (same building rooms)</label>
                      <input value={propForm.property_group} onChange={e => setPropForm(p => ({ ...p, property_group: e.target.value }))}
                        placeholder="e.g. main" className="w-full border rounded px-2 py-1.5 text-sm" />
                    </div>
                    <div className="flex items-center gap-2 pt-4">
                      <input type="checkbox" id="new_blocks" checked={propForm.blocks_group}
                        onChange={e => setPropForm(p => ({ ...p, blocks_group: e.target.checked }))} className="w-4 h-4" />
                      <label htmlFor="new_blocks" className="text-xs text-gray-600 cursor-pointer">
                        <strong>Blocks whole group</strong> when booked (e.g. entire flat)
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button type="submit" disabled={propLoading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-semibold disabled:opacity-50">
                    {propLoading ? 'Creating...' : 'Create Property'}
                  </button>
                  <button type="button" onClick={() => setShowPropForm(false)} className="px-4 py-2 bg-gray-100 text-gray-600 rounded text-sm">Cancel</button>
                </div>
              </form>
            )}

            {propLoading && !editingKey && <div className="text-sm text-gray-400 mb-3">Loading...</div>}

            {/* ── Property cards grid ── */}
            <div className="grid md:grid-cols-2 gap-4">
              {properties.length === 0 && !propLoading && (
                <div className="md:col-span-2 bg-white border rounded-xl p-8 text-center">
                  <p className="text-gray-400 mb-3">No properties found.</p>
                  <button onClick={seedProperties} className="px-4 py-2 bg-amber-500 text-white rounded font-semibold text-sm">Seed Default Properties</button>
                </div>
              )}

              {properties.map(p => (
                <div key={p.room_key} className="bg-white border rounded-xl shadow-sm overflow-hidden">

                  {/* ── EDIT MODE ── */}
                  {editingKey === p.room_key ? (
                    <form onSubmit={saveEdit} className="p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-slate-800">Editing: {p.name}</h3>
                        <button type="button" onClick={() => setEditingKey(null)} className="text-xs text-gray-400 hover:text-gray-600">✕ Cancel</button>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3">
                        {[{ label: 'Name', key: 'name' }, { label: 'Subtitle', key: 'subtitle' }, { label: 'Category', key: 'category' }]
                          .map(f => (
                            <div key={f.key} className={f.key === 'name' ? 'sm:col-span-2' : ''}>
                              <label className="block text-xs text-gray-500 mb-0.5">{f.label}</label>
                              <input value={editForm[f.key] || ''} onChange={e => setEditForm(ef => ({ ...ef, [f.key]: e.target.value }))}
                                className="w-full border rounded px-2 py-1.5 text-sm" />
                            </div>
                          ))}
                        {[
                          { label: 'Price Per Night (₦)', key: 'base_price' },
                          { label: 'Max Guests',           key: 'max_guests' },
                          { label: 'Min Nights',            key: 'min_nights' },
                          { label: 'Bedrooms',              key: 'bedrooms' },
                          { label: 'Bathrooms',             key: 'bathrooms' },
                          { label: 'Sort Order',            key: 'sort_order' },
                        ].map(f => (
                          <div key={f.key}>
                            <label className="block text-xs text-gray-500 mb-0.5">{f.label}</label>
                            <input type="number" value={editForm[f.key] ?? ''} onChange={e => setEditForm(ef => ({ ...ef, [f.key]: e.target.value }))}
                              className="w-full border rounded px-2 py-1.5 text-sm" />
                          </div>
                        ))}
                      </div>

                      <div>
                        <label className="block text-xs text-gray-500 mb-0.5">Description</label>
                        <textarea value={editForm.description || ''} onChange={e => setEditForm(ef => ({ ...ef, description: e.target.value }))}
                          rows={3} className="w-full border rounded px-2 py-1.5 text-sm resize-none" />
                      </div>

                      {/* Amenity checkboxes */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-2">Amenities — tick all that apply</label>
                        <AmenitiesPicker
                          selected={Array.isArray(editForm.amenities) ? editForm.amenities : []}
                          onChange={v => setEditForm(ef => ({ ...ef, amenities: v }))} />
                      </div>

                      {/* ── Images section ── */}
                      <div className="border-t pt-4">
                        <label className="block text-xs font-semibold text-gray-600 mb-2">Photos</label>

                        {/* Current images */}
                        {(editForm.images || []).length > 0 ? (
                          <div className="grid grid-cols-3 gap-2 mb-3">
                            {(editForm.images || []).map((url, i) => (
                              <div key={i} className="relative group aspect-square rounded-lg overflow-hidden border">
                                <img src={url} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                                <button type="button" onClick={() => removeImage(url)}
                                  className="absolute top-1 right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-amber-600 mb-3">No photos yet — upload some below</p>
                        )}

                        {/* Upload button */}
                        <input ref={imgInputRef} type="file" accept="image/*" className="hidden"
                          onChange={e => { if (e.target.files[0]) uploadImage(e.target.files[0]); e.target.value = ''; }} />
                        <button type="button" onClick={() => imgInputRef.current?.click()} disabled={imgUploading}
                          className="px-4 py-2 bg-slate-100 text-slate-700 border rounded text-sm font-semibold hover:bg-slate-200 disabled:opacity-50">
                          {imgUploading ? 'Uploading...' : '📷 Upload Photo'}
                        </button>
                        <p className="text-xs text-gray-400 mt-1">Photos appear on the booking page for this property</p>
                      </div>

                      {/* Calendar sync */}
                      <div className="border-t pt-4 space-y-3">
                        <p className="text-xs font-semibold text-gray-500 uppercase">Calendar Sync</p>
                        <div>
                          <label className="block text-xs text-gray-500 mb-0.5">Airbnb / Booking.com iCal URLs (one per line)</label>
                          <textarea value={editForm.ical_urls || ''} onChange={e => setEditForm(ef => ({ ...ef, ical_urls: e.target.value }))}
                            rows={3} className="w-full border rounded px-2 py-1.5 text-xs font-mono resize-none"
                            placeholder={"https://www.airbnb.com/calendar/ical/xxx.ics\nhttps://www.booking.com/ical/xxx.ics"} />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs text-gray-500 mb-0.5">Property Group</label>
                            <input value={editForm.property_group || ''} onChange={e => setEditForm(ef => ({ ...ef, property_group: e.target.value }))}
                              placeholder="e.g. main" className="w-full border rounded px-2 py-1.5 text-sm" />
                          </div>
                          <div className="flex items-center gap-2 pt-4">
                            <input type="checkbox" id={`bg-${p.room_key}`} checked={!!editForm.blocks_group}
                              onChange={e => setEditForm(ef => ({ ...ef, blocks_group: e.target.checked }))} className="w-4 h-4" />
                            <label htmlFor={`bg-${p.room_key}`} className="text-xs text-gray-600 cursor-pointer">
                              <strong>Blocks whole group</strong> when booked
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2 border-t">
                        <button type="submit" disabled={propLoading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-semibold disabled:opacity-50">
                          {propLoading ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button type="button" onClick={() => setEditingKey(null)} className="px-4 py-2 bg-gray-100 text-gray-600 rounded text-sm">Cancel</button>
                        <button type="button" onClick={() => deleteProperty(p.room_key)} className="ml-auto px-3 py-2 bg-red-50 text-red-600 rounded text-sm hover:bg-red-100">Deactivate</button>
                      </div>
                    </form>

                  ) : (
                    /* ── VIEW MODE ── */
                    <div className="p-4">
                      {/* Image strip */}
                      {(p.images || []).length > 0 && (
                        <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
                          {p.images.map((url, i) => (
                            <img key={i} src={url} alt="" className="h-20 w-28 object-cover rounded-lg border shrink-0" />
                          ))}
                        </div>
                      )}

                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-slate-800">{p.name}</h3>
                          <p className="text-xs text-gray-500">{p.subtitle}</p>
                          {p.category && <p className="text-xs text-gray-400">{p.category}</p>}
                        </div>
                        <div className="flex gap-1 shrink-0 flex-wrap justify-end">
                          <Badge color={p.is_active ? 'green' : 'red'}>{p.is_active ? 'Active' : 'Inactive'}</Badge>
                          {p.blocks_group && <Badge color="amber">Blocks Group</Badge>}
                          {p.property_group && <Badge color="blue">{p.property_group}</Badge>}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                        {[
                          { label: 'Price/night', val: `₦${Number(p.base_price).toLocaleString()}` },
                          { label: 'Max Guests',  val: p.max_guests },
                          { label: 'Min Nights',  val: p.min_nights },
                          { label: 'Bedrooms',    val: p.bedrooms },
                          { label: 'Bathrooms',   val: p.bathrooms },
                          { label: 'Room Key',    val: p.room_key },
                        ].map(item => (
                          <div key={item.label} className="bg-slate-50 rounded p-2">
                            <div className="text-xs text-gray-400">{item.label}</div>
                            <div className="text-sm font-semibold text-slate-700 break-all">{item.val}</div>
                          </div>
                        ))}
                      </div>

                      {(p.amenities || []).length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {p.amenities.map(a => {
                            const name = typeof a === 'string' ? a : a.name;
                            const opt = AMENITY_OPTIONS.find(o => o.name === name);
                            return (
                              <span key={name} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                                {opt ? `${opt.icon} ` : ''}{name}
                              </span>
                            );
                          })}
                        </div>
                      )}

                      {/* iCal export */}
                      <div className="border-t pt-3 mb-3">
                        <p className="text-xs text-gray-400 mb-0.5">Your export URL (give to Airbnb / Booking.com):</p>
                        <div className="text-xs bg-green-50 border border-green-200 rounded px-2 py-1.5 font-mono text-green-700 truncate cursor-pointer hover:bg-green-100"
                          onClick={() => { navigator.clipboard?.writeText(`${backendUrl}/api/calendar/ical/${p.room_key}.ics`); setPropMsg(`Copied export URL for ${p.name}`); }}
                          title="Click to copy">
                          📋 {backendUrl}/api/calendar/ical/{p.room_key}.ics
                        </div>
                      </div>

                      <div className="flex gap-2 justify-end">
                        <button onClick={() => startEdit(p)} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded text-xs font-semibold hover:bg-blue-100">Edit</button>
                        <button onClick={() => deleteProperty(p.room_key)} className="px-3 py-1.5 bg-red-50 text-red-600 rounded text-xs font-semibold hover:bg-red-100">Deactivate</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════════ DISCOUNTS TAB ════════════════════ */}
        {tab === 'discounts' && (
          <div>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h2 className="font-semibold text-slate-700">Discount Codes ({discounts.length})</h2>
              <div className="flex gap-2">
                <button onClick={seedDiscounts} disabled={discLoading}
                  className="px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded text-sm font-semibold hover:bg-amber-100 disabled:opacity-50">
                  Seed Dummy Codes
                </button>
                <button onClick={() => setShowDiscForm(!showDiscForm)}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm font-semibold hover:bg-blue-700">
                  + Add Code
                </button>
              </div>
            </div>

            {discMsg && <div className={`mb-3 text-sm px-3 py-2 rounded ${discMsg.startsWith('Seeded') || discMsg.includes('created') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{discMsg}</div>}

            {showDiscForm && (
              <form onSubmit={createDiscount} className="bg-white border rounded-xl p-4 mb-4 grid sm:grid-cols-2 gap-3">
                <h3 className="sm:col-span-2 font-bold text-sm text-slate-700">New Discount Code</h3>
                <div>
                  <label className="block text-xs text-gray-500 mb-0.5">Code</label>
                  <input value={discForm.code} onChange={e => setDiscForm(d => ({ ...d, code: e.target.value.toUpperCase() }))}
                    placeholder="e.g. SAVE10" className="w-full border rounded px-2 py-1.5 text-sm font-mono" required />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-0.5">Type</label>
                  <select value={discForm.type} onChange={e => setDiscForm(d => ({ ...d, type: e.target.value }))}
                    className="w-full border rounded px-2 py-1.5 text-sm">
                    <option value="percentage">Percentage (%) off</option>
                    <option value="fixed">Fixed Amount (₦) off</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-0.5">Value ({discForm.type === 'percentage' ? '%' : '₦'})</label>
                  <input type="number" value={discForm.value} onChange={e => setDiscForm(d => ({ ...d, value: e.target.value }))}
                    className="w-full border rounded px-2 py-1.5 text-sm" required min="1" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-0.5">Usage Limit (blank = unlimited)</label>
                  <input type="number" value={discForm.usage_limit} onChange={e => setDiscForm(d => ({ ...d, usage_limit: e.target.value }))}
                    className="w-full border rounded px-2 py-1.5 text-sm" placeholder="e.g. 50" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-0.5">Min Nights</label>
                  <input type="number" value={discForm.min_nights} onChange={e => setDiscForm(d => ({ ...d, min_nights: e.target.value }))}
                    className="w-full border rounded px-2 py-1.5 text-sm" min="1" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-0.5">Min Booking Amount (₦)</label>
                  <input type="number" value={discForm.min_amount} onChange={e => setDiscForm(d => ({ ...d, min_amount: e.target.value }))}
                    className="w-full border rounded px-2 py-1.5 text-sm" min="0" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-0.5">Expiry Date (optional)</label>
                  <input type="date" value={discForm.expiry_date} onChange={e => setDiscForm(d => ({ ...d, expiry_date: e.target.value }))}
                    className="w-full border rounded px-2 py-1.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-0.5">Description</label>
                  <input value={discForm.description} onChange={e => setDiscForm(d => ({ ...d, description: e.target.value }))}
                    placeholder="e.g. 10% off for new guests" className="w-full border rounded px-2 py-1.5 text-sm" />
                </div>
                <div className="sm:col-span-2 flex gap-2">
                  <button type="submit" disabled={discLoading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-semibold disabled:opacity-50">
                    {discLoading ? 'Creating...' : 'Create Code'}
                  </button>
                  <button type="button" onClick={() => setShowDiscForm(false)} className="px-4 py-2 bg-gray-100 text-gray-600 rounded text-sm">Cancel</button>
                </div>
              </form>
            )}

            {discounts.length === 0 && !discLoading && (
              <div className="bg-white border rounded-xl p-8 text-center mb-4">
                <p className="text-gray-400 mb-3">No discount codes yet.</p>
                <button onClick={seedDiscounts} className="px-4 py-2 bg-amber-500 text-white rounded font-semibold text-sm">Seed Dummy Codes</button>
              </div>
            )}

            <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
              {discounts.length > 0 && (
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b">
                    <tr>
                      {['Code', 'Type', 'Value', 'Used', 'Limit', 'Min Nights', 'Expiry', 'Status', 'Actions'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {discounts.map(d => (
                      <tr key={d.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-mono font-bold text-blue-700">{d.code}</td>
                        <td className="px-4 py-3"><Badge color={d.type === 'percentage' ? 'blue' : 'amber'}>{d.type === 'percentage' ? '%' : '₦'}</Badge></td>
                        <td className="px-4 py-3 font-semibold">{d.type === 'percentage' ? `${d.value}%` : `₦${Number(d.value).toLocaleString()}`}</td>
                        <td className="px-4 py-3 text-gray-500">{d.times_used ?? 0}</td>
                        <td className="px-4 py-3 text-gray-500">{d.usage_limit ?? '∞'}</td>
                        <td className="px-4 py-3 text-gray-500">{d.min_nights ?? 1}</td>
                        <td className="px-4 py-3 text-gray-500">{d.expiry_date ? new Date(d.expiry_date).toLocaleDateString() : '—'}</td>
                        <td className="px-4 py-3"><Badge color={d.is_active ? 'green' : 'red'}>{d.is_active ? 'Active' : 'Off'}</Badge></td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            <button onClick={() => toggleDiscount(d)}
                              className={`text-xs px-2 py-1 rounded ${d.is_active ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-green-50 text-green-700 hover:bg-green-100'}`}>
                              {d.is_active ? 'Disable' : 'Enable'}
                            </button>
                            <button onClick={() => deleteDiscount(d.id)} className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Admin;
