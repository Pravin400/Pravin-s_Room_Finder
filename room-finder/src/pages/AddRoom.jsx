import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import ImageDropzone from '../components/ImageDropZone';



export default function AddRoom() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
const [previews, setPreviews] = useState([]);
const [images, setImages] = useState([]);

  const [form, setForm] = useState({
    title: '',
    location: '',
    rent: '',
    property_type: '',
    tenant_preference: '',
    contact_number: '',
    images: [],
  });

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        navigate('/login');
      } else {
        setUser(data.user);
      }
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, images: e.target.files });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
const { data, error } = await supabase.storage.listBuckets();
console.log(data, error);

  try {
    // 1. Upload images
   const uploadImages = async () => {
  const urls = [];

  for (let file of images) {
    const path = `${user.id}/${Date.now()}-${file.name}`;
    await supabase.storage.from('room-images').upload(path, file);

    const { data } = supabase.storage
      .from('room-images')
      .getPublicUrl(path);

    urls.push(data.publicUrl);
  }

  return urls;
};



    // 2. Insert room data into DB
    const { error } = await supabase.from('rooms').insert([
      {
        title: form.title,
        location: form.location,
        rent: form.rent,
        property_type: form.property_type,
        tenant_preference: form.tenant_preference,
        contact_number: form.contact_number,
        images: imageUrls,
        owner_id: user.id,
      },
    ]);

    if (error) throw error;

    alert('Room added successfully!');
    navigate('/my-rooms');
  } catch (err) {
    alert(err.message);
  }
};


  if (!user) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto mt-6 bg-white p-6 rounded shadow"
    >
      <h2 className="text-xl font-bold mb-4">Add Room</h2>

      <input name="title" placeholder="Room Title" className="w-full border p-2 mb-3" onChange={handleChange} />
      <input name="location" placeholder="Location" className="w-full border p-2 mb-3" onChange={handleChange} />
      <input name="rent" type="number" placeholder="Rent" className="w-full border p-2 mb-3" onChange={handleChange} />

      <select name="property_type" className="w-full border p-2 mb-3" onChange={handleChange}>
        <option value="">Property Type</option>
        <option>1 BHK</option>
        <option>2 BHK</option>
        <option>1 Bed</option>
        <option>2 Bed</option>
        <option>3 Bed</option>
      </select>

      <select name="tenant_preference" className="w-full border p-2 mb-3" onChange={handleChange}>
        <option value="">Tenant Preference</option>
        <option>Bachelor</option>
        <option>Family</option>
        <option>Girls</option>
        <option>Working</option>
      </select>

      <input name="contact_number" placeholder="Contact Number" className="w-full border p-2 mb-3" onChange={handleChange} />
      <ImageDropzone
  images={images}
  setImages={setImages}
  previews={previews}
  setPreviews={setPreviews}
/>


      <button className="w-full bg-blue-600 text-white p-2 rounded">
        Add Room
      </button>
    </form>
  );
}
