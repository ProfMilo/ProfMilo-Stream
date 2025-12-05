# 🎬 CinemaOS Stream

A modern streaming platform built with **Next.js 15**, featuring a sleek CinemaOS-inspired UI design. Browse movies, TV shows, and anime with a premium dark-themed interface.

![Next.js](https://img.shields.io/badge/Next.js-15.3.1-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Features

### 🏠 Homepage
- **Hero Section** - Full-screen carousel with CinemaOS-style layout, stacked poster cards, and glassmorphism badges
- **Top 10 Movies & TV Shows** - Ranked content grids with rating badges
- **Streaming Providers** - Browse content by provider (Netflix, Disney+, Prime Video, etc.) with live API integration

### 🎥 Watch Page
- **Multi-source Streaming** - Switch between V1, V2, V3, and 4K sources
- **Movie Details** - Runtime, genres, budget, production companies
- **Similar Content** - Recommendations carousel
- **Download Options** - Direct download and subtitle links

### 📺 Content Pages
- **Movies** - Browse and search movies
- **TV Shows** - Season/episode navigation with accordion UI
- **Anime** - Dedicated anime section
- **Collections** - Curated movie collections

### 🎨 Design
- **Pure Black Theme** - Premium dark mode aesthetic
- **Glassmorphism Effects** - Modern translucent UI elements
- **Responsive Layout** - Optimized for all screen sizes
- **Smooth Animations** - Fade transitions and hover effects

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/ProfMilo/ProfMilo-Stream.git
cd ProfMilo-Stream

# Install dependencies
npm install
```

### Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
```

> Get your free API key at [themoviedb.org](https://www.themoviedb.org/settings/api)

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📁 Project Structure

```
├── app/
│   ├── components/
│   │   ├── feature/          # Feature components
│   │   │   ├── HeroSection.tsx
│   │   │   ├── StreamingProvidersSection.tsx
│   │   │   ├── TopMoviesSection.tsx
│   │   │   └── TopTvShowsSection.tsx
│   │   ├── layout/           # Layout components
│   │   │   └── Navbar.tsx
│   │   └── ui/               # Reusable UI components
│   ├── movie/[id]/           # Movie detail page
│   ├── tv/[id]/              # TV show detail page
│   ├── Watch/[id]/           # Watch page with streaming
│   ├── anime/                # Anime section
│   ├── collection/           # Collections section
│   └── page.tsx              # Homepage
├── public/                   # Static assets
└── tailwind.config.ts        # Tailwind configuration
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with App Router |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Utility-first styling |
| **Turbopack** | Fast development bundler |
| **TMDB API** | Movie & TV metadata |
| **Lucide React** | Icon library |

---

## 📦 Deployment

### Deploy on Vercel

1. Push your code to GitHub
2. Import your repo at [vercel.com/new](https://vercel.com/new)
3. Add `NEXT_PUBLIC_TMDB_API_KEY` in Environment Variables
4. Click **Deploy**

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

## ⚠️ Disclaimer

CinemaOS Stream is a content aggregator and does not host any media files. All content is sourced from third-party providers. For copyright concerns, please contact the respective content providers.

---

**Built with ❤️ by [ProfMilo](https://github.com/ProfMilo)**