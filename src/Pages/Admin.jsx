import React, { useEffect, useState, useCallback, useRef } from 'react';
import { backendUrl } from '../App';
import { RAW_HOUSE_RULES } from '../Component/Rules';
import { RAW_GETTING_AROUND } from './GettingAround';
import {
  Wifi, Wind, Monitor, Zap, Shield, Activity, Briefcase,
  Sun, Droplet, RefreshCw, Coffee, MapPin, Anchor, SlidersHorizontal,
  Power, Trash2, Plus, Save, ArrowUp, ArrowDown,
} from 'lucide-react';

// Category keys the "Getting Around" page knows how to style.
const GA_CATEGORY_KEYS = ['tourism', 'food', 'nightlife', 'shopping', 'transport', 'markets', 'atm', 'supermarkets', 'fuel'];

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
const EMPTY_POST = { title: '', slug: '', category: '', author: 'Engeemos Bookastay', excerpt: '', content: '', image: '', published: false, date: '' };
// Suggested blog categories (match the colour map in services/blogService.js)
const BLOG_CATEGORIES = ['Travel Tips', 'Abeokuta Guide', 'Guest Stories', 'Property News', 'Local Culture', 'Food & Dining'];

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

  // Site content (House Rules + Getting Around) editor
  const [contentSub, setContentSub]     = useState('house_rules');
  const [rulesDraft, setRulesDraft]     = useState([]);
  const [gaDraft, setGaDraft]           = useState([]);
  const [contentLoading, setContentLoading] = useState(false);
  const [contentMsg, setContentMsg]     = useState('');

  // Blog posts
  const [posts, setPosts]               = useState([]);
  const [showPostForm, setShowPostForm] = useState(false);
  const [postForm, setPostForm]         = useState(EMPTY_POST);
  const [editingPostId, setEditingPostId] = useState(null);
  const [postLoading, setPostLoading]   = useState(false);
  const [postMsg, setPostMsg]           = useState('');
  const [postImgUploading, setPostImgUploading] = useState(false);
  const postImgRef = useRef(null);

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

  // Load editable site content; seed from the same defaults the public pages use
  // when no admin override exists yet, so the editor is never blank.
  const fetchContent = useCallback(async () => {
    setContentLoading(true); setContentMsg('');
    try {
      const [hr, ga] = await Promise.all([
        fetch(`${backendUrl}/api/content/house_rules`).then(r => r.json()).catch(() => ({})),
        fetch(`${backendUrl}/api/content/getting_around`).then(r => r.json()).catch(() => ({})),
      ]);
      setRulesDraft(hr?.content?.value?.rules?.length
        ? hr.content.value.rules.map(r => ({ ...r }))
        : RAW_HOUSE_RULES.map(r => ({ ...r })));
      setGaDraft(ga?.content?.value?.categories?.length
        ? ga.content.value.categories.map(c => ({ ...c, items: (c.items || []).map(i => ({ ...i })) }))
        : RAW_GETTING_AROUND.map(c => ({ ...c, items: c.items.map(i => ({ ...i })) })));
    } catch { setContentMsg('Could not load content'); }
    finally { setContentLoading(false); }
  }, []);

  const fetchPosts = useCallback(async () => {
    setPostLoading(true); setPostMsg('');
    try {
      const res = await fetch(`${backendUrl}/api/admin/blog`, { headers: headers() });
      const d = await res.json();
      if (d.success) setPosts(d.posts || []);
      else setPostMsg(d.message || 'Failed to load posts');
    } catch { setPostMsg('Network error'); }
    finally { setPostLoading(false); }
  }, [headers]);

  useEffect(() => {
    if (adminKey) { fetchBookings(); fetchProperties(); fetchDiscounts(); fetchContent(); fetchPosts(); }
  }, [adminKey, fetchBookings, fetchProperties, fetchDiscounts, fetchContent, fetchPosts]);

  // ── Auth ──────────────────────────────────────────────────────────────────
  const saveKey = (k) => { const key = k ?? adminKey; localStorage.setItem('admin_key', key); setAdminKey(key); };
  const logout  = () => { localStorage.removeItem('admin_key'); setAdminKey(''); setBookings([]); setStats(null); setProperties([]); setDiscounts([]); setPosts([]); };

  // ── Bookings ──────────────────────────────────────────────────────────────
  const deleteBooking = async (id) => {
    if (!window.confirm('Delete this booking?')) return;
    setLoading(true); setError('');
    try {
      const res = await fetch(`${backendUrl}/api/admin/bookings/${id}`, { method: 'DELETE', headers: headers() });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.message || `Delete failed (${res.status})`);
      }
      await fetchBookings();
    }
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

  // Toggle active/inactive (on = shows on frontend). Can't activate without an image.
  const toggleActive = async (p) => {
    const turningOn = !p.is_active;
    if (turningOn && (p.images || []).length === 0) {
      setPropMsg(`Add at least one image to "${p.name}" before turning it on.`);
      return;
    }
    setPropMsg('');
    try {
      const res = await fetch(`${backendUrl}/api/admin/properties/${p.room_key}`, {
        method: 'PUT', headers: headers(), body: JSON.stringify({ is_active: turningOn }),
      });
      const d = await res.json();
      if (d.success) { setPropMsg(`"${p.name}" is now ${turningOn ? 'ON (visible on site)' : 'OFF (hidden)'}.`); fetchProperties(); }
      else setPropMsg(d.message || 'Could not update');
    } catch { setPropMsg('Network error'); }
  };

  // Permanently remove the row from the database (not reversible).
  const hardDeleteProperty = async (p) => {
    if (!window.confirm(`Permanently DELETE "${p.name}" (${p.room_key}) from the database? This cannot be undone.`)) return;
    setPropMsg('');
    try {
      const res = await fetch(`${backendUrl}/api/admin/properties/${p.room_key}/permanent`, { method: 'DELETE', headers: headers() });
      const d = await res.json();
      if (d.success) { setPropMsg(`"${p.name}" permanently deleted.`); fetchProperties(); }
      else setPropMsg(d.message || 'Delete failed');
    } catch { setPropMsg('Network error'); }
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

  // ── Site content editor ─────────────────────────────────────────────────────
  const saveContent = async (key, value, label) => {
    setContentLoading(true); setContentMsg('');
    try {
      const res = await fetch(`${backendUrl}/api/admin/content/${key}`, {
        method: 'PUT', headers: headers(), body: JSON.stringify({ title: label, value }),
      });
      const d = await res.json();
      if (d.success) setContentMsg(`${label} saved — changes are live on the site.`);
      else setContentMsg(d.message || 'Save failed');
    } catch { setContentMsg('Network error'); }
    finally { setContentLoading(false); }
  };
  const saveRules = () => saveContent('house_rules', { rules: rulesDraft.filter(r => (r.title || '').trim()) }, 'House Rules');
  const saveGettingAround = () => saveContent('getting_around', { categories: gaDraft.filter(c => c.key && (c.title || '').trim()) }, 'Getting Around');

  // House Rules draft editing
  const updateRule = (i, patch) => setRulesDraft(list => list.map((r, idx) => idx === i ? { ...r, ...patch } : r));
  const removeRule = (i) => setRulesDraft(list => list.filter((_, idx) => idx !== i));
  const addRule = () => setRulesDraft(list => [...list, { title: '', category: '', content: '', extra: '' }]);
  const moveRule = (i, dir) => setRulesDraft(list => {
    const j = i + dir; if (j < 0 || j >= list.length) return list;
    const copy = [...list]; [copy[i], copy[j]] = [copy[j], copy[i]]; return copy;
  });

  // Getting Around draft editing
  const updateCat = (ci, patch) => setGaDraft(list => list.map((c, idx) => idx === ci ? { ...c, ...patch } : c));
  const removeCat = (ci) => setGaDraft(list => list.filter((_, idx) => idx !== ci));
  const addCat = () => setGaDraft(list => [...list, { key: 'tourism', title: '', items: [] }]);
  const updateItem = (ci, ii, patch) => setGaDraft(list => list.map((c, idx) => idx === ci ? { ...c, items: c.items.map((it, j) => j === ii ? { ...it, ...patch } : it) } : c));
  const removeItem = (ci, ii) => setGaDraft(list => list.map((c, idx) => idx === ci ? { ...c, items: c.items.filter((_, j) => j !== ii) } : c));
  const addItem = (ci) => setGaDraft(list => list.map((c, idx) => idx === ci ? { ...c, items: [...c.items, { name: '', time: '', link: '' }] } : c));

  // ── Blog CRUD ───────────────────────────────────────────────────────────────
  const openNewPost = () => { setPostForm(EMPTY_POST); setEditingPostId(null); setShowPostForm(true); setPostMsg(''); };

  const editPost = (p) => {
    setPostForm({
      title: p.title || '', slug: p.slug || '', category: p.category || '', author: p.author || '',
      excerpt: p.excerpt || '', content: p.content || '', image: p.image || '',
      published: !!p.published, date: p.date || '',
    });
    setEditingPostId(p.id);
    setShowPostForm(true);
    setPostMsg('');
  };

  const submitPost = async (e) => {
    e.preventDefault(); setPostLoading(true); setPostMsg('');
    try {
      const editing = !!editingPostId;
      const url = editing ? `${backendUrl}/api/admin/blog/${editingPostId}` : `${backendUrl}/api/admin/blog`;
      const res = await fetch(url, { method: editing ? 'PUT' : 'POST', headers: headers(), body: JSON.stringify(postForm) });
      const d = await res.json();
      if (d.success) { setPostMsg(editing ? 'Post updated.' : 'Post created.'); setShowPostForm(false); setPostForm(EMPTY_POST); setEditingPostId(null); fetchPosts(); }
      else setPostMsg(d.message || 'Failed');
    } catch { setPostMsg('Network error'); }
    finally { setPostLoading(false); }
  };

  const togglePublish = async (p) => {
    await fetch(`${backendUrl}/api/admin/blog/${p.id}`, { method: 'PUT', headers: headers(), body: JSON.stringify({ published: !p.published }) });
    fetchPosts();
  };

  const deletePost = async (p) => {
    if (!window.confirm(`Delete post "${p.title}"? This cannot be undone.`)) return;
    await fetch(`${backendUrl}/api/admin/blog/${p.id}`, { method: 'DELETE', headers: headers() });
    fetchPosts();
  };

  const uploadPostImage = async (file) => {
    setPostImgUploading(true); setPostMsg('');
    try {
      const fd = new FormData();
      fd.append('image', file);
      const res = await fetch(`${backendUrl}/api/admin/blog/upload-image`, {
        method: 'POST', headers: { 'x-admin-key': adminKey }, body: fd,
      });
      const d = await res.json();
      if (d.success) { setPostForm(f => ({ ...f, image: d.url })); setPostMsg('Image uploaded.'); }
      else setPostMsg(d.message || 'Upload failed');
    } catch { setPostMsg('Upload error'); }
    finally { setPostImgUploading(false); }
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
              {['bookings', 'properties', 'discounts', 'content', 'blog'].map(t => (
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
                </div>

                {/* ── Availability grouping — controls how bookings block each other ── */}
                <div className="border-t pt-4 space-y-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase">Availability &amp; Grouping</p>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-xs text-slate-600 space-y-1">
                    <p>Use this <strong>only</strong> when one building is sold both as a whole <em>and</em> room-by-room, so the calendar never double-books.</p>
                    <p>Give every listing in the <strong>same building</strong> the same <strong>Group name</strong>. Then tick <strong>“Entire place”</strong> on the whole-building listing only — booking it blocks all its rooms, and booking any room blocks the whole-building listing.</p>
                    <p className="text-slate-500">Standalone apartments with no shared rooms: leave the group blank.</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-0.5">Group name (same building = same name)</label>
                      <input value={propForm.property_group} onChange={e => setPropForm(p => ({ ...p, property_group: e.target.value }))}
                        placeholder="e.g. villa_a — or leave blank if standalone" className="w-full border rounded px-2 py-1.5 text-sm" />
                    </div>
                    <div className="flex items-start gap-2 pt-1">
                      <input type="checkbox" id="new_blocks" checked={propForm.blocks_group}
                        onChange={e => setPropForm(p => ({ ...p, blocks_group: e.target.checked }))} className="w-4 h-4 mt-0.5" />
                      <label htmlFor="new_blocks" className="text-xs text-gray-600 cursor-pointer">
                        This is the <strong>entire place</strong> — booking it blocks every room in the group
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
                  <p className="text-gray-400 mb-1">No properties yet.</p>
                  <p className="text-gray-400 text-sm">Click <span className="font-semibold text-blue-600">+ Add Property</span> above to create your first one.</p>
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
                      </div>

                      {/* ── Availability grouping ── */}
                      <div className="border-t pt-4 space-y-3">
                        <p className="text-xs font-semibold text-gray-500 uppercase">Availability &amp; Grouping</p>
                        <p className="text-xs text-slate-500">Same building sold whole + by room? Give each listing the same group name, and tick “Entire place” on the whole-building one only. Standalone apartment: leave group blank.</p>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs text-gray-500 mb-0.5">Group name (same building = same name)</label>
                            <input value={editForm.property_group || ''} onChange={e => setEditForm(ef => ({ ...ef, property_group: e.target.value }))}
                              placeholder="e.g. villa_a — or blank if standalone" className="w-full border rounded px-2 py-1.5 text-sm" />
                          </div>
                          <div className="flex items-start gap-2 pt-1">
                            <input type="checkbox" id={`bg-${p.room_key}`} checked={!!editForm.blocks_group}
                              onChange={e => setEditForm(ef => ({ ...ef, blocks_group: e.target.checked }))} className="w-4 h-4 mt-0.5" />
                            <label htmlFor={`bg-${p.room_key}`} className="text-xs text-gray-600 cursor-pointer">
                              This is the <strong>entire place</strong> — booking it blocks every room in the group
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2 border-t">
                        <button type="submit" disabled={propLoading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-semibold disabled:opacity-50">
                          {propLoading ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button type="button" onClick={() => setEditingKey(null)} className="px-4 py-2 bg-gray-100 text-gray-600 rounded text-sm">Cancel</button>
                        <button type="button" onClick={() => hardDeleteProperty(p)} className="ml-auto px-3 py-2 bg-red-50 text-red-600 rounded text-sm hover:bg-red-100">Delete</button>
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

                      <div className="flex gap-2 justify-end items-center">
                        <button
                          onClick={() => toggleActive(p)}
                          title={p.is_active ? 'Visible on site — click to hide' : 'Hidden — click to show on site'}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs font-semibold transition ${p.is_active ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`}
                        >
                          <Power size={14} /> {p.is_active ? 'ON' : 'OFF'}
                        </button>
                        <button onClick={() => startEdit(p)} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded text-xs font-semibold hover:bg-blue-100">Edit</button>
                        <button onClick={() => hardDeleteProperty(p)} title="Delete permanently from database" className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded text-xs font-semibold hover:bg-red-100">
                          <Trash2 size={14} /> Delete
                        </button>
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

        {/* ════════════════════ CONTENT TAB ════════════════════ */}
        {tab === 'content' && (
          <div>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h2 className="font-semibold text-slate-700">Site Content</h2>
              <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                {[['house_rules', 'House Rules'], ['getting_around', 'Getting Around']].map(([k, label]) => (
                  <button key={k} onClick={() => { setContentSub(k); setContentMsg(''); }}
                    className={`px-3 py-1.5 rounded-md text-sm font-semibold transition ${contentSub === k ? 'bg-white shadow text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {contentMsg && <div className={`mb-3 text-sm px-3 py-2 rounded ${contentMsg.includes('saved') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{contentMsg}</div>}
            {contentLoading && <div className="text-sm text-gray-500 mb-3">Working…</div>}

            {/* ── House Rules editor ── */}
            {contentSub === 'house_rules' && (
              <div>
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <p className="text-xs text-gray-500 max-w-md">Edit the House Rules shown on the public page. Your edits join (and override) the default list by title.</p>
                  <div className="flex gap-2">
                    <button onClick={addRule} className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded text-sm font-semibold hover:bg-blue-100"><Plus size={14} /> Add Rule</button>
                    <button onClick={saveRules} disabled={contentLoading} className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded text-sm font-semibold disabled:opacity-50"><Save size={14} /> Save</button>
                  </div>
                </div>
                <div className="space-y-3">
                  {rulesDraft.map((rule, i) => (
                    <div key={i} className="bg-white border rounded-xl p-4">
                      <div className="flex items-start gap-2 mb-2">
                        <div className="grid grid-cols-2 gap-2 flex-1">
                          <input value={rule.title || ''} onChange={e => updateRule(i, { title: e.target.value })} placeholder="Title (e.g. Smoking)" className="border rounded px-2 py-1.5 text-sm font-semibold" />
                          <input value={rule.category || ''} onChange={e => updateRule(i, { category: e.target.value })} placeholder="Category (e.g. Health & Safety)" className="border rounded px-2 py-1.5 text-sm" />
                        </div>
                        <div className="flex flex-col gap-0.5 shrink-0">
                          <button onClick={() => moveRule(i, -1)} title="Move up" className="p-1 text-gray-400 hover:text-gray-700"><ArrowUp size={14} /></button>
                          <button onClick={() => moveRule(i, 1)} title="Move down" className="p-1 text-gray-400 hover:text-gray-700"><ArrowDown size={14} /></button>
                        </div>
                        <button onClick={() => removeRule(i)} title="Remove rule" className="p-1.5 text-red-500 hover:bg-red-50 rounded shrink-0"><Trash2 size={16} /></button>
                      </div>
                      <textarea value={rule.content || ''} onChange={e => updateRule(i, { content: e.target.value })} placeholder="Rule text" rows={2} className="w-full border rounded px-2 py-1.5 text-sm mb-2" />
                      <textarea value={rule.extra || ''} onChange={e => updateRule(i, { extra: e.target.value })} placeholder="Extra paragraph (optional)" rows={1} className="w-full border rounded px-2 py-1.5 text-sm" />
                      {Array.isArray(rule.details) && rule.details.length > 0 && (
                        <p className="text-xs text-amber-600 mt-2">⚙ Has {rule.details.length} advanced sub-section(s) — preserved unchanged on save.</p>
                      )}
                    </div>
                  ))}
                  {rulesDraft.length === 0 && <div className="bg-white border rounded-xl p-8 text-center text-gray-400 text-sm">No rules. Click “Add Rule”.</div>}
                </div>
              </div>
            )}

            {/* ── Getting Around editor ── */}
            {contentSub === 'getting_around' && (
              <div>
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <p className="text-xs text-gray-500 max-w-md">Edit the “Getting Around” places. Leave a link blank and a known place keeps its default map link.</p>
                  <div className="flex gap-2">
                    <button onClick={addCat} className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded text-sm font-semibold hover:bg-blue-100"><Plus size={14} /> Add Category</button>
                    <button onClick={saveGettingAround} disabled={contentLoading} className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded text-sm font-semibold disabled:opacity-50"><Save size={14} /> Save</button>
                  </div>
                </div>
                <div className="space-y-4">
                  {gaDraft.map((cat, ci) => (
                    <div key={ci} className="bg-white border rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <select value={cat.key || 'tourism'} onChange={e => updateCat(ci, { key: e.target.value })} className="border rounded px-2 py-1.5 text-sm">
                          {GA_CATEGORY_KEYS.map(k => <option key={k} value={k}>{k}</option>)}
                        </select>
                        <input value={cat.title || ''} onChange={e => updateCat(ci, { title: e.target.value })} placeholder="Category title (e.g. Food & Dining)" className="border rounded px-2 py-1.5 text-sm flex-1 font-semibold" />
                        <button onClick={() => removeCat(ci)} title="Remove category" className="p-1.5 text-red-500 hover:bg-red-50 rounded shrink-0"><Trash2 size={16} /></button>
                      </div>
                      <div className="space-y-2">
                        {(cat.items || []).map((it, ii) => (
                          <div key={ii} className="flex items-center gap-2">
                            <input value={it.name || ''} onChange={e => updateItem(ci, ii, { name: e.target.value })} placeholder="Place name" className="border rounded px-2 py-1 text-sm flex-1" />
                            <input value={it.time || ''} onChange={e => updateItem(ci, ii, { time: e.target.value })} placeholder="e.g. 10 mins" className="border rounded px-2 py-1 text-sm w-28" />
                            <input value={it.link || ''} onChange={e => updateItem(ci, ii, { link: e.target.value })} placeholder="Map link (optional)" className="border rounded px-2 py-1 text-sm flex-1" />
                            <button onClick={() => removeItem(ci, ii)} title="Remove" className="p-1 text-red-500 hover:bg-red-50 rounded shrink-0"><Trash2 size={14} /></button>
                          </div>
                        ))}
                        <button onClick={() => addItem(ci)} className="flex items-center gap-1 text-xs text-blue-600 font-semibold hover:text-blue-800 mt-1"><Plus size={12} /> Add place</button>
                      </div>
                    </div>
                  ))}
                  {gaDraft.length === 0 && <div className="bg-white border rounded-xl p-8 text-center text-gray-400 text-sm">No categories. Click “Add Category”.</div>}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ════════════════════ BLOG TAB ════════════════════ */}
        {tab === 'blog' && (
          <div>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h2 className="font-semibold text-slate-700">Blog Posts ({posts.length})</h2>
              <button onClick={openNewPost} className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm font-semibold hover:bg-blue-700">+ New Post</button>
            </div>

            {postMsg && <div className={`mb-3 text-sm px-3 py-2 rounded ${postMsg.includes('created') || postMsg.includes('updated') || postMsg.includes('uploaded') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{postMsg}</div>}

            {/* ── Post editor (create + edit share this form) ── */}
            {showPostForm && (
              <form onSubmit={submitPost} className="bg-white border rounded-xl p-5 mb-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-800">{editingPostId ? 'Edit Post' : 'New Post'}</h3>
                  <button type="button" onClick={() => { setShowPostForm(false); setEditingPostId(null); }} className="text-xs text-gray-400 hover:text-gray-600">✕ Cancel</button>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-gray-500 mb-0.5">Title</label>
                    <input value={postForm.title} onChange={e => setPostForm(f => ({ ...f, title: e.target.value }))} className="w-full border rounded px-2 py-1.5 text-sm" required />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-0.5">Slug (URL — blank = auto from title)</label>
                    <input value={postForm.slug} onChange={e => setPostForm(f => ({ ...f, slug: e.target.value }))} placeholder="auto-generated" className="w-full border rounded px-2 py-1.5 text-sm font-mono" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-0.5">Category</label>
                    <input list="blog-cats" value={postForm.category} onChange={e => setPostForm(f => ({ ...f, category: e.target.value }))} className="w-full border rounded px-2 py-1.5 text-sm" />
                    <datalist id="blog-cats">{BLOG_CATEGORIES.map(c => <option key={c} value={c} />)}</datalist>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-0.5">Author</label>
                    <input value={postForm.author} onChange={e => setPostForm(f => ({ ...f, author: e.target.value }))} className="w-full border rounded px-2 py-1.5 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-0.5">Date (blank = today)</label>
                    <input type="date" value={postForm.date} onChange={e => setPostForm(f => ({ ...f, date: e.target.value }))} className="w-full border rounded px-2 py-1.5 text-sm" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-0.5">Excerpt (short summary shown on cards)</label>
                  <textarea value={postForm.excerpt} onChange={e => setPostForm(f => ({ ...f, excerpt: e.target.value }))} rows={2} className="w-full border rounded px-2 py-1.5 text-sm resize-none" />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-0.5">Content (full article — plain text or HTML)</label>
                  <textarea value={postForm.content} onChange={e => setPostForm(f => ({ ...f, content: e.target.value }))} rows={10} className="w-full border rounded px-2 py-1.5 text-sm" />
                </div>

                {/* Cover image */}
                <div className="border-t pt-4">
                  <label className="block text-xs font-semibold text-gray-600 mb-2">Cover Image</label>
                  {postForm.image ? (
                    <div className="relative inline-block mb-3">
                      <img src={postForm.image} alt="cover" className="h-32 rounded-lg border object-cover" />
                      <button type="button" onClick={() => setPostForm(f => ({ ...f, image: '' }))}
                        className="absolute top-1 right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">✕</button>
                    </div>
                  ) : <p className="text-xs text-gray-400 mb-3">No cover image yet.</p>}
                  <div className="flex items-center gap-2 flex-wrap">
                    <input ref={postImgRef} type="file" accept="image/*" className="hidden"
                      onChange={e => { if (e.target.files[0]) uploadPostImage(e.target.files[0]); e.target.value = ''; }} />
                    <button type="button" onClick={() => postImgRef.current?.click()} disabled={postImgUploading}
                      className="px-4 py-2 bg-slate-100 text-slate-700 border rounded text-sm font-semibold hover:bg-slate-200 disabled:opacity-50">
                      {postImgUploading ? 'Uploading...' : '📷 Upload Image'}
                    </button>
                    <span className="text-xs text-gray-400">or paste a URL:</span>
                    <input value={postForm.image} onChange={e => setPostForm(f => ({ ...f, image: e.target.value }))}
                      placeholder="https://…" className="border rounded px-2 py-1.5 text-sm flex-1 min-w-[180px]" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="post_published" checked={postForm.published}
                    onChange={e => setPostForm(f => ({ ...f, published: e.target.checked }))} className="w-4 h-4" />
                  <label htmlFor="post_published" className="text-sm text-gray-700 cursor-pointer">
                    <strong>Published</strong> — visible on the public blog (unchecked = saved as draft)
                  </label>
                </div>

                <div className="flex gap-2 pt-2 border-t">
                  <button type="submit" disabled={postLoading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-semibold disabled:opacity-50">
                    {postLoading ? 'Saving...' : (editingPostId ? 'Save Changes' : 'Create Post')}
                  </button>
                  <button type="button" onClick={() => { setShowPostForm(false); setEditingPostId(null); }} className="px-4 py-2 bg-gray-100 text-gray-600 rounded text-sm">Cancel</button>
                </div>
              </form>
            )}

            {postLoading && !showPostForm && <div className="text-sm text-gray-400 mb-3">Loading...</div>}

            {posts.length === 0 && !postLoading && !showPostForm && (
              <div className="bg-white border rounded-xl p-8 text-center">
                <p className="text-gray-400 mb-3">No blog posts yet.</p>
                <button onClick={openNewPost} className="px-4 py-2 bg-blue-600 text-white rounded font-semibold text-sm">Write Your First Post</button>
              </div>
            )}

            {/* ── Posts grid ── */}
            <div className="grid md:grid-cols-2 gap-4">
              {posts.map(p => (
                <div key={p.id} className="bg-white border rounded-xl shadow-sm overflow-hidden flex flex-col">
                  {p.image && <img src={p.image} alt="" className="h-40 w-full object-cover" />}
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-bold text-slate-800 leading-tight">{p.title}</h3>
                      <Badge color={p.published ? 'green' : 'gray'}>{p.published ? 'Published' : 'Draft'}</Badge>
                    </div>
                    <div className="text-xs text-gray-400 mb-2">
                      {p.category || 'Uncategorised'} • {p.author || 'Unknown'}{p.date ? ` • ${new Date(p.date).toLocaleDateString()}` : ''}
                    </div>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2 flex-1">{p.excerpt || (p.content || '').slice(0, 120)}</p>
                    <div className="flex gap-2 justify-end items-center">
                      <button onClick={() => togglePublish(p)}
                        className={`text-xs px-2 py-1 rounded font-semibold ${p.published ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-green-50 text-green-700 hover:bg-green-100'}`}>
                        {p.published ? 'Unpublish' : 'Publish'}
                      </button>
                      <button onClick={() => editPost(p)} className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded font-semibold hover:bg-blue-100">Edit</button>
                      <button onClick={() => deletePost(p)} className="flex items-center gap-1 text-xs px-2 py-1 bg-red-50 text-red-600 rounded font-semibold hover:bg-red-100"><Trash2 size={13} /> Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Admin;
