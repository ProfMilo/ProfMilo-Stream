'use client';

import Link from 'next/link';
import { Play, Info, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeroSectionProps {
  featuredMovies: Array<{
    id: number;
    title: string;
    original_title?: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    release_date: string;
    genre_ids: number[];
    media_type: 'movie' | 'tv';
  }>;
}

export default function HeroSection({ featuredMovies }: HeroSectionProps) {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const currentMovie = featuredMovies[currentMovieIndex];
  
  const title = currentMovie.title || currentMovie.original_title;
  const rating = currentMovie.vote_average?.toFixed(1) || 'N/A';
  const releaseDate = new Date(currentMovie.release_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Initial load animation - ensure it works for both first visit and refresh
  useEffect(() => {
    // Force initial load state to true on mount
    setIsInitialLoad(true);
    
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 800); // Show grid pattern for 800ms before transitioning to content

    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures this runs only once on mount

  // Auto-switch between movies every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning && !isInitialLoad) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentMovieIndex((prevIndex) => 
            (prevIndex + 1) % featuredMovies.length
          );
          // Remove the delay for fade-in since it now happens simultaneously
        }, 1000); // Wait for fade-out animation to complete
        setTimeout(() => {
          setIsTransitioning(false);
        }, 1000); // Set transitioning to false after fade-out completes
      }
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [featuredMovies.length, isTransitioning, isInitialLoad]);

  const handleMovieSelect = (index: number) => {
    if (index !== currentMovieIndex && !isTransitioning && !isInitialLoad) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentMovieIndex(index);
        // Remove the delay for fade-in since it now happens simultaneously
      }, 1000);
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
          alt={title}
          className={`w-full h-full object-cover transition-all duration-1000 ease-in-out ${
            isTransitioning ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          } ${isInitialLoad ? 'opacity-0 scale-105' : ''}`}
        />
        <div className={`absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50 transition-opacity duration-1000 ease-in-out ${
          isInitialLoad ? 'opacity-0' : 'opacity-100'
        }`} />
        
        {/* Grid pattern background - shows first, then transitions to movie content */}
        {(isTransitioning || isInitialLoad) && (
          <div className={`absolute inset-0 bg-black transition-opacity duration-1000 ease-in-out ${
            isInitialLoad ? 'opacity-100' : 'opacity-100'
          }`}>
            {/* Grid pattern overlay */}
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
      <div className="absolute inset-0 z-20 flex items-center justify-between pointer-events-none">
        {/* Left Arrow */}
        <button
          onClick={handlePreviousMovie}
          className={`ml-8 p-3 rounded-full bg-black/30 hover:bg-black/50 text-white border border-white/20 hover:border-white/40 transition-all duration-300 ease-in-out pointer-events-auto ${
            isInitialLoad ? 'opacity-0' : 'opacity-100'
          }`}
          disabled={isTransitioning || isInitialLoad}
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNextMovie}
          className={`mr-8 p-3 rounded-full bg-black/30 hover:bg-black/50 text-white border border-white/20 hover:border-white/40 transition-all duration-300 ease-in-out pointer-events-auto ${
            isInitialLoad ? 'opacity-0' : 'opacity-100'
          }`}
          disabled={isTransitioning || isInitialLoad}
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      <div className={`relative z-10 container mx-auto px-4 max-w-7xl transition-opacity duration-1000 ease-in-out ${
        isInitialLoad ? 'opacity-0' : 'opacity-100'
      }`}>
        <div className="flex flex-col lg:flex-row items-start justify-start gap-12 pt-20">
          {/* Left: Movie Poster */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative group">
              <img
                src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}
                alt={title}
                className={`w-80 h-auto rounded-lg shadow-2xl group-hover:scale-105 transition-all duration-1000 ease-in-out ${
                  isTransitioning ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
                } ${isInitialLoad ? 'opacity-0 translate-y-3' : ''}`}
              />
            </div>
          </div>

          {/* Right: Movie Details */}
          <div className="text-white space-y-8 max-w-2xl">
            {/* Top Tags */}
            <div className={`flex items-center gap-3 mb-6 transition-all duration-1000 ease-in-out ${
              isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
            } ${isInitialLoad ? 'opacity-0 translate-x-4' : ''}`}>
              <span className="px-4 py-2 bg-black/50 backdrop-blur-sm border border-white text-white text-sm font-medium rounded-full">
                Movie
              </span>
            </div>

            {/* Movie Title */}
            <h1 className={`text-5xl lg:text-6xl font-black leading-[0.85] tracking-tight text-white antialiased font-sans transition-all duration-1000 ease-in-out ${
              isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
            } ${isInitialLoad ? 'opacity-0 translate-x-4' : ''}`}
            style={{
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale'
            }}>
              {title}
            </h1>
            
            {/* Rating, Release Date, and Genres */}
            <div className={`flex items-center gap-4 mb-6 transition-all duration-1000 ease-in-out ${
              isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
            } ${isInitialLoad ? 'opacity-0 translate-x-4' : ''}`}>
              {/* Rating with yellow star and border */}
              <div className="flex items-center gap-2 bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/40 rounded-full px-4 py-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-bold text-yellow-400">{rating}</span>
              </div>
              {/* Release Date */}
              <div className="flex items-center gap-2 text-white bg-black/50 backdrop-blur-sm border border-white rounded-full px-4 py-2">
                <span className="text-sm">{releaseDate}</span>
              </div>
              {/* Genre Tags */}
              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 bg-white/30 backdrop-blur-sm border border-white/60 text-white text-xs font-medium rounded-full">
                  Sci-Fi
                </span>
                <span className="px-3 py-1.5 bg-white/30 backdrop-blur-sm border border-white/60 text-white text-xs font-medium rounded-full">
                  Adventure
                </span>
                <span className="px-3 py-1.5 bg-white/30 backdrop-blur-sm border border-white/60 text-white text-xs font-medium rounded-full">
                  Action
                </span>
              </div>
            </div>

            {/* Synopsis */}
            <p className={`text-lg text-gray-300 leading-relaxed mb-8 transition-all duration-1000 ease-in-out ${
              isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
            } ${isInitialLoad ? 'opacity-0 translate-x-4' : ''}`}>
              {currentMovie.overview}
            </p>

            {/* Action Buttons */}
            <div className={`flex flex-wrap gap-4 transition-all duration-1000 ease-in-out ${
              isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
            } ${isInitialLoad ? 'opacity-0 translate-x-4' : ''}`}>
              <Link
                href={`/Watch/${currentMovie.id}`}
                className="inline-flex items-center gap-3 bg-white text-black hover:bg-gray-100 hover:scale-110 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ease-in-out"
              >
                <Play className="w-6 h-6 text-black fill-black" />
                Watch Now
              </Link>
              
              <Link
                href={`/${currentMovie.media_type}/${currentMovie.id}`}
                className="inline-flex items-center gap-3 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 ease-in-out border border-white"
              >
                <Info className="w-6 h-6" />
                Details
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Carousel Indicator - Movie Posters */}
        <div className={`mt-16 flex justify-center transition-opacity duration-1000 ease-in-out ${
          isInitialLoad ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className="flex space-x-4">
            {featuredMovies.map((movie, index) => (
              <div
                key={movie.id}
                onClick={() => handleMovieSelect(index)}
                className={`relative cursor-pointer transition-all duration-600 ease-in-out ${
                  index === currentMovieIndex 
                    ? 'scale-110' 
                    : 'scale-100 hover:scale-105'
                }`}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className={`w-20 h-28 object-cover rounded-lg shadow-lg transition-all duration-400 ${
                    index === currentMovieIndex 
                      ? 'ring-2 ring-white ring-offset-0' 
                      : ''
                  }`}
                />
                {index === currentMovieIndex && (
                  <div className="absolute inset-0 bg-white/20 rounded-lg pointer-events-none transition-opacity duration-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}