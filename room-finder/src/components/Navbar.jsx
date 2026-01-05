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
    <nav className="flex flex-wrap justify-between items-center px-6 py-4 bg-blue-600 text-white">
  {/* LOGO */}
  <NavLink
    to="/"
    className="flex items-center gap-2 font-bold text-lg whitespace-nowrap"
  >
    <img src={logo} alt="Logo" className="h-10 w-10" />
    <span className="">RoomFinder</span>
  </NavLink>

  {/* NAV LINKS */}
  <div className="flex items-center gap-6 flex-wrap justify-end">
    <NavLink to="/">Home</NavLink>

    {user ? (
      <>
        <NavLink to="/add-room">Add Room</NavLink>
        <NavLink to="/my-rooms">My Rooms</NavLink>
        <ProfileMenu user={user} />
      </>
    ) : (
      <NavLink to="/login">Login</NavLink>
    )}
  </div>
</nav>

  );
}
