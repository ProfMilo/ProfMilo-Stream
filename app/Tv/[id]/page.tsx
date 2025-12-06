import axios from "axios";
import Link from "next/link";
import { Calendar, Clock, Star, Play, Video, Bookmark, Globe, Building2, Youtube, Users, CirclePlay, Share2, Tv } from "lucide-react";
import SeasonAccordionWithEpisodes from "./../../components/ui/SeasonAccordionWithEpisodes";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export default async function TvDetail({ params }: Params) {
  const { id } = await params;
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const [tvRes, videoRes, similarRes, imagesRes, externalRes] = await Promise.all([
    axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&append_to_response=credits`),
    axios.get(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API_KEY}`),
    axios.get(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${API_KEY}`),
    axios.get(`https://api.themoviedb.org/3/tv/${id}/images?api_key=${API_KEY}`),
    axios.get(`https://api.themoviedb.org/3/tv/${id}/external_ids?api_key=${API_KEY}`),
  ]);

  const tv = tvRes.data;
  const videos = videoRes.data.results || [];
  const trailerKey = videos.find(
    (v: any) => v.type === "Trailer" && v.site === "YouTube"
  )?.key;
  const cast = tv.credits?.cast?.slice(0, 36) || [];
  const crew = tv.credits?.crew?.slice(0, 5) || [];
  const similar = similarRes.data.results?.slice(0, 20) || [];
  const logo = imagesRes.data.logos?.find((l: any) => l.iso_639_1 === "en")?.file_path
    || imagesRes.data.logos?.[0]?.file_path;
  const externalIds = externalRes.data;

  const firstAirYear = tv.first_air_date ? new Date(tv.first_air_date).getFullYear() : '';

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Backdrop */}
      <div className="relative -mt-16">
        <div className="relative h-[40dvh] overflow-hidden lg:h-[80dvh]">
          <div className="absolute inset-0">
            <img
              alt={tv.name}
              className="object-cover w-full h-full"
              src={`https://image.tmdb.org/t/p/original${tv.backdrop_path}`}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/30" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative -mt-52 lg:-mt-48">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:max-w-[1500px]">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">

            {/* Left Sidebar - Poster & Actions */}
            <div className="flex-shrink-0 lg:w-80">
              <div className="sticky top-8">
                {/* Poster */}
                <div className="relative mx-auto flex aspect-[2/3] w-[90%] items-center justify-center overflow-hidden rounded-lg border bg-muted shadow sm:w-full">
                  <img
                    alt={tv.name}
                    className="object-cover w-full h-full"
                    src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                  />
                </div>

                {/* Mobile Logo */}
                <div className="mt-6 sm:hidden">
                  {logo && (
                    <div className="mb-4 flex justify-center">
                      <img
                        alt={tv.name}
                        className="object-contain max-h-[120px]"
                        src={`https://image.tmdb.org/t/p/w500${logo}`}
                      />
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  {trailerKey && (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8 w-full"
                      href={`https://www.youtube.com/watch?v=${trailerKey}`}
                    >
                      <Video className="mr-2 h-5 w-5" />
                      Watch Trailer
                    </a>
                  )}
                  <Link
                    className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8 w-full"
                    href={`/Watch/${id}?season=1&episode=1`}
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Watch Series
                  </Link>
                  <div className="flex gap-2">
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 flex-1">
                      <Bookmark className="mr-2 h-4 w-4" />
                      Watch Later
                    </button>
                    <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold cursor-pointer hover:bg-muted">
                      <Share2 className="mr-1.5 h-3.5 w-3.5" />
                      <span>Share</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="flex-1 space-y-8">
              {/* TV Info */}
              <div className="space-y-4">
                {/* Desktop Logo / Title */}
                <div className="hidden sm:block">
                  {logo ? (
                    <div className="mb-4">
                      <img
                        alt={tv.name}
                        className="object-contain max-h-[120px]"
                        src={`https://image.tmdb.org/t/p/w500${logo}`}
                      />
                    </div>
                  ) : (
                    <h1 className="text-4xl font-bold mb-4">{tv.name}</h1>
                  )}
                  {tv.tagline && (
                    <p className="text-lg italic text-muted-foreground lg:text-xl">
                      "{tv.tagline}"
                    </p>
                  )}
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{firstAirYear}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tv className="h-4 w-4" />
                    <span>{tv.number_of_seasons} Season{tv.number_of_seasons > 1 ? "s" : ""}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{tv.number_of_episodes} Episode{tv.number_of_episodes > 1 ? "s" : ""}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{tv.vote_average.toFixed(1)}</span>
                    <span className="text-xs">({tv.vote_count} votes)</span>
                  </div>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2">
                  {tv.genres?.map((genre: any) => (
                    <div
                      key={genre.id}
                      className="inline-flex items-center rounded-md border px-2.5 py-0.5 font-semibold transition-colors border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-sm"
                    >
                      {genre.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Overview Card */}
              <div className="rounded-xl border bg-card text-card-foreground shadow">
                <div className="p-6">
                  <h2 className="mb-4 text-xl font-semibold">Overview</h2>
                  <p className="leading-7 text-muted-foreground">{tv.overview}</p>
                </div>
              </div>

              {/* Links & Production */}
              <div className="rounded-xl border bg-card text-card-foreground shadow overflow-hidden">
                <div className="p-0">
                  <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">
                    {/* Links Section */}
                    <div className="space-y-4">
                      <h2 className="flex items-center gap-2 text-lg font-semibold">
                        <Globe className="h-5 w-5" />
                        Links & Resources
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {tv.homepage && (
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-3 h-8"
                            href={tv.homepage}
                          >
                            <Globe className="mr-2 h-3 w-3" />
                            Website
                          </a>
                        )}
                        {externalIds.imdb_id && (
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-3 h-8"
                            href={`https://www.imdb.com/title/${externalIds.imdb_id}`}
                          >
                            <span className="mr-2 text-xs font-bold">IMDb</span>
                            View
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Production Companies */}
                    <div className="space-y-4">
                      <h2 className="flex items-center gap-2 text-lg font-semibold">
                        <Building2 className="h-5 w-5" />
                        Production Companies
                      </h2>
                      <div className="grid grid-cols-5 gap-3">
                        {tv.production_companies?.slice(0, 5).map((company: any) => (
                          <div
                            key={company.id}
                            className="group relative aspect-square overflow-hidden rounded-lg border bg-secondary p-2 transition-all hover:bg-muted/50 hover:shadow-md dark:bg-white"
                          >
                            {company.logo_path ? (
                              <img
                                alt={company.name}
                                className="object-contain p-1 w-full h-full transition-transform group-hover:scale-105"
                                src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center">
                                <Building2 className="h-4 w-4 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Videos & Trailers Section */}
      {videos.length > 0 && (
        <div className="p-4 md:px-6">
          <div className="mb-12">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="flex flex-row items-center gap-3 text-2xl font-bold sm:mt-20 md:text-3xl">
                <div className="rounded-lg border border-white/20 bg-white/10 p-2 backdrop-blur-md transition-all duration-300 hover:bg-white/20">
                  <Youtube className="h-7 w-7 text-white" />
                </div>
                Videos & Trailers
              </h1>
              <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 font-semibold border-transparent bg-secondary text-secondary-foreground text-sm">
                {videos.length} videos
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {videos.slice(0, 10).map((video: any) => (
                <div key={video.id} className="min-w-[300px] md:min-w-[400px]">
                  <div className="group relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
                    <iframe
                      className="h-full w-full"
                      src={`https://www.youtube.com/embed/${video.key}`}
                      title={video.name}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Cast & Crew Section */}
      {cast.length > 0 && (
        <div className="p-4 md:px-6 mb-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="flex flex-row items-center gap-3 text-2xl font-bold sm:mt-20 md:text-3xl">
              <div className="rounded-lg border border-white/20 bg-white/10 p-2 backdrop-blur-md transition-all duration-300 hover:bg-white/20">
                <Users className="h-7 w-7 text-white" />
              </div>
              Cast & Crew
            </h1>
            <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 font-semibold border-transparent bg-secondary text-secondary-foreground text-sm">
              {cast.length + crew.length} members
            </div>
          </div>
          <div className="flex -ml-4 gap-4 pl-6 pr-6 overflow-x-auto pb-4">
            {cast.map((person: any) => (
              <div
                key={person.id}
                className="shrink-0 grow-0 pl-0 min-w-0 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[12.5%]"
              >
                <div className="group relative mx-auto flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-xl border bg-muted shadow-md transition-all duration-300 hover:shadow-lg">
                  <div className="absolute left-2 top-2 z-20">
                    <div className="inline-flex items-center border font-semibold border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80 rounded-full px-2 py-1 text-xs">
                      Acting
                    </div>
                  </div>
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 p-3 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                    <h3 className="mb-2 line-clamp-2 text-center text-sm font-semibold text-white">
                      {person.name}
                    </h3>
                    <p className="line-clamp-2 text-center text-xs text-gray-300">
                      {person.character || 'Unknown Role'}
                    </p>
                  </div>
                  {person.profile_path ? (
                    <img
                      alt={person.name}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-muted">
                      <Users className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Seasons & Episodes Section */}
      {tv.seasons?.length > 0 && (
        <div className="p-4 md:px-6 mb-8">
          <h1 className="mb-6 flex flex-row items-center gap-3 text-2xl font-bold sm:mt-20 md:text-3xl">
            <div className="rounded-lg border border-white/20 bg-white/10 p-2 backdrop-blur-md transition-all duration-300 hover:bg-white/20">
              <Tv className="h-7 w-7 text-white" />
            </div>
            Seasons & Episodes
          </h1>
          <SeasonAccordionWithEpisodes tvId={id} seasons={tv.seasons} />
        </div>
      )}

      {/* Similar TV Shows Section */}
      {similar.length > 0 && (
        <div className="p-4 md:px-6 mb-8">
          <h1 className="mb-6 flex flex-row items-center gap-2 text-2xl font-bold sm:mt-20 md:text-3xl">
            <CirclePlay className="h-8 w-8" />
            Similar TV Shows
          </h1>
          <div className="flex -ml-4 gap-4 pl-6 pr-6 overflow-x-auto pb-4">
            {similar.map((item: any) => (
              <Link
                key={item.id}
                href={`/tv/${item.id}`}
                className="shrink-0 grow-0 pl-0 min-w-0 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[12.5%] group block transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02]"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-200/50 transition-all duration-500 hover:shadow-2xl hover:ring-blue-500/20 dark:bg-gray-800 dark:ring-gray-700/50">
                  <div className="relative aspect-[2/3] w-full">
                    <div className="relative mx-auto flex aspect-[2/3] items-center justify-center overflow-hidden rounded-lg border bg-muted h-full w-full">
                      {item.poster_path ? (
                        <img
                          alt={item.name}
                          className="object-cover w-full h-full"
                          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full bg-muted">
                          <Tv className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100" />

                    {/* Rating Badge */}
                    <div className="absolute right-3 top-3 z-10 transform transition-transform duration-300 group-hover:scale-110">
                      <div className="flex items-center gap-1.5 border bg-white/20 px-3 py-1.5 text-xs font-bold text-white shadow-lg backdrop-blur-md rounded-md">
                        <Star className="h-3 w-3 fill-current text-yellow-400" />
                        {item.vote_average?.toFixed(1)}
                      </div>
                    </div>

                    {/* Year Badge */}
                    <div className="absolute left-3 top-3 z-10 transform transition-transform duration-300 group-hover:scale-110">
                      <div className="flex items-center gap-1.5 border-0 bg-black/80 px-3 py-1.5 text-xs font-medium text-white shadow-lg backdrop-blur-md rounded-md">
                        <Calendar className="h-3 w-3" />
                        {item.first_air_date ? new Date(item.first_air_date).getFullYear() : 'N/A'}
                      </div>
                    </div>

                    {/* Hover Content */}
                    <div className="absolute bottom-0 left-0 right-0 translate-y-full transform p-4 transition-transform duration-500 group-hover:translate-y-0">
                      <div className="space-y-2">
                        <h3 className="line-clamp-2 text-sm font-bold leading-tight text-white">
                          {item.name}
                        </h3>
                        <p className="line-clamp-3 text-xs leading-relaxed text-gray-200">
                          {item.overview}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
