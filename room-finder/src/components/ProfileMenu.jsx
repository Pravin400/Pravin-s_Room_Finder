import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function ProfileMenu({ user }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  if (!user) return null;

  const logout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  // 👤 Profile name (email before @)
  const profileName = user.email.split('@')[0];

  return (
    <div className="relative">
      {/* Profile button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-blue-700 px-3 py-1 rounded-full hover:bg-blue-800"
      >
        {/* Avatar */}
        <div className="h-8 w-8 rounded-full bg-white text-blue-700
                        flex items-center justify-center font-bold">
          {profileName[0].toUpperCase()}
        </div>

        {/* Name */}
        <span className="hidden md:block">
          {profileName}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white text-black
                        rounded shadow-lg p-4 z-50">
          <p className="text-sm text-gray-500 mb-1">
            Signed in as
          </p>
          <p className="font-semibold break-all">
            {user.email}
          </p>

          <hr className="my-3" />

          <button
            onClick={logout}
            className="w-full text-left text-red-600
                       hover:bg-gray-100 px-2 py-1 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
