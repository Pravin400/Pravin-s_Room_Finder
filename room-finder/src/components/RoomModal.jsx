import ImageCarousel from './ImageCarousel';

export default function RoomModal({ room, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white w-[90%] max-w-3xl rounded shadow relative">

        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl font-bold"
        >
          ✕
        </button>

        <ImageCarousel images={room.images} />

        <div className="p-4">
          <h2 className="text-xl font-bold">{room.title}</h2>
          <p>📍 {room.location}</p>
          <p className="font-semibold text-blue-600">₹ {room.rent}</p>
          <p>{room.property_type} • {room.tenant_preference}</p>
          <p className="mt-2">📞 {room.contact_number}</p>
        </div>
      </div>
    </div>
  );
}
