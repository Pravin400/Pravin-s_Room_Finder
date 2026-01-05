import { useEffect, useRef, useState } from 'react';

export default function ImageCarousel({ images, height = 'h-40' }) {
  const safeImages = Array.isArray(images) ? images : [];
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  if (safeImages.length === 0) {
    return (
      <div className={`${height} bg-gray-100 flex items-center justify-center`}>
        <span className="text-gray-400 text-sm">No Image</span>
      </div>
    );
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % safeImages.length);
    }, 2500);

    return () => clearInterval(intervalRef.current);
  }, [safeImages.length]);

  return (
    <div className={`${height} overflow-hidden bg-gray-100`}>
      <img
        src={safeImages[index]}
        className="w-full h-full object-contain"
        alt="room"
      />
    </div>
  );
}
