'use client';

import Link from 'next/link';
import { Shield, AlertTriangle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mx-4 my-2 overflow-hidden rounded-xl bg-gradient-to-br from-background to-muted/30 shadow-lg backdrop-blur-sm lg:mb-4 lg:border lg:border-zinc-800">
      {/* Top Border */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="p-6 lg:p-8">
        {/* Main Footer Content */}
        <div className="mx-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-4">
          {/* Left: Logo and Description */}
          <div className="flex items-center gap-3 md:flex-1">
            <div className="rounded-lg bg-primary/10 p-2">
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">CinemaOS</h2>
              <p className="text-xs text-muted-foreground">Your entertainment hub</p>
            </div>
          </div>

          {/* Center: Navigation Links */}
          <div className="flex flex-wrap justify-center gap-2 md:flex-1 md:gap-3">
            <Link
              href="/"
              className="group flex items-center gap-2 rounded-lg bg-background/50 px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
            >
              Trending
            </Link>
            <Link
              href="/movie"
              className="group flex items-center gap-2 rounded-lg bg-background/50 px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
            >
              Movies
            </Link>
            <Link
              href="/tv"
              className="group flex items-center gap-2 rounded-lg bg-background/50 px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
            >
              TV Shows
            </Link>
            <Link
              href="/search"
              className="group flex items-center gap-2 rounded-lg bg-background/50 px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
            >
              Search
            </Link>
          </div>

          {/* Right: Powered By */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground md:flex-1 md:justify-end">
            <span className="rounded-full bg-green-500/20 px-2 py-1 text-green-700 dark:text-green-400">
              Powered by
            </span>
            <span>TMDB API</span>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="mt-8">
          <div className="relative overflow-hidden rounded-xl border border-amber-200/50 bg-gradient-to-r from-amber-50/50 to-orange-50/50 p-4 dark:border-amber-900/30 dark:from-amber-950/20 dark:to-orange-950/20">
            {/* Background Blur Effects */}
            <div className="absolute -right-2 -top-2 h-16 w-16 rounded-full bg-amber-100/30 blur-xl dark:bg-amber-900/20" />
            <div className="absolute -bottom-2 -left-2 h-12 w-12 rounded-full bg-orange-100/30 blur-lg dark:bg-orange-900/20" />
            
            <div className="relative flex items-start gap-3">
              <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-900/50">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="font-semibold text-amber-900 dark:text-amber-100">
                    Important Disclaimer
                  </h3>
                </div>
                
                <p className="text-sm leading-relaxed text-amber-800/90 dark:text-amber-200/90 md:text-base">
                  CinemaOS operates as a content aggregator and does not host any media files on our servers. All content is sourced from third-party providers and embedded services. For any copyright concerns or DMCA takedown requests, please contact the respective content providers directly.
                </p>
                
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-amber-200/50 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-800/30 dark:text-amber-200">
                    Third-party Content
                  </span>
                  <span className="rounded-full bg-amber-200/50 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-800/30 dark:text-amber-200">
                    No File Hosting
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="mt-6 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
        
        {/* Bottom Text */}
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground/70">
            Built with ❤️ for entertainment by the CinemaOS team.
          </p>
        </div>
      </div>
    </footer>
  );
}
