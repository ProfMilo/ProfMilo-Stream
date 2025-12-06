'use client';

import Link from 'next/link';
import { ChevronRight, Star } from 'lucide-react';

interface TopMoviesSectionProps {
  movies: Array<{
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    media_type: 'movie' | 'tv';
  }>;
}

export default function TopMoviesSection({ movies }: TopMoviesSectionProps) {
  return (
    <section className="py-16 bg-gradient-to-b from-transparent to-background/50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold text-white">TOP 10 Movies</h2>
          <Link
            href="/movie"
            className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            style={{ backgroundColor: '#3a3a3c' }}
          >
            MOVIES
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.slice(0, 10).map((movie, index) => (
            <Link
              key={`top-movie-${movie.id}`}
              href={`/${movie.media_type}/${movie.id}`}
              className="group relative"
            >
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-zinc-800">
                {/* Number Badge */}
                <div className="absolute bottom-2 left-2 z-10 text-white font-bold text-6xl opacity-50 drop-shadow-lg">
                  <span className="text-stroke-white text-stroke-2">{index + 1}</span>
                </div>

                {/* Movie Poster */}
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-700 flex items-center justify-center text-sm text-gray-400">
                    No image
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-4 border-white flex items-center justify-center bg-white/20 backdrop-blur-sm">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6 4l10 6-10 6V4z" />
                    </svg>
                  </div>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-2 right-2 z-10">
                  <div className="flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-white text-xs font-bold">{movie.vote_average?.toFixed(1) || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Movie Title */}
              <h3 className="mt-3 text-sm font-medium text-white group-hover:text-primary transition-colors duration-200 line-clamp-2">
                {movie.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
