import { useEffect, useRef, useState } from 'react';

export default function ImageCarousel({ images, height = 'h-48' }) {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    start();
    return stop;
  }, []);

  const start = () => {
    stop();
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 2500);
  };

  const stop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  if (!images || images.length === 0) return null;

  return (
    <div
      onMouseEnter={stop}
      onMouseLeave={start}
      className={`${height} overflow-hidden`}
    >
      <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
  <img
    src={image}
    className="max-h-full max-w-full object-contain"
  />
</div>

    </div>
  );
}
