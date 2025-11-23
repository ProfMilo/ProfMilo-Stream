'use client';

import Link from 'next/link';
import { Search, Bell, Settings, User, MessageCircle } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="fixed top-0 z-[100] w-full border-b border-zinc-800 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
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
            <h1 className="text-xl font-bold text-foreground">CinemaOS</h1>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link href="/movie" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Movie
          </Link>
          <Link href="/tv" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Tv Shows
          </Link>
          <Link href="/anime" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Anime
          </Link>
          <Link href="/sports" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Sports
          </Link>
          <Link href="/iptv" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            IPTV
          </Link>
          <Link href="/collection" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Collection
          </Link>
          <Link href="/ai-search" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            AI Search
          </Link>
          <Link href="/download" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Download
          </Link>
          <Link href="/embed" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Embed
          </Link>
        </nav>

        {/* Right: Search and Icons */}
        <div className="flex items-center space-x-3">
          {/* Search Bar */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search Anything"
              className="h-10 w-64 rounded-md border border-zinc-700 bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                K
              </kbd>
            </div>
          </div>

          {/* User Icons */}
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground">
            <User className="h-5 w-5" />
          </button>
          
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground">
            <Bell className="h-5 w-5" />
          </button>
          
          <Link
            href="https://discord.gg/38yFnFCJnA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
          >
            <MessageCircle className="h-5 w-5" />
          </Link>
          
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}