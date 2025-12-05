'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Play, Info, Star, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeroSectionProps {
  featuredMovies: Array<{
    id: number;
    title?: string;
    name?: string;
    original_title?: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    release_date?: string;
    first_air_date?: string;
    genre_ids: number[];
    media_type: 'movie' | 'tv';
  }>;
}

const genreMap: { [key: number]: string } = {
  28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
  80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family',
  14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music',
  9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV Movie',
  53: 'Thriller', 10752: 'War', 37: 'Western', 10759: 'Action & Adventure',
  10762: 'Kids', 10763: 'News', 10764: 'Reality', 10765: 'Sci-Fi & Fantasy',
  10766: 'Soap', 10767: 'Talk', 10768: 'War & Politics'
};

export default function HeroSection({ featuredMovies }: HeroSectionProps) {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  if (!featuredMovies || featuredMovies.length === 0) {
    return null;
  }

  const currentMovie = featuredMovies[currentMovieIndex];
  const nextMovie = featuredMovies[(currentMovieIndex + 1) % featuredMovies.length];
  if (!currentMovie) return null;

  const title = currentMovie.title || currentMovie.name || currentMovie.original_title || '';
  const rating = currentMovie.vote_average?.toFixed(1) || 'N/A';
  const releaseDate = currentMovie.release_date || currentMovie.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : '';
  const mediaType = currentMovie.media_type === 'tv' ? 'SERIES' : 'FILM';

  useEffect(() => {
    setIsInitialLoad(true);
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning && !isInitialLoad) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentMovieIndex((prevIndex) =>
            (prevIndex + 1) % featuredMovies.length
          );
        }, 500);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 1000);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [featuredMovies.length, isTransitioning, isInitialLoad]);

  const handleMovieSelect = (index: number) => {
    if (index !== currentMovieIndex && !isTransitioning && !isInitialLoad) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentMovieIndex(index);
      }, 500);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1000);
    }
  };

  const handlePreviousMovie = () => {
    if (!isTransitioning && !isInitialLoad) {
      const newIndex = currentMovieIndex === 0 ? featuredMovies.length - 1 : currentMovieIndex - 1;
      handleMovieSelect(newIndex);
    }
  };

  const handleNextMovie = () => {
    if (!isTransitioning && !isInitialLoad) {
      const newIndex = (currentMovieIndex + 1) % featuredMovies.length;
      handleMovieSelect(newIndex);
    }
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
          alt={title}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${isTransitioning ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            } ${isInitialLoad ? 'opacity-0' : ''}`}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        {/* Grid pattern for loading */}
        {(isTransitioning || isInitialLoad) && (
          <div className="absolute inset-0 bg-black transition-opacity duration-500">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }}
            />
          </div>
        )}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 z-20 flex items-center">
        <button
          onClick={handlePreviousMovie}
          className={`ml-4 p-3 rounded-full bg-black/30 hover:bg-black/50 text-white border border-white/20 hover:border-white/40 transition-all duration-300 ${isInitialLoad ? 'opacity-0' : 'opacity-100'
            }`}
          disabled={isTransitioning || isInitialLoad}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 z-20 flex items-center">
        <button
          onClick={handleNextMovie}
          className={`mr-4 p-3 rounded-full bg-black/30 hover:bg-black/50 text-white border border-white/20 hover:border-white/40 transition-all duration-300 ${isInitialLoad ? 'opacity-0' : 'opacity-100'
            }`}
          disabled={isTransitioning || isInitialLoad}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content */}
      <div className={`relative z-10 flex h-full items-end pb-16 lg:items-center lg:pb-0 transition-opacity duration-700 ${isInitialLoad ? 'opacity-0' : 'opacity-100'
        }`}>
        <div className="mx-auto grid w-full grid-cols-1 gap-8 px-4 py-20 md:px-6 lg:grid-cols-12 lg:gap-12 lg:px-12">
          {/* Left Column - Movie Info */}
          <div className={`flex flex-col justify-center space-y-4 md:mx-12 lg:col-span-7 lg:space-y-6 transition-all duration-700 ${isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
            }`}>
            {/* CinemaOS + Media Type Badge */}
            <div className="flex items-center gap-1.5 md:gap-2 lg:gap-3">
              <div className="flex items-center gap-1 md:gap-1.5 lg:gap-2">
                <div className="inline-flex items-center rounded-md border border-transparent shadow hover:bg-primary/80 bg-primary px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground md:px-2 md:py-1 md:text-xs lg:px-3">
                  CinemaOS
                </div>
                <div className="inline-flex items-center rounded-md border font-semibold border-white/40 bg-white/10 px-1.5 py-0.5 text-[10px] text-white backdrop-blur-sm md:px-2 md:py-1 md:text-xs lg:text-xs">
                  {mediaType}
                </div>
              </div>
            </div>

            {/* Movie Title (large text) */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-2xl">
              {title}
            </h1>

            {/* Rating, Year, Genre Badges */}
            <div className="flex flex-wrap items-center gap-1.5 md:gap-2 lg:gap-3">
              {/* Rating Badge */}
              <div className="relative flex items-center gap-1 overflow-hidden rounded-lg bg-gradient-to-br from-gray-900/90 to-gray-800/90 px-1.5 py-0.5 shadow-lg backdrop-blur-md md:gap-1.5 md:px-2 md:py-1 lg:px-3 lg:py-1.5">
                <span className="relative z-10 text-xs text-yellow-400 md:text-sm lg:text-base">★</span>
                <span className="relative z-10 text-[10px] font-bold text-white md:text-xs lg:text-sm">{rating}/10</span>
              </div>

              {/* Year Badge */}
              <div className="relative flex items-center gap-1 overflow-hidden rounded-lg bg-white/10 px-1.5 py-0.5 shadow-lg backdrop-blur-md border border-white/20 md:gap-1.5 md:px-2 md:py-1 lg:px-3">
                <Calendar className="relative z-10 h-3 w-3 text-white md:h-3.5 md:w-3.5 lg:h-4 lg:w-4" />
                <span className="relative z-10 text-[10px] font-semibold text-white md:text-xs lg:text-sm">{year}</span>
              </div>

              {/* Genre Badges */}
              {currentMovie.genre_ids?.slice(0, 2).map((genreId) => (
                <div
                  key={genreId}
                  className="inline-flex items-center rounded-md border border-transparent relative overflow-hidden bg-white/15 px-1.5 py-0.5 text-[10px] font-semibold shadow-lg backdrop-blur-md text-white md:px-2 md:py-1 md:text-xs lg:px-3 lg:text-sm"
                >
                  <span className="relative z-10">{genreMap[genreId] || 'Genre'}</span>
                </div>
              ))}
            </div>

            {/* Overview/Description */}
            <p className="max-w-2xl text-xs leading-relaxed text-white/90 drop-shadow-lg md:text-sm lg:text-base xl:text-lg line-clamp-3">
              {currentMovie.overview}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 md:gap-2 lg:gap-3">
              <Link
                href={currentMovie.media_type === 'tv'
                  ? `/Watch/${currentMovie.id}?season=1&episode=1`
                  : `/Watch/${currentMovie.id}`}
                className="inline-flex items-center justify-center whitespace-nowrap h-8 gap-1.5 rounded-md bg-white px-4 text-xs font-bold text-black hover:bg-white/90 md:h-10 md:gap-2 md:px-6 md:text-sm lg:h-12 lg:px-8 lg:text-base transition-all"
              >
                <Play className="h-3 w-3 fill-current md:h-4 md:w-4 lg:h-5 lg:w-5" />
                Watch Now
              </Link>
              <Link
                href={`/${currentMovie.media_type}/${currentMovie.id}`}
                className="inline-flex items-center justify-center whitespace-nowrap h-8 gap-1.5 rounded-md bg-white/20 px-4 text-xs font-bold text-white backdrop-blur-sm hover:bg-white/30 md:h-10 md:gap-2 md:px-6 md:text-sm lg:h-12 lg:px-8 lg:text-base transition-all"
              >
                <Info className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5" />
                More Info
              </Link>
            </div>
          </div>

          {/* Right Column - Stacked Poster Cards */}
          <div className="hidden lg:col-span-5 lg:flex lg:items-center lg:justify-end">
            <div className="relative mr-8" style={{ width: '320px', height: '400px' }}>
              {/* Current Movie Poster */}
              <div
                className={`absolute overflow-hidden rounded-lg border-2 border-white/20 shadow-2xl transition-all duration-500 ease-out ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                  }`}
                style={{ width: '280px', height: '400px', zIndex: 2, top: 0, left: 0 }}
              >
                {currentMovie.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Next Movie Poster (behind) */}
              <div
                className="absolute overflow-hidden rounded-lg border-2 border-white/10 shadow-xl transition-all duration-500 ease-out"
                style={{
                  width: '280px',
                  height: '400px',
                  zIndex: 1,
                  top: '20px',
                  left: '0px',
                  transform: 'translateX(32px) scale(0.9)',
                  opacity: 0.7
                }}
              >
                {nextMovie?.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${nextMovie.poster_path}`}
                    alt={nextMovie.title || nextMovie.name || ''}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}