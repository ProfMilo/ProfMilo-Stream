import HeroSection from "./components/feature/HeroSection";
import TopMoviesSection from "./components/feature/TopMoviesSection";
import TopTvShowsSection from "./components/feature/TopTvShowsSection";
import StreamingProvidersSection from "./components/feature/StreamingProvidersSection";
import PlatformLogosSection from "./components/feature/PlatformLogosSection";
import Footer from "./components/layout/Footer";

// Movie data that matches the image exactly
const featuredMovie = {
  id: 10191,
  title: "How to Train Your Dragon",
  original_title: "How to Train Your Dragon",
  overview: "On the rugged Isle of Berk, where Vikings and dragons have been bitter enemies for generations, a young Viking teenager named Hiccup Horrendous Haddock III, son of Stoick the Vast, is on the cusp of manhood and desperate to prove his worth so he can fight alongside his fellow Vikings against the dragons. However, his world is turned upside down when he encounters a dragon that challenges him and his fellow Vikings to see the world from an entirely different point of view.",
  poster_path: "/ygGmAO60t8GyqUq9xMEaFdYk9Si.jpg",
  backdrop_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
  vote_average: 8.0,
  release_date: "2025-06-06",
  genre_ids: [16, 12, 10751],
  media_type: 'movie' as const
};

// Featured movies for carousel
const featuredMovies = [
  {
    id: 10191,
    title: "How to Train Your Dragon",
    original_title: "How to Train Your Dragon",
    overview: "On the rugged Isle of Berk, where Vikings and dragons have been bitter enemies for generations, a young Viking teenager named Hiccup Horrendous Haddock III, son of Stoick the Vast, is on the cusp of manhood and desperate to prove his worth so he can fight alongside his fellow Vikings against the dragons. However, his world is turned upside down when he encounters a dragon that challenges him and his fellow Vikings to see the world from an entirely different point of view.",
    poster_path: "/ygGmAO60t8GyqUq9xMEaFdYk9Si.jpg",
    backdrop_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    vote_average: 8.0,
    release_date: "2025-06-06",
    genre_ids: [16, 12, 10751],
    media_type: 'movie' as const
  },
  {
    id: 1061474,
    title: "Superman",
    original_title: "Superman",
    overview: "Superman, a journalist in Metropolis, embarks on a journey to reconcile his Kryptonian heritage with his human upbringing as Clark Kent.",
    poster_path: "/ombsmhYUqR4qqOLOxAyr5V8hbyv.jpg",
    backdrop_path: "/ombsmhYUqR4qqOLOxAyr5V8hbyv.jpg",
    vote_average: 7.6,
    release_date: "2025-07-09",
    genre_ids: [878, 12, 28],
    media_type: 'movie' as const
  },
  {
    id: 1234821,
    title: "Jurassic World Rebirth",
    original_title: "Jurassic World Rebirth",
    overview: "The next chapter in the Jurassic World saga.",
    poster_path: "/1RICxzeoNCAO5NpcRMIgg1XT6fm.jpg",
    backdrop_path: "/1RICxzeoNCAO5NpcRMIgg1XT6fm.jpg",
    vote_average: 6.4,
    release_date: "2025-06-13",
    genre_ids: [28, 12, 878],
    media_type: 'movie' as const
  },
  {
    id: 1078605,
    title: "Weapons",
    original_title: "Weapons",
    overview: "A mysterious story about a missing teenager.",
    poster_path: "/cpf7vsRZ0MYRQcnLWteD5jK9ymT.jpg",
    backdrop_path: "/cpf7vsRZ0MYRQcnLWteD5jK9ymT.jpg",
    vote_average: 7.7,
    release_date: "2025-08-15",
    genre_ids: [28, 53, 18],
    media_type: 'movie' as const
  },
  {
    id: 648878,
    title: "Eddington",
    original_title: "Eddington",
    overview: "A crime thriller set in a small town.",
    poster_path: "/3owF0w0pSqd3TALVWrEBuRA8N6E.jpg",
    backdrop_path: "/3owF0w0pSqd3TALVWrEBuRA8N6E.jpg",
    vote_average: 6.7,
    release_date: "2025-09-20",
    genre_ids: [80, 53, 18],
    media_type: 'movie' as const
  },
  {
    id: 936108,
    title: "Smurfs",
    original_title: "Smurfs",
    overview: "The beloved blue creatures return in a new adventure.",
    poster_path: "/8o6lkhL32xQJeB52IIG1us5BVey.jpg",
    backdrop_path: "/8o6lkhL32xQJeB52IIG1us5BVey.jpg",
    vote_average: 5.8,
    release_date: "2025-10-25",
    genre_ids: [16, 12, 35],
    media_type: 'movie' as const
  }
];

const topMovies = [
  {
    id: 1061474,
    title: "Superman",
    poster_path: "/ombsmhYUqR4qqOLOxAyr5V8hbyv.jpg",
    vote_average: 7.687,
    media_type: 'movie' as const
  },
  {
    id: 1234821,
    title: "Jurassic World Rebirth",
    poster_path: "/1RICxzeoNCAO5NpcRMIgg1XT6fm.jpg",
    vote_average: 6.386,
    media_type: 'movie' as const
  },
  {
    id: 1078605,
    title: "Weapons",
    poster_path: "/cpf7vsRZ0MYRQcnLWteD5jK9ymT.jpg",
    vote_average: 7.681,
    media_type: 'movie' as const
  },
  {
    id: 648878,
    title: "Eddington",
    poster_path: "/3owF0w0pSqd3TALVWrEBuRA8N6E.jpg",
    vote_average: 6.738,
    media_type: 'movie' as const
  },
  {
    id: 936108,
    title: "Smurfs",
    poster_path: "/8o6lkhL32xQJeB52IIG1us5BVey.jpg",
    vote_average: 5.831,
    media_type: 'movie' as const
  },
  {
    id: 157239,
    title: "Alien: Earth",
    poster_path: "/df99KX4saul55rPGEJdcj4hL95G.jpg",
    vote_average: 8.1,
    media_type: 'movie' as const
  },
  {
    id: 119051,
    title: "Wednesday",
    poster_path: "/36xXlhEpQqVVPuiZhfoQuaY4OlA.jpg",
    vote_average: 8.405,
    media_type: 'movie' as const
  },
  {
    id: 243224,
    title: "The Immortal Ascension",
    poster_path: "/kG8YooBxqX5BByifbA0wYeVVRYe.jpg",
    vote_average: 7.0,
    media_type: 'movie' as const
  },
  {
    id: 227114,
    title: "Butterfly",
    poster_path: "/fTpD8cg1xkxO17iCSWFAxUBWdCV.jpg",
    vote_average: 7.4,
    media_type: 'movie' as const
  },
  {
    id: 259909,
    title: "Dexter: Resurrection",
    poster_path: "/hIawSocuwqgNeRf3JuKuxgMHmSC.jpg",
    vote_average: 8.988,
    media_type: 'movie' as const
  }
];

const topTvShows = [
  {
    id: 157239,
    name: "Alien: Earth",
    poster_path: "/df99KX4saul55rPGEJdcj4hL95G.jpg",
    vote_average: 8.1,
    media_type: 'tv' as const
  },
  {
    id: 119051,
    name: "Wednesday",
    poster_path: "/36xXlhEpQqVVPuiZhfoQuaY4OlA.jpg",
    vote_average: 8.405,
    media_type: 'tv' as const
  },
  {
    id: 243224,
    name: "The Immortal Ascension",
    poster_path: "/kG8YooBxqX5BByifbA0wYeVVRYe.jpg",
    vote_average: 7.0,
    media_type: 'tv' as const
  },
  {
    id: 227114,
    name: "Butterfly",
    poster_path: "/fTpD8cg1xkxO17iCSWFAxUBWdCV.jpg",
    vote_average: 7.4,
    media_type: 'tv' as const
  },
  {
    id: 259909,
    name: "Dexter: Resurrection",
    poster_path: "/hIawSocuwqgNeRf3JuKuxgMHmSC.jpg",
    vote_average: 8.988,
    media_type: 'tv' as const
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection featuredMovies={featuredMovies} />
      <TopMoviesSection movies={topMovies} />
      <TopTvShowsSection tvShows={topTvShows} />
      <StreamingProvidersSection />
      <PlatformLogosSection />
      <Footer />
    </div>
  );
}
