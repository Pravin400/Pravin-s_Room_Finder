import { NavLink, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useEffect, useState } from 'react';
import logo from '../assets/navbar.png';
import ProfileMenu from './ProfileMenu';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white">
      {/* LOGO */}
      <NavLink to="/" className="flex items-center gap-2 font-bold text-lg">
        <img src={logo} alt="Logo" className="h-10 w-10" />
        RoomFinder
      </NavLink>

      {/* NAV LINKS */}
      <div className="flex items-center gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `transition-colors duration-200 ${
              isActive
                ? 'border-b-2 border-white font-semibold'
                : 'hover:text-blue-200'
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/add-room"
          className={({ isActive }) =>
            `transition-colors duration-200 ${
              isActive
                ? 'border-b-2 border-white font-semibold'
                : 'hover:text-blue-200'
            }`
          }
        >
          Add Room
        </NavLink>

        <NavLink
          to="/my-rooms"
          className={({ isActive }) =>
            `transition-colors duration-200 ${
              isActive
                ? 'border-b-2 border-white font-semibold'
                : 'hover:text-blue-200'
            }`
          }
        >
          My Rooms
        </NavLink>

        {user && <ProfileMenu user={user} />}
      </div>
    </nav>
  );
}
