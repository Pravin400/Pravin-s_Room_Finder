import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useEffect, useState } from 'react';

export default function RequireAuth({ children }) {
  const { otpVerified } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  if (!user) return <Navigate to="/login" />;

  // 🔴 THIS IS THE OTP ENFORCEMENT
  if (!otpVerified) return <Navigate to="/login" />;

  return children;
}
