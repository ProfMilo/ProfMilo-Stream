"use client";
import React, { useState } from 'react';
import { Settings, Download, Play, ExternalLink, FileDown, AlertCircle } from 'lucide-react';

type Props = {
    movieId: string;
    movieTitle: string;
    isTV?: boolean;
    season?: string;
    episode?: string;
    onSourceChange?: (source: string) => void;
};

const streamSources = [
    { id: 'v1', label: 'CinemaOS V1', quality: 'Auto' },
    { id: 'v2', label: 'CinemaOS V2', quality: 'Auto' },
    { id: 'v3', label: 'CinemaOS V3', quality: 'Auto' },
    { id: '4k', label: 'CinemaOS 4K', quality: '4K' },
];

export default function StreamSources({ movieId, movieTitle, isTV, season, episode, onSourceChange }: Props) {
    const [activeSource, setActiveSource] = useState('v1');
    const [activeTab, setActiveTab] = useState<'download' | 'direct'>('download');

    const handleSourceChange = (sourceId: string) => {
        setActiveSource(sourceId);
        onSourceChange?.(sourceId);
    };

    const getEmbedUrl = (source: string) => {
        if (isTV && season && episode) {
            switch (source) {
                case 'v1': return `https://vidsrc.icu/embed/tv/${movieId}/${season}/${episode}`;
                case 'v2': return `https://vidsrc.xyz/embed/tv/${movieId}/${season}/${episode}`;
                case 'v3': return `https://vidsrc.to/embed/tv/${movieId}/${season}/${episode}`;
                case '4k': return `https://vidsrc.pro/embed/tv/${movieId}/${season}/${episode}`;
                default: return `https://vidsrc.icu/embed/tv/${movieId}/${season}/${episode}`;
            }
        } else {
            switch (source) {
                case 'v1': return `https://vidsrc.icu/embed/movie/${movieId}`;
                case 'v2': return `https://vidsrc.xyz/embed/movie/${movieId}`;
                case 'v3': return `https://vidsrc.to/embed/movie/${movieId}`;
                case '4k': return `https://vidsrc.pro/embed/movie/${movieId}`;
                default: return `https://vidsrc.icu/embed/movie/${movieId}`;
            }
        }
    };

    const currentSource = streamSources.find(s => s.id === activeSource);

    return (
        <div className="space-y-6">
            {/* Stream Sources Header */}
            <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                    <Settings className="h-5 w-5" />
                    Stream Sources
                </h3>
                <span className="text-xs text-primary px-2 py-1 rounded bg-primary/10">Streaming</span>
            </div>

            {/* Source Tabs */}
            <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Provider Source:</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {streamSources.map((source) => (
                    <button
                        key={source.id}
                        onClick={() => handleSourceChange(source.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeSource === source.id
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                            }`}
                    >
                        {source.label}
                    </button>
                ))}
            </div>

            {/* Download / Direct Player Toggle */}
            <div className="flex rounded-lg bg-muted/30 p-1">
                <button
                    onClick={() => setActiveTab('download')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'download'
                            ? 'bg-background text-foreground shadow'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                >
                    <Download className="h-4 w-4" />
                    Download Movie
                </button>
                <button
                    onClick={() => setActiveTab('direct')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'direct'
                            ? 'bg-background text-foreground shadow'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                >
                    <Play className="h-4 w-4" />
                    Direct Player
                </button>
            </div>

            {/* Current Source Info */}
            <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Current source:</span>
                <div className="flex items-center gap-2">
                    <span>{currentSource?.label}</span>
                    <span className="text-xs bg-muted px-2 py-0.5 rounded">{currentSource?.quality}</span>
                </div>
            </div>

            {/* Download Options */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h4 className="flex items-center gap-2 text-sm font-medium">
                        <FileDown className="h-4 w-4" />
                        Download Options
                    </h4>
                    <button className="text-xs text-primary hover:underline">More</button>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/20 border border-white/5">
                    <button className="flex items-center gap-2 px-4 py-2 rounded bg-muted/50 hover:bg-muted text-sm transition-all">
                        <Download className="h-4 w-4" />
                        Download {movieTitle}
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded bg-muted/50 hover:bg-muted text-sm transition-all">
                        <ExternalLink className="h-4 w-4" />
                        Find Subtitles
                    </button>
                </div>

                <p className="text-xs text-muted-foreground">
                    These links are provided via external services. Use at your own discretion.
                </p>
            </div>

            {/* Torrent Sources */}
            <div className="space-y-4">
                <h4 className="flex items-center gap-2 text-sm font-medium">
                    <AlertCircle className="h-4 w-4" />
                    Torrent Sources
                </h4>
                <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                    <FileDown className="h-8 w-8 mb-2 opacity-50" />
                    <p className="text-sm">No media sources available</p>
                </div>
            </div>
        </div>
    );
}
