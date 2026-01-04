import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import ImageCarousel from '../components/ImageCarousel';

export default function RoomDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const load = async () => {
      const { data: auth } = await supabase.auth.getUser();
      setUser(auth.user);

      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        navigate('/');
        return;
      }

      setRoom(data);
    };

    load();
  }, [id, navigate]);

  if (!room) return <p className="text-center mt-10">Loading...</p>;

  const isOwner = user && user.id === room.owner_id;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <ImageCarousel images={room.images} height="h-[420px]" />

      <div className="mt-6 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold">{room.title}</h1>
          <p className="text-gray-600">📍 {room.location}</p>

          <p className="mt-3"><b>Rent:</b> ₹ {room.rent}</p>
          <p><b>Type:</b> {room.property_type}</p>
          <p><b>Tenant:</b> {room.tenant_preference}</p>
        </div>

        <div className="border rounded p-4 h-fit">
          <h3 className="font-semibold mb-2">Contact</h3>
          <p>📞 {room.contact_number}</p>

          {isOwner && (
            <>
              <hr className="my-3" />
              <button
                onClick={() => navigate(`/edit-room/${room.id}`)}
                className="w-full bg-yellow-500 text-white py-2 rounded mb-2"
              >
                Edit Room
              </button>

              <button
                onClick={async () => {
                  if (!window.confirm('Delete room?')) return;
                  await supabase.from('rooms').delete().eq('id', room.id);
                  navigate('/my-rooms');
                }}
                className="w-full bg-red-600 text-white py-2 rounded"
              >
                Delete Room
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
