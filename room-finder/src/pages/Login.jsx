import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { setOtpVerified } = useAuth(); // ✅ INSIDE component
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendOtp = async () => {
    setError('');
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({ email });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setStep(2);
    }
  };

  const verifyOtp = async () => {
    setError('');
    setLoading(true);

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email',
    });

    setLoading(false);

    if (error) {
      setError('Invalid or expired OTP');
      return;
    }

    if (data?.session) {
      setOtpVerified(true); // ✅ OTP GATE PASSED
      navigate('/');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-lg font-bold mb-4 text-center">
          Login with OTP
        </h2>

        {step === 1 && (
          <>
            <input
              type="email"
              className="border p-2 w-full mb-3"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={sendOtp}
              disabled={loading}
              className="bg-blue-600 text-white w-full p-2 rounded"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              className="border p-2 w-full mb-3"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
            />

            <button
              onClick={verifyOtp}
              disabled={loading}
              className="bg-green-600 text-white w-full p-2 rounded"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>

            <p className="text-xs mt-2 text-gray-500 text-center">
              Do NOT click the email link. Enter OTP here.
            </p>
          </>
        )}

        {error && (
          <p className="text-red-600 text-sm mt-3 text-center">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
