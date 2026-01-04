import { useRef } from 'react';

export default function ImageDropzone({
  images,
  setImages,
  previews,
  setPreviews,
}) {
  const fileInputRef = useRef(null);

  const addFile = (file) => {
    setImages((prev) => [...prev, file]);
    setPreviews((prev) => [...prev, URL.createObjectURL(file)]);
  };

  const handleDrop = async (e) => {
    e.preventDefault();

    const items = e.dataTransfer.items;

    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      /* ✅ CASE 1: REAL FILE (local drag) */
      if (item.kind === 'file') {
        const file = item.getAsFile();
        if (file && file.type.startsWith('image/')) {
          addFile(file);
        }
      }

      /* ✅ CASE 2: BROWSER IMAGE (HTML content) */
      if (item.kind === 'string' && item.type === 'text/html') {
        item.getAsString(async (html) => {
          const match = html.match(/src="(.*?)"/);
          if (!match) return;

          const imageUrl = match[1];

          try {
            const res = await fetch(imageUrl);
            const blob = await res.blob();

            const file = new File(
              [blob],
              `image-${Date.now()}.png`,
              { type: blob.type }
            );

            addFile(file);
          } catch (err) {
            console.warn('Image fetch blocked by CORS');
          }
        });
      }
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div
        onClick={() => fileInputRef.current.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="border-2 border-dashed border-gray-400 rounded-lg
                   p-6 text-center cursor-pointer hover:bg-gray-50"
      >
        <p className="text-gray-600">
          Drag & drop images here, or click to select
        </p>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          hidden
          accept="image/*"
          onChange={(e) => {
            Array.from(e.target.files).forEach(addFile);
          }}
        />
      </div>

      {previews.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-4">
          {previews.map((img, i) => (
            <div key={i} className="relative">
              <img
                src={img}
                className="h-20 w-20 object-contain border rounded"
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute -top-2 -right-2 bg-red-600
                           text-white text-xs rounded-full px-1"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
