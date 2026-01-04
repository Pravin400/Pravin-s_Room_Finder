import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, useParams } from 'react-router-dom';
import ImageDropzone from '../components/ImageDropZone';


export default function EditRoom() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [newPreviews, setNewPreviews] = useState([]);


  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const [form, setForm] = useState({
    title: '',
    location: '',
    rent: '',
    property_type: '',
    tenant_preference: '',
    contact_number: '',
  });

  /* 🔐 Fetch room & auth */
  useEffect(() => {
    const fetchRoom = async () => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) {
        navigate('/login');
        return;
      }

      setUser(auth.user);

      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('id', id)
        .single();

      if (error || data.owner_id !== auth.user.id) {
        alert('Unauthorized');
        navigate('/my-rooms');
        return;
      }

      setForm({
        title: data.title,
        location: data.location,
        rent: data.rent,
        property_type: data.property_type,
        tenant_preference: data.tenant_preference,
        contact_number: data.contact_number,
      });

      setExistingImages(data.images || []);
      setLoading(false);
    };

    fetchRoom();
  }, [id, navigate]);

  /* 🧾 Handlers */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);
    setPreviewImages(files.map((f) => URL.createObjectURL(f)));
  };

  const removeExistingImage = (img) => {
    setExistingImages(existingImages.filter((i) => i !== img));
  };

  /* ☁️ Upload new images */
 const uploadNewImages = async () => {
  const urls = [];

  for (let file of newImages) {
    const path = `${user.id}/${Date.now()}-${file.name}`;
    await supabase.storage.from('room-images').upload(path, file);

    const { data } = supabase.storage
      .from('room-images')
      .getPublicUrl(path);

    urls.push(data.publicUrl);
  }

  return urls;
};


  /* 💾 Submit update */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let updatedImages = [...existingImages];

      if (newImages.length > 0) {
        const newUrls = await uploadNewImages();
        updatedImages = [...updatedImages, ...newUrls];
      }

      const { error } = await supabase
        .from('rooms')
        .update({ ...form, images: updatedImages })
        .eq('id', id);

      if (error) throw error;

      alert('Room updated successfully');
      navigate('/my-rooms');
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto mt-6 bg-white p-6 rounded shadow"
    >
      <h2 className="text-xl font-bold mb-4">Edit Room</h2>

      <input name="title" value={form.title} onChange={handleChange}
        className="w-full border p-2 mb-3" placeholder="Title" required />

      <input name="location" value={form.location} onChange={handleChange}
        className="w-full border p-2 mb-3" placeholder="Location" required />

      <input name="rent" type="number" value={form.rent} onChange={handleChange}
        className="w-full border p-2 mb-3" placeholder="Rent" required />

      <select name="property_type" value={form.property_type}
        onChange={handleChange} className="w-full border p-2 mb-3" required>
        <option value="">Property Type</option>
        <option>1 BHK</option><option>2 BHK</option>
        <option>1 Bed</option><option>2 Bed</option><option>3 Bed</option>
      </select>

      <select name="tenant_preference" value={form.tenant_preference}
        onChange={handleChange} className="w-full border p-2 mb-3" required>
        <option value="">Tenant Preference</option>
        <option>Bachelor</option><option>Family</option>
        <option>Girls</option><option>Working</option>
      </select>

      <input name="contact_number" value={form.contact_number}
        onChange={handleChange} className="w-full border p-2 mb-3"
        placeholder="Contact Number" required />

      {/* Existing images */}
      <p className="font-semibold mb-1">Existing Images</p>
      <div className="flex gap-2 flex-wrap mb-4">
        {existingImages.map((img, i) => (
          <div key={i} className="relative">
            <img src={img} className="h-16 w-16 object-cover border" />
            <button type="button"
              onClick={() => removeExistingImage(img)}
              className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1">
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Add new images */}
      <p className="font-semibold mb-2">Add More Images</p>

<ImageDropzone
  images={newImages}
  setImages={setNewImages}
  previews={newPreviews}
  setPreviews={setNewPreviews}
/>


      <button className="w-full bg-blue-600 text-white p-2 rounded">
        Update Room
      </button>
    </form>
  );
}
