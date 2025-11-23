'use client';

import { useState } from 'react';
import { Wifi, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const streamingProviders = [
  { 
    id: 'netflix', 
    name: 'NETFLIX', 
    logo: 'https://img.icons8.com/color/240/amazon-prime.png',
    isSelected: true 
  },
  { 
    id: 'apple-tv', 
    name: 'Apple TV', 
    logo: 'https://img.icons8.com/ios-filled/250/apple-tv.png',
    isSelected: false 
  },
  { 
    id: 'prime', 
    name: 'Prime Video', 
    logo: 'https://img.icons8.com/color/240/amazon-prime.png',
    isSelected: false 
  },
  { 
    id: 'hulu', 
    name: 'Hulu', 
    logo: 'https://img.icons8.com/ios-filled/250/hulu.png',
    isSelected: false 
  },
  { 
    id: 'hbo-max', 
    name: 'HBO Max', 
    logo: 'https://img.icons8.com/ios-filled/250/hbo-max.png',
    isSelected: false 
  },
  { 
    id: 'paramount', 
    name: 'Paramount+', 
    logo: 'https://www.paramountplus.com/assets/images/intl-landing-page/pplus_marketing_site_logo_white.png',
    isSelected: false 
  },
  { 
    id: 'disney', 
    name: 'Disney+', 
    logo: 'https://img.icons8.com/nolan/256/disney-plus.png',
    isSelected: false 
  },
  { 
    id: 'shudder', 
    name: 'Shudder', 
    logo: 'https://img.icons8.com/ios-filled/250/apple-tv.png',
    isSelected: false 
  },
];

const netflixMovies = [
  {
    title: 'KPop Demon Hunters',
    year: '2025',
    genre: 'Animation',
    rating: '8.4',
    description: 'When K-pop superstars Rumi, Mira and Zoey aren\'t selling out stadiums, they\'re using their secret powers to protect their...',
    image: '/placeholder-poster.jpg'
  },
  {
    title: 'My Oxford Year',
    year: '2025',
    genre: 'Romance',
    rating: '7.2',
    description: 'An ambitious American fulfilling her dream of studying at Oxford falls for a charming Brit hiding a secret that may...',
    image: '/placeholder-poster.jpg'
  },
  {
    title: 'Night Always Comes',
    year: '2025',
    genre: 'Thriller',
    rating: '6.1',
    description: 'Facing eviction in a city her family can no longer afford, a woman plunges into a desperate and increasingly dangerous...',
    image: '/placeholder-poster.jpg'
  },
  {
    title: 'Happy Gilmore 2',
    year: '2025',
    genre: 'Comedy',
    rating: '6.7',
    description: 'Happy Gilmore isn\'t done with golf - not by a long shot. Since his retirement after his first Tour Championship win, Gilmore...',
    image: '/placeholder-poster.jpg'
  }
];

export default function StreamingProvidersSection() {
  const [selectedProvider, setSelectedProvider] = useState('netflix');
  const [contentType, setContentType] = useState<'movies' | 'tv-shows'>('movies');

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Streaming Providers Section */}
        <div className="mb-16">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-4">Streaming Providers</h2>
            <p className="text-xl text-gray-400">
              Browse content from your favorite streaming services.
            </p>
          </div>

          {/* Provider Buttons Grid */}
          <div className="flex justify-center gap-6 mb-10">
            {streamingProviders.map((provider) => (
              <button
                key={provider.id}
                onClick={() => setSelectedProvider(provider.id)}
                className={`flex items-center justify-center p-6 rounded-xl transition-all duration-200 ${
                  selectedProvider === provider.id
                    ? 'bg-transparent border-2 border-white'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                <img 
                  src={provider.logo} 
                  alt={provider.name}
                  className="w-14 h-14 object-contain grayscale brightness-0 invert"
                />
              </button>
            ))}
          </div>

          {/* Content Type Toggle */}
          <div className="flex justify-center">
            <div className="flex bg-gray-800 rounded-xl p-2">
              <button
                onClick={() => setContentType('movies')}
                className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
                  contentType === 'movies'
                    ? 'bg-gray-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Movies
              </button>
              <button
                onClick={() => setContentType('tv-shows')}
                className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
                  contentType === 'tv-shows'
                    ? 'bg-gray-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                TV Shows
              </button>
            </div>
          </div>
        </div>

        {/* Netflix Movies Section */}
        <div className="mb-8">
          <h3 className="text-4xl font-bold text-white mb-8 text-center">
            {streamingProviders.find(p => p.id === selectedProvider)?.name} {contentType === 'movies' ? 'Movies' : 'TV Shows'}
          </h3>
          
          {/* Content Cards with Navigation */}
          <div className="relative">
            {/* Left Navigation Arrow */}
            <button className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200">
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Navigation Arrow */}
            <button className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200">
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Content Cards */}
            <div className="flex gap-6 overflow-x-auto px-16 scrollbar-hide">
              {netflixMovies.map((movie, index) => (
                <div key={index} className="flex-shrink-0 w-64 bg-gray-800 rounded-lg overflow-hidden">
                  {/* Movie Poster */}
                  <div className="relative h-80 bg-gray-700">
                    <div className="absolute top-3 right-3 bg-black/70 text-white text-sm px-2 py-1 rounded flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      {movie.rating}
                    </div>
                  </div>
                  
                  {/* Movie Info */}
                  <div className="p-4">
                    <h4 className="text-lg font-bold text-white mb-2 line-clamp-2">{movie.title}</h4>
                    <p className="text-gray-400 text-sm mb-2">{movie.year} • {movie.genre}</p>
                    <p className="text-gray-400 text-sm line-clamp-3">{movie.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
