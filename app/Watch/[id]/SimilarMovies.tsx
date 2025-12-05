"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type SimilarItem = {
    id: number;
    title?: string;
    name?: string;
    poster_path?: string;
    release_date?: string;
    first_air_date?: string;
};

type Props = {
    items: SimilarItem[];
    mediaType: 'movie' | 'tv';
};

export default function SimilarMovies({ items, mediaType }: Props) {
    if (!items || items.length === 0) return null;

    const getYear = (item: SimilarItem) => {
        const date = item.release_date || item.first_air_date;
        return date ? new Date(date).getFullYear() : '';
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">You May Also Like</h3>

            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {items.slice(0, 10).map((item) => (
                    <Link
                        key={item.id}
                        href={`/${mediaType}/${item.id}`}
                        className="group flex-shrink-0 w-[120px] md:w-[140px]"
                    >
                        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-muted/30">
                            {item.poster_path ? (
                                <Image
                                    src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                                    alt={item.title || item.name || ''}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                    <span className="text-xs text-muted-foreground">No Image</span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="mt-2 space-y-1">
                            <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                                {item.title || item.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">{getYear(item)}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
