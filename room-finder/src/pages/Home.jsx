import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import RoomCard from '../components/RoomCard';

export default function Home() {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);

  // 🔍 Filters
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [tenantPref, setTenantPref] = useState('');

  /* 📥 Fetch rooms */
  useEffect(() => {
    const fetchRooms = async () => {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) {
        setRooms(data || []);
        setFilteredRooms(data || []);
      }
    };

    fetchRooms();
  }, []);

  /* 🔎 Apply filters */
  useEffect(() => {
    let result = [...rooms];

    // 1️⃣ Location (HIGHEST PRIORITY)
    if (location.trim()) {
      result = result.filter((room) =>
        room.location
          ?.toLowerCase()
          .includes(location.toLowerCase())
      );
    }

    // 2️⃣ Price range
    if (minPrice) {
      result = result.filter(
        (room) => Number(room.rent) >= Number(minPrice)
      );
    }

    if (maxPrice) {
      result = result.filter(
        (room) => Number(room.rent) <= Number(maxPrice)
      );
    }

    // 3️⃣ Property type
    if (propertyType) {
      result = result.filter(
        (room) => room.property_type === propertyType
      );
    }

    // 4️⃣ Tenant preference
    if (tenantPref) {
      result = result.filter(
        (room) => room.tenant_preference === tenantPref
      );
    }

    setFilteredRooms(result);
  }, [location, minPrice, maxPrice, propertyType, tenantPref, rooms]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Find Rooms</h2>

      {/* 🔍 FILTER UI */}
      <div className="bg-white p-4 rounded shadow mb-6 grid gap-4
                      md:grid-cols-5">

        {/* Location */}
        <input
          type="text"
          placeholder="Search by location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded"
        />

        {/* Min Price */}
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border p-2 rounded"
        />

        {/* Max Price */}
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border p-2 rounded"
        />

        {/* Property Type */}
        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Property Type</option>
          <option>1 BHK</option>
          <option>2 BHK</option>
          <option>1 Bed</option>
          <option>2 Bed</option>
          <option>3 Bed</option>
        </select>

        {/* Tenant Preference */}
        <select
          value={tenantPref}
          onChange={(e) => setTenantPref(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Tenant Preference</option>
          <option>Bachelor</option>
          <option>Family</option>
          <option>Girls</option>
          <option>Working</option>
        </select>
      </div>

      {/* 🏠 ROOM LIST */}
      {filteredRooms.length === 0 ? (
        <p className="text-gray-500">No rooms found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
}
