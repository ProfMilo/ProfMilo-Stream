import axios from "axios";
import VideoPlayerClient from "./VideoPlayerClient";
import TVWatchClient from "./TVWatchClient";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

interface WatchPageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function WatchPage({ params, searchParams }: WatchPageProps) {
    const { id } = await params;
    const resolvedSearchParams = await searchParams;
    const season = resolvedSearchParams.season as string | undefined;
    const episode = resolvedSearchParams.episode as string | undefined;

    const isTV = !!(season && episode);

    // Fetch media details
    let mediaData: any = null;
    let similarData: any = { results: [] };
    let episodeData: any = null;
    let seasonData: any = null;

    try {
        if (isTV) {
            // Fetch TV show details, season details, and similar shows
            const [tvRes, seasonRes, similarRes] = await Promise.all([
                axios.get(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`),
                axios.get(`${BASE_URL}/tv/${id}/season/${season}?api_key=${API_KEY}`),
                axios.get(`${BASE_URL}/tv/${id}/similar?api_key=${API_KEY}`)
            ]);
            mediaData = tvRes.data;
            seasonData = seasonRes.data;
            similarData = similarRes.data;

            // Find current episode
            episodeData = seasonData.episodes?.find((ep: any) => ep.episode_number === parseInt(episode || '1'));
        } else {
            // Fetch movie details
            const [movieRes, similarRes] = await Promise.all([
                axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`),
                axios.get(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`)
            ]);
            mediaData = movieRes.data;
            similarData = similarRes.data;
        }
    } catch (error) {
        console.error('Failed to fetch media data:', error);
    }

    const title = mediaData?.title || mediaData?.name || 'Unknown';
    const year = mediaData?.release_date?.substring(0, 4) || mediaData?.first_air_date?.substring(0, 4) || '';

    // For TV shows, use the new TV Watch layout
    if (isTV && mediaData) {
        return (
            <TVWatchClient
                tvId={id}
                tvData={mediaData}
                seasonData={seasonData}
                episodeData={episodeData}
                currentSeason={parseInt(season || '1')}
                currentEpisode={parseInt(episode || '1')}
                similarShows={similarData.results?.slice(0, 12) || []}
            />
        );
    }

    // Movie watch layout
    const embedUrl = `https://vidsrc.cc/v2/embed/movie/${id}`;

    return (
        <div className="min-h-screen bg-background">
            {/* Video Player Section */}
            <div className="w-full">
                <VideoPlayerClient
                    embedUrl={embedUrl}
                    title={title}
                    year={year}
                    rating={mediaData?.vote_average}
                    runtime={mediaData?.runtime}
                    overview={mediaData?.overview}
                />
            </div>

            {/* Main Content - Movie Layout */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Poster & Info */}
                    <div className="space-y-6">
                        <div className="relative aspect-[2/3] rounded-xl overflow-hidden">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${mediaData?.poster_path}`}
                                alt={title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1">
                                <span className="text-yellow-400">★</span>
                                <span className="text-white text-sm font-medium">{mediaData?.vote_average?.toFixed(1)}</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-xl font-bold text-white">{title}</h2>
                            <p className="text-sm text-gray-400">{year} • {mediaData?.runtime}m</p>
                            <div className="flex flex-wrap gap-2">
                                {mediaData?.genres?.map((genre: any) => (
                                    <span key={genre.id} className="px-2 py-1 text-xs bg-zinc-800 rounded-full text-gray-300">
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                                📖 Synopsis
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed">{mediaData?.overview}</p>
                        </div>
                    </div>

                    {/* Middle Column - Stream Sources & Details */}
                    <div className="space-y-6">
                        {/* Stream Sources Card */}
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    ⚙️ Stream Sources
                                </h3>
                                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Streaming</span>
                            </div>

                            <div className="space-y-3">
                                <span className="text-sm text-gray-400">Provider Source:</span>
                                <div className="grid grid-cols-2 gap-2">
                                    <button className="px-3 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground">
                                        ProfMilo V1
                                    </button>
                                    <button className="px-3 py-2 rounded-lg text-sm font-medium bg-zinc-800 text-gray-400 hover:bg-zinc-700">
                                        ProfMilo V2
                                    </button>
                                    <button className="px-3 py-2 rounded-lg text-sm font-medium bg-zinc-800 text-gray-400 hover:bg-zinc-700">
                                        ProfMilo V3
                                    </button>
                                    <button className="px-3 py-2 rounded-lg text-sm font-medium bg-zinc-800 text-gray-400 hover:bg-zinc-700">
                                        ProfMilo 4K
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-800 text-gray-300 text-sm">
                                    ⬇️ Download Movie
                                </button>
                                <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-800 text-gray-300 text-sm">
                                    ▶️ Direct Player
                                </button>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">Current source:</span>
                                <span className="text-white">ProfMilo V1 <span className="text-xs bg-zinc-700 px-2 py-0.5 rounded ml-1">HLS</span></span>
                            </div>
                        </div>

                        {/* Details Card */}
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                📋 Details
                            </h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-500">Release Date</span>
                                    <p className="text-white">{mediaData?.release_date}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Runtime</span>
                                    <p className="text-white">{mediaData?.runtime}m</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Status</span>
                                    <p className="text-white">{mediaData?.status}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Language</span>
                                    <p className="text-white">{mediaData?.original_language?.toUpperCase()}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Production */}
                    <div className="space-y-6">
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                🏢 Production
                            </h3>

                            {mediaData?.production_companies?.length > 0 && (
                                <div className="space-y-2">
                                    <span className="text-sm text-gray-500">Companies</span>
                                    <div className="flex flex-wrap gap-2">
                                        {mediaData.production_companies.slice(0, 4).map((company: any) => (
                                            <span key={company.id} className="text-xs px-2 py-1 bg-zinc-800 rounded text-gray-300">
                                                {company.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <span className="text-sm text-gray-500">Status</span>
                                <p className="text-sm text-white">{mediaData?.status}</p>
                            </div>

                            <div className="space-y-2">
                                <span className="text-sm text-gray-500">Countries</span>
                                <p className="text-sm text-white">
                                    {mediaData?.production_countries?.map((c: any) => c.name).join(', ')}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <span className="text-sm text-gray-500">Languages</span>
                                <p className="text-sm text-white">
                                    {mediaData?.spoken_languages?.map((l: any) => l.english_name).join(', ')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Movies */}
                {similarData.results?.length > 0 && (
                    <div className="mt-12">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            ❤️ You May Also Like
                        </h3>
                        <div className="flex gap-4 overflow-x-auto pb-4">
                            {similarData.results.slice(0, 10).map((item: any) => (
                                <a
                                    key={item.id}
                                    href={`/movie/${item.id}`}
                                    className="flex-shrink-0 w-32 group"
                                >
                                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-2">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                        />
                                        <div className="absolute top-1 right-1 bg-black/70 backdrop-blur-sm px-1.5 py-0.5 rounded text-xs text-white flex items-center gap-0.5">
                                            <span className="text-yellow-400">★</span>
                                            {item.vote_average?.toFixed(1)}
                                        </div>
                                    </div>
                                    <p className="text-sm text-white truncate">{item.title}</p>
                                    <p className="text-xs text-gray-500">{item.release_date?.substring(0, 4)}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
