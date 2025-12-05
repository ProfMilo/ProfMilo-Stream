"use client";
import React, { useState } from 'react';
import { Play, Star, Clock } from 'lucide-react';

type Props = {
  embedUrl: string;
  title: string;
  year?: string;
  rating?: number;
  runtime?: number;
  overview?: string;
};

export default function VideoPlayerClient({ embedUrl, title, year, rating, runtime, overview }: Props) {
  const [overlay, setOverlay] = useState(true);
  const handleResume = () => setOverlay(false);

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="w-full">
      <div className="relative w-full h-0" style={{ paddingBottom: '56.25%' }}>
        {/* Red curtain background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(180deg, #1a0000 0%, #2d0a0a 50%, #1a0000 100%)',
            backgroundImage: `
              radial-gradient(ellipse at 20% 50%, rgba(139, 0, 0, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 50%, rgba(139, 0, 0, 0.3) 0%, transparent 50%),
              linear-gradient(180deg, #0d0000 0%, #1a0505 20%, #2d0a0a 50%, #1a0505 80%, #0d0000 100%)
            `,
          }}
        />

        {/* Video iframe */}
        <iframe
          src={embedUrl}
          className="absolute top-0 left-0 w-full h-full z-10"
          frameBorder={0}
          allowFullScreen
          loading="lazy"
          allow="autoplay; fullscreen; encrypted-media"
        />

        {/* Overlay with movie info */}
        {overlay && (
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center px-6"
            style={{
              background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.7) 100%)',
              backdropFilter: 'blur(4px)',
            }}
          >
            {/* Title */}
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 max-w-4xl">
              {title}
            </h2>

            {/* Meta info */}
            <div className="flex items-center gap-3 text-sm md:text-base text-gray-300 mb-4">
              {year && <span>{year}</span>}
              {runtime && runtime > 0 && (
                <>
                  <span className="text-gray-500">•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {formatRuntime(runtime)}
                  </span>
                </>
              )}
              {typeof rating === 'number' && rating > 0 && (
                <>
                  <span className="text-gray-500">•</span>
                  <span className="flex items-center gap-1 text-yellow-400">
                    <Star className="h-4 w-4 fill-yellow-400" />
                    {rating.toFixed(1)}
                  </span>
                </>
              )}
            </div>

            {/* Overview */}
            {overview && (
              <p className="text-sm md:text-base text-gray-300 max-w-3xl line-clamp-3 mb-6">
                {overview}
              </p>
            )}

            {/* Resume button */}
            <button
              onClick={handleResume}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
            >
              <Play className="h-5 w-5 fill-white" />
              Resume
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
