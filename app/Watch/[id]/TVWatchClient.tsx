"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Play, Star, Clock, Settings, Download, ExternalLink, Monitor, Tv, Calendar, Film, Building, Heart, Check, Search, Grid, List, FileText } from 'lucide-react';

// Embed sources configuration
const embedSources: Record<string, (id: string, season: number, episode: number) => string> = {
    v1: (id, season, episode) => `https://vidsrc.cc/v2/embed/tv/${id}/${season}/${episode}`,
    v2: (id, season, episode) => `https://vidsrc.pro/embed/tv/${id}/${season}/${episode}`,
    v3: (id, season, episode) => `https://vidsrc.icu/embed/tv/${id}/${season}/${episode}`,
    '4k': (id, season, episode) => `https://autoembed.cc/tv/tmdb/${id}-${season}-${episode}`,
};

const streamSources = [
    { id: 'v1', label: 'ProfMilo-V1', quality: 'auto' },
    { id: 'v2', label: 'ProfMilo-V2', quality: 'auto' },
    { id: 'v3', label: 'ProfMilo-V3', quality: 'auto' },
    { id: '4k', label: 'ProfMilo-4K', quality: '4K' },
];

interface TVWatchClientProps {
    tvId: string;
    tvData: any;
    seasonData: any;
    episodeData: any;
    currentSeason: number;
    currentEpisode: number;
    similarShows: any[];
}

export default function TVWatchClient({
    tvId,
    tvData,
    seasonData,
    episodeData,
    currentSeason,
    currentEpisode,
    similarShows
}: TVWatchClientProps) {
    const [activeSource, setActiveSource] = useState('v1');
    const [selectedSeason, setSelectedSeason] = useState(currentSeason);
    const [selectedEpisode, setSelectedEpisode] = useState(currentEpisode);

    const embedUrl = embedSources[activeSource](tvId, selectedSeason, selectedEpisode);
    const currentSourceInfo = streamSources.find(s => s.id === activeSource);

    const title = tvData?.name || 'Unknown';
    const year = tvData?.first_air_date?.substring(0, 4) || '';
    const episodes = seasonData?.episodes || [];
    const currentSeasonData = tvData?.seasons?.find((s: any) => s.season_number === selectedSeason);

    return (
        <div className="min-h-screen bg-zinc-950">
            {/* Video Player - Full Width */}
            <div className="w-full bg-black border border-zinc-800 mx-auto" style={{ maxWidth: '1400px' }}>
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                        src={embedUrl}
                        className="absolute top-0 left-0 w-full h-full"
                        frameBorder={0}
                        allowFullScreen
                        allow="autoplay; fullscreen; encrypted-media"
                    />
                </div>
            </div>

            {/* Stream Ready Bar */}
            <div className="bg-zinc-950 py-3 px-6">
                <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <span className="text-sm text-gray-400">Stream ready</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm bg-primary text-primary-foreground px-3 py-1 rounded">S{selectedSeason}E{selectedEpisode}</span>
                        <span className="text-sm text-gray-400">{currentSourceInfo?.label}</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-[1400px] mx-auto px-6 py-8">
                <div className="grid grid-cols-12 gap-8">

                    {/* Left Column - Poster Card */}
                    <div className="col-span-12 lg:col-span-3">
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
                            {/* Poster */}
                            <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-5">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${tvData?.poster_path}`}
                                    alt={title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                    <span className="text-white text-sm font-bold">{tvData?.vote_average?.toFixed(1)}</span>
                                </div>
                            </div>

                            {/* Title & Info */}
                            <h1 className="text-xl font-bold text-white mb-2">{title}</h1>
                            <p className="text-sm text-gray-400 mb-4">{tvData?.first_air_date} • Season {selectedSeason}</p>

                            {/* Genres */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {tvData?.genres?.slice(0, 3).map((genre: any) => (
                                    <span key={genre.id} className="px-3 py-1.5 text-sm bg-zinc-800 rounded-full text-gray-300 border border-zinc-700">
                                        {genre.name}
                                    </span>
                                ))}
                            </div>

                            {/* Tagline */}
                            {tvData?.tagline && (
                                <p className="text-base text-gray-400 italic mb-6 border-t border-zinc-800 pt-5">
                                    "{tvData.tagline}"
                                </p>
                            )}

                            {/* Synopsis */}
                            <div className="border-t border-zinc-800 pt-5">
                                <h3 className="text-base font-semibold text-white flex items-center gap-2 mb-3">
                                    <Film className="h-5 w-5" /> Synopsis
                                </h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{tvData?.overview}</p>
                            </div>
                        </div>
                    </div>

                    {/* Middle Column - Stream Sources, Download, Details */}
                    <div className="col-span-12 lg:col-span-5 space-y-6">
                        {/* Stream Sources */}
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Settings className="h-5 w-5" /> Stream Sources
                                </h3>
                                <span className="text-sm bg-green-500/20 text-green-400 px-3 py-1 rounded-full">Streaming</span>
                            </div>

                            <div className="space-y-5">
                                <div className="text-sm text-gray-400 mb-2">Private Sources:</div>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                    {streamSources.map((source) => (
                                        <button
                                            key={source.id}
                                            onClick={() => setActiveSource(source.id)}
                                            className={`px-4 py-3 rounded-lg text-sm font-medium transition-all border ${activeSource === source.id
                                                    ? 'bg-zinc-800 text-white border-zinc-600'
                                                    : 'bg-zinc-900 text-gray-400 border-zinc-800 hover:text-white hover:bg-zinc-800'
                                                }`}
                                        >
                                            {source.label}
                                        </button>
                                    ))}
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-gray-300 text-sm hover:bg-zinc-700 transition-all">
                                        <Download className="h-4 w-4" /> Download Episode
                                    </button>
                                    <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-gray-300 text-sm hover:bg-zinc-700 transition-all">
                                        <ExternalLink className="h-4 w-4" /> Direct Player
                                    </button>
                                </div>

                                <div className="flex items-center justify-between text-sm pt-4 border-t border-zinc-800">
                                    <span className="text-gray-500">Current source:</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-white">{currentSourceInfo?.label}</span>
                                        <span className="bg-zinc-800 px-2 py-1 rounded text-gray-400">{currentSourceInfo?.quality}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Download Options */}
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="text-base font-semibold text-white flex items-center gap-2">
                                    <Download className="h-5 w-5" /> Download Options
                                </h3>
                                <span className="text-sm bg-primary text-primary-foreground px-3 py-1 rounded">S{selectedSeason}E{selectedEpisode}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-gray-300 text-sm hover:bg-zinc-700 transition-all">
                                    <Download className="h-4 w-4" /> Download {title}
                                </button>
                                <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-gray-300 text-sm hover:bg-zinc-700 transition-all">
                                    <ExternalLink className="h-4 w-4" /> Find Subtitles
                                </button>
                            </div>
                            <p className="text-sm text-gray-500 mt-4 text-center">These links are provided by external services. Use at your own discretion.</p>
                        </div>

                        {/* Torrent Sources */}
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                            <h3 className="text-base font-semibold text-white flex items-center gap-2 mb-5">
                                <FileText className="h-5 w-5" /> Torrent Sources
                            </h3>
                            <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                                <FileText className="h-10 w-10 mb-3 opacity-50" />
                                <p className="text-sm">No media sources available</p>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-5">
                                <Tv className="h-5 w-5" /> Details
                            </h3>
                            <div className="grid grid-cols-2 gap-y-4 text-sm">
                                <div>
                                    <span className="text-gray-500">First Aired</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-white">{tvData?.first_air_date}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500">Seasons</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-white">{tvData?.number_of_seasons}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500">Episodes</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-white">{tvData?.number_of_episodes}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500">Language</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-white">{tvData?.original_language?.toUpperCase() || 'English'}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500">Status</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-white">{tvData?.status}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500">Type</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-white">{tvData?.type || 'Scripted'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Select Episode, Production */}
                    <div className="col-span-12 lg:col-span-4 space-y-6">
                        {/* Select Episode */}
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-5">
                                <Film className="h-5 w-5" /> Select Episode
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm text-gray-400 block mb-2">Season</label>
                                    <select
                                        value={selectedSeason}
                                        onChange={(e) => {
                                            window.location.href = `/Watch/${tvId}?season=${e.target.value}&episode=1`;
                                        }}
                                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-zinc-500"
                                    >
                                        {tvData?.seasons?.filter((s: any) => s.season_number > 0).map((season: any) => (
                                            <option key={season.id} value={season.season_number}>
                                                Season {season.season_number}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-sm text-gray-400 block mb-2">Episode</label>
                                    <select
                                        value={selectedEpisode}
                                        onChange={(e) => {
                                            window.location.href = `/Watch/${tvId}?season=${selectedSeason}&episode=${e.target.value}`;
                                        }}
                                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-zinc-500"
                                    >
                                        {episodes.map((ep: any) => (
                                            <option key={ep.id} value={ep.episode_number}>
                                                Episode {ep.episode_number}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-gray-300 text-sm hover:bg-zinc-700 transition-all">
                                    <Download className="h-4 w-4" /> Download S{selectedSeason}E{selectedEpisode}
                                </button>

                                <div className="pt-4 border-t border-zinc-800 space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Total Seasons:</span>
                                        <span className="text-white">{tvData?.number_of_seasons}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Episodes in this season:</span>
                                        <span className="text-white">{currentSeasonData?.episode_count || episodes.length}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Production */}
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-5">
                                <Building className="h-5 w-5" /> Production
                            </h3>

                            <div className="space-y-5">
                                {tvData?.networks?.length > 0 && (
                                    <div>
                                        <span className="text-sm text-gray-500 block mb-2">Networks</span>
                                        <div className="flex flex-wrap gap-2">
                                            {tvData.networks.map((n: any) => (
                                                <span key={n.id} className="px-3 py-1.5 bg-zinc-800 rounded-lg text-sm text-gray-300 border border-zinc-700">{n.name}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {tvData?.production_companies?.length > 0 && (
                                    <div>
                                        <span className="text-sm text-gray-500 block mb-2">Companies</span>
                                        <div className="flex flex-wrap gap-2">
                                            {tvData.production_companies.slice(0, 3).map((c: any) => (
                                                <span key={c.id} className="px-3 py-1.5 bg-zinc-800 rounded-lg text-sm text-gray-300 border border-zinc-700">{c.name}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <span className="text-sm text-gray-500 block mb-2">Countries</span>
                                    <div className="flex flex-wrap gap-2">
                                        {tvData?.production_countries?.length > 0 ? (
                                            tvData.production_countries.map((c: any) => (
                                                <span key={c.iso_3166_1} className="px-3 py-1.5 bg-zinc-800 rounded-lg text-sm text-gray-300 border border-zinc-700">{c.name}</span>
                                            ))
                                        ) : (
                                            <span className="px-3 py-1.5 bg-zinc-800 rounded-lg text-sm text-gray-300 border border-zinc-700">{tvData?.origin_country?.join(', ') || 'N/A'}</span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <span className="text-sm text-gray-500 block mb-2">Languages</span>
                                    <div className="flex flex-wrap gap-2">
                                        {tvData?.spoken_languages?.map((l: any) => (
                                            <span key={l.iso_639_1} className="px-3 py-1.5 bg-zinc-800 rounded-lg text-sm text-gray-300 border border-zinc-700">{l.english_name}</span>
                                        )) || <span className="text-gray-400">English</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Episode Info Card */}
                {episodeData && (
                    <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                        <div className="flex gap-6">
                            {episodeData.still_path && (
                                <div className="flex-shrink-0 w-48 aspect-video rounded-lg overflow-hidden">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w300${episodeData.still_path}`}
                                        alt={episodeData.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="text-lg font-bold text-white">{episodeData.name}</h4>
                                    <span className="text-sm bg-primary text-primary-foreground px-3 py-1 rounded">S{selectedSeason}E{selectedEpisode}</span>
                                </div>
                                <p className="text-sm text-gray-400 mb-3">{episodeData.air_date}</p>
                                <p className="text-sm text-gray-400 leading-relaxed">{episodeData.overview}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Episodes Section */}
                {episodes.length > 0 && (
                    <div className="mt-8">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <Tv className="h-5 w-5" /> Episodes
                                <span className="text-sm text-gray-500 font-normal">({episodes.length})</span>
                            </h3>
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                    <input
                                        type="text"
                                        placeholder="Search episodes..."
                                        className="bg-zinc-900 border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-zinc-500 w-48"
                                    />
                                </div>
                                <div className="flex gap-1">
                                    <button className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 text-gray-400 hover:text-white">
                                        <Grid className="h-4 w-4" />
                                    </button>
                                    <button className="p-2 rounded-lg bg-zinc-900 border border-zinc-700 text-gray-400 hover:text-white">
                                        <List className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-4">
                            {episodes.map((ep: any) => (
                                <Link
                                    key={ep.id}
                                    href={`/Watch/${tvId}?season=${selectedSeason}&episode=${ep.episode_number}`}
                                    className={`flex-shrink-0 w-56 group ${ep.episode_number === selectedEpisode ? 'ring-2 ring-primary rounded-xl' : ''}`}
                                >
                                    <div className="relative aspect-video rounded-xl overflow-hidden mb-2 bg-zinc-900">
                                        {ep.still_path ? (
                                            <img
                                                src={`https://image.tmdb.org/t/p/w300${ep.still_path}`}
                                                alt={ep.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                                                <Tv className="h-8 w-8 text-zinc-700" />
                                            </div>
                                        )}
                                        <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-1 rounded text-sm text-white font-medium">
                                            E{ep.episode_number}
                                        </div>
                                        {ep.episode_number === selectedEpisode && (
                                            <div className="absolute inset-0 bg-primary/30 flex items-center justify-center">
                                                <div className="bg-black/60 rounded-full p-2">
                                                    <Check className="h-5 w-5 text-white" />
                                                </div>
                                                <span className="absolute bottom-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">Playing</span>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-300 truncate">{ep.name}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Similar Shows */}
                {similarShows.length > 0 && (
                    <div className="mt-10">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-5">
                            <Heart className="h-5 w-5" /> You May Also Like
                        </h3>
                        <div className="flex gap-4 overflow-x-auto pb-4">
                            {similarShows.map((item: any) => (
                                <Link
                                    key={item.id}
                                    href={`/tv/${item.id}`}
                                    className="flex-shrink-0 w-36 group"
                                >
                                    <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-2">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                                            alt={item.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                        />
                                        <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white flex items-center gap-1">
                                            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                                            {item.vote_average?.toFixed(1)}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-300 truncate">{item.name}</p>
                                    <p className="text-xs text-gray-500">{item.first_air_date?.substring(0, 4)}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
