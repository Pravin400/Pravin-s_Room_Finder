import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import RoomCard from '../components/RoomCard';

export default function MyRooms() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyRooms = async () => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) {
        navigate('/login');
        return;
      }

      const { data } = await supabase
        .from('rooms')
        .select('*')
        .eq('owner_id', auth.user.id)
        .order('created_at', { ascending: false });

      setRooms(data || []);
    };

    fetchMyRooms();
  }, [navigate]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Rooms</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
}
