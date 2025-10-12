import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase may return access_token and refresh_token in URL hash
    const hash = window.location.hash || window.location.search;
    const params = new URLSearchParams(hash.replace('#', '?'));
    const access_token = params.get('access_token');
    const refresh_token = params.get('refresh_token');
    if (access_token) localStorage.setItem('access_token', access_token);
    if (refresh_token) localStorage.setItem('refresh_token', refresh_token);
    // navigate to booking or home
    navigate('/booking');
  }, [navigate]);

  return <div className="min-h-screen flex items-center justify-center">Processing login...</div>;
};

export default AuthCallback;
