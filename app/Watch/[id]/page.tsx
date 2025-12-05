import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import VideoPlayerClient from "./VideoPlayerClient";
import StreamSources from "./StreamSources";
import MovieDetails from "./MovieDetails";
import SimilarMovies from "./SimilarMovies";

interface Props {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    season?: string;
    episode?: string;
  }>;
}

interface Genre {
  id: number;
  name: string;
}

interface MovieData {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path?: string;
  backdrop_path?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  runtime?: number;
  episode_run_time?: number[];
  genres: Genre[];
  tagline?: string;
  status?: string;
  budget?: number;
  revenue?: number;
  original_language?: string;
  production_companies?: Array<{ id: number; name: string; logo_path?: string }>;
  production_countries?: Array<{ iso_3166_1: string; name: string }>;
  spoken_languages?: Array<{ english_name: string; iso_639_1: string }>;
}

interface SimilarItem {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  release_date?: string;
  first_air_date?: string;
}

const languageMap: Record<string, string> = {
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  it: 'Italian',
  pt: 'Portuguese',
  ja: 'Japanese',
  ko: 'Korean',
  zh: 'Chinese',
  ru: 'Russian',
  ar: 'Arabic',
  hi: 'Hindi',
};

export default async function WatchMovie(props: Props) {
  const params = await props.params;
  const { id } = params;
  const searchParams = await props.searchParams;
  const season = searchParams?.season;
  const episode = searchParams?.episode;
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const isTV = !!season && !!episode;
  const mediaType = isTV ? 'tv' : 'movie';

  let data: MovieData | null = null;
  let similarItems: SimilarItem[] = [];
  let embedUrl = "";
  let backUrl = "";

  try {
    if (isTV) {
      embedUrl = `https://vidsrc.icu/embed/tv/${id}/${season}/${episode}`;
      backUrl = `/tv/${id}`;

      const [tvRes, similarRes] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`),
        axios.get(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${API_KEY}`)
      ]);

      data = tvRes.data;
      similarItems = similarRes.data.results || [];
    } else {
      embedUrl = `https://vidsrc.icu/embed/movie/${id}`;
      backUrl = `/movie/${id}`;

      const [movieRes, similarRes] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`),
        axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`)
      ]);

      data = movieRes.data;
      similarItems = similarRes.data.results || [];
    }
  } catch (error) {
    notFound();
  }

  if (!data) {
    notFound();
  }

  const title = isTV ? `${data.name} - S${season} E${episode}` : data.title || '';
  const displayTitle = data.title || data.name || '';
  const year = (data.release_date || data.first_air_date)?.slice(0, 4);
  const runtime = data.runtime || (data.episode_run_time?.[0] || 0);
  const language = languageMap[data.original_language || 'en'] || data.original_language;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Video Player */}
      <div className="w-full">
        <VideoPlayerClient
          embedUrl={embedUrl}
          title={title}
          year={year}
          rating={data.vote_average}
          runtime={runtime}
          overview={data.overview}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Poster & Info */}
          <div className="lg:col-span-3 space-y-6">
            {/* Poster */}
            <div className="relative aspect-[2/3] w-full max-w-[280px] mx-auto lg:mx-0 overflow-hidden rounded-xl shadow-xl">
              {data.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                  alt={displayTitle}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-muted/30 flex items-center justify-center">
                  <span className="text-muted-foreground">No Poster</span>
                </div>
              )}
              {/* Rating Badge */}
              <div className="absolute bottom-3 left-3">
                <div className="flex items-center gap-1 px-2 py-1 rounded bg-black/80 backdrop-blur-sm">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-white">
                    {data.vote_average.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Title & Meta */}
            <div className="text-center lg:text-left">
              <h1 className="text-xl font-bold">{displayTitle}</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {year} • {runtime > 0 && `${Math.floor(runtime / 60)}h ${runtime % 60}m`}
              </p>
            </div>

            {/* Genres */}
            {data.genres && data.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {data.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 rounded-full bg-muted/50 text-xs font-medium"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* Tagline */}
            {data.tagline && (
              <p className="text-sm italic text-muted-foreground text-center lg:text-left">
                "{data.tagline}"
              </p>
            )}

            {/* Synopsis */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Synopsis</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {data.overview || "No synopsis available."}
              </p>
            </div>
          </div>

          {/* Right Column - Stream Sources & Details */}
          <div className="lg:col-span-9 space-y-8">
            {/* Stream Sources */}
            <div className="p-6 rounded-xl border border-white/5 bg-card/50">
              <StreamSources
                movieId={id}
                movieTitle={displayTitle}
                isTV={isTV}
                season={season}
                episode={episode}
              />
            </div>

            {/* Details & Production */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl border border-white/5 bg-card/50">
                <MovieDetails
                  releaseDate={data.release_date || data.first_air_date}
                  runtime={runtime}
                  language={language}
                  status={data.status}
                  budget={data.budget}
                  revenue={data.revenue}
                />
              </div>
              <div className="p-6 rounded-xl border border-white/5 bg-card/50">
                <MovieDetails
                  productionCompanies={data.production_companies}
                  productionCountries={data.production_countries}
                  spokenLanguages={data.spoken_languages}
                />
              </div>
            </div>

            {/* Similar Movies */}
            {similarItems.length > 0 && (
              <div className="p-6 rounded-xl border border-white/5 bg-card/50">
                <SimilarMovies items={similarItems} mediaType={mediaType} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
