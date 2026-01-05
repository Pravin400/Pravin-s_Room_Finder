import { useRef } from 'react';

export default function ImageDropzone({
  images,
  setImages,
  previews,
  setPreviews,
}) {
  const inputRef = useRef(null);

  const addFiles = (files) => {
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return;

      setImages((prev) => [...prev, file]);
      setPreviews((prev) => [
        ...prev,
        URL.createObjectURL(file),
      ]);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const files = e.dataTransfer.files;

    if (!files || files.length === 0) {
      alert('Only device images are supported.');
      return;
    }

    addFiles(files);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="border-2 border-dashed border-gray-400 rounded-lg
                   p-6 text-center cursor-pointer hover:bg-gray-50"
      >
        <p className="text-gray-600">
          Drag & drop images from your device
          <br />
          or click to select
        </p>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          hidden
          onChange={(e) => addFiles(e.target.files)}
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
