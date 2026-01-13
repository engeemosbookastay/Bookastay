import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const VerificationComplete = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const reference = searchParams.get('reference');
    
    if (!reference) {
      console.error('No reference in URL');
      navigate('/bookings');
      return;
    }

    console.log('Verification complete, reference:', reference);
    
    // Close this window and notify parent window (if opened in popup)
    if (window.opener) {
      console.log('Notifying parent window...');
      window.opener.postMessage({ 
        type: 'VERIFICATION_COMPLETE',
        reference: reference 
      }, window.location.origin);
      
      // Close this popup window after 2 seconds
      setTimeout(() => {
        window.close();
      }, 2000);
    } else {
      // If not in popup, redirect to rooms
      setTimeout(() => {
        navigate('/rooms');
      }, 2000);
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl border border-green-500/20 max-w-md w-full p-8 text-center">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">Verification Complete!</h1>
        <p className="text-gray-400 mb-6">
          Your identity has been verified successfully.
        </p>
        
        <div className="animate-pulse">
          <p className="text-sm text-gray-500">
            {window.opener ? 'This window will close automatically...' : 'Redirecting you back...'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationComplete;