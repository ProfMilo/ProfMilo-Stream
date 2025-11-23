import axios from "axios";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FastForward } from "lucide-react";
import VideoPlayerClient from "./VideoPlayerClient";

interface Props {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    season?: string;
    episode?: string;
  }>;
}

export default async function WatchMovie(props: Props) {
  const params = await props.params;
  const { id } = params;
  const searchParams = await props.searchParams;
  const season = searchParams?.season;
  const episode = searchParams?.episode;
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const isTV = !!season && !!episode;

  let title = "";
  let overview = "";
  let embedUrl = "";
  let backUrl = "";
  let year: string | undefined;
  let rating: number | undefined;

  try {
    if (isTV) {
      embedUrl = `https://vidsrc.icu/embed/tv/${id}/${season}/${episode}`;
      const tvRes = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`
      );
      const tv = tvRes.data;
      title = `${tv.name} - Season ${season}, Episode ${episode}`;
      overview = tv.overview;
      backUrl = `/Tv/${id}`;
      year = tv.first_air_date?.slice(0, 4);
      rating = tv.vote_average;
    } else {
      embedUrl = `https://vidsrc.icu/embed/movie/${id}`;
      const movieRes = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
      );
      const movie = movieRes.data;
      title = movie.title;
      overview = movie.overview;
      backUrl = `/Movie/${id}`;
      year = movie.release_date?.slice(0, 4);
      rating = movie.vote_average;
    }
  } catch (error) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-zinc-950/80 backdrop-blur border-b border-zinc-800 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href={backUrl} className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition">
            <ArrowLeft size={16} />
            Back to Detail
          </Link>
          {isTV && (
            <button
              onClick={() => alert("⏩ Intro skipped!")}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1.5 rounded-full shadow transition"
            >
              <FastForward size={16} />
              Skip Intro
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-6">
        {/* Video Player with overlay as per template */}
        <VideoPlayerClient embedUrl={embedUrl} title={title} year={year} rating={rating} />

        {/* Controls (fallbacks) */}
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>💬 Subtitle: Auto / English</span>
          <span>🎚️ Quality: Auto</span>
        </div>

        {/* Overview */}
        <div className="mt-4 text-gray-300 text-sm md:text-base leading-relaxed">
          {overview || "No description available for this content."}
        </div>
      </div>
    </div>
  );
}
