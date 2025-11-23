"use client";
import React, { useState } from 'react';

type Props = {
  embedUrl: string;
  title: string;
  year?: string;
  rating?: number;
};

export default function VideoPlayerClient({ embedUrl, title, year, rating }: Props) {
  const [overlay, setOverlay] = useState(true);
  const handleResume = () => setOverlay(false);

  return (
    <div className="w-full"> 
      <div className="relative w-full h-0" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={embedUrl}
          className="absolute top-0 left-0 w-full h-full"
          frameBorder={0}
          allowFullScreen
          loading="lazy"
        />
        {overlay && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-center px-6" style={{ backdropFilter: 'blur(2px)' }}>
            <h2 className="text-2xl md:text-4xl font-bold mb-2">{title}</h2>
            <div className="flex items-center text-sm mb-4 text-gray-200">
              {year && <span className="mr-2">{year}</span>}
              {typeof rating === 'number' && (
                <span className="flex items-center gap-1">
                  <span>★</span>
                  <span className="mr-2">{rating.toFixed(1)}</span>
                </span>
              )}
            </div>
            <button
              onClick={handleResume}
              className="bg-white text-black px-6 py-2 rounded-full font-semibold shadow hover:bg-gray-100"
            >
              Resume
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
