import { useNavigate } from 'react-router-dom';
import ImageCarousel from './ImageCarousel';

export default function RoomCard({ room }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/room/${room.id}`)}
      className="border rounded shadow bg-white cursor-pointer hover:shadow-lg transition"
    >
      <ImageCarousel images={room.images} height="h-40" />

      <div className="p-4">
        <h3 className="font-semibold text-lg">{room.title}</h3>
        <p className="text-sm text-gray-600">📍 {room.location}</p>
        <p className="font-bold text-blue-600">₹ {room.rent}</p>
        <p className="text-sm">
          {room.property_type} • {room.tenant_preference}
        </p>
      </div>
    </div>
  );
}
