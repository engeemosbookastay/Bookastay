import { useState, useEffect } from 'react';
import { backendUrl } from '../App';

// Loads one admin-editable site_content row. Whatever the admin saved is used
// exactly as-is — deletions included — with no merging of bundled defaults.
//
// status:
//   'loading' – first visit, nothing cached yet (render nothing, avoid flashing defaults)
//   'saved'   – value is what the admin saved (from the server or the last-known cache)
//   'missing' – the admin has never saved this section; caller may show its defaults
//   'error'   – network/server failure with no cache; caller may show its defaults
const cacheKey = (key) => `content_cache_${key}`;
const readCache = (key) => {
  try {
    const raw = localStorage.getItem(cacheKey(key));
    return raw ? JSON.parse(raw) : undefined;
  } catch { return undefined; }
};

export default function useSiteContent(key) {
  const [state, setState] = useState(() => {
    const cached = readCache(key);
    return cached !== undefined ? { value: cached, status: 'saved' } : { value: undefined, status: 'loading' };
  });

  useEffect(() => {
    let cancelled = false;
    fetch(`${backendUrl}/api/content/${key}`, { cache: 'no-store' })
      .then(async (r) => {
        if (r.status === 404) {
          try { localStorage.removeItem(cacheKey(key)); } catch { /* ignore */ }
          if (!cancelled) setState({ value: undefined, status: 'missing' });
          return;
        }
        const d = await r.json();
        if (!r.ok || !d.success || !d.content) throw new Error('bad response');
        const value = d.content.value ?? {};
        try { localStorage.setItem(cacheKey(key), JSON.stringify(value)); } catch { /* ignore */ }
        if (!cancelled) setState({ value, status: 'saved' });
      })
      .catch(() => {
        if (!cancelled) setState(prev => (prev.status === 'saved' ? prev : { value: undefined, status: 'error' }));
      });
    return () => { cancelled = true; };
  }, [key]);

  return state;
}

// Pick what to render: the saved value, nothing while loading, or the bundled
// defaults only when the admin has never saved this section.
export const pickContent = ({ value, status }, defaults, empty) => {
  if (status === 'saved') return value;
  if (status === 'loading') return empty;
  return defaults;
};
