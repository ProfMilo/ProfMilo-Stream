"use client";
import React from 'react';
import { Calendar, Clock, Globe, DollarSign, Film, Building, MapPin, Languages } from 'lucide-react';

type Props = {
    releaseDate?: string;
    runtime?: number;
    language?: string;
    status?: string;
    budget?: number;
    revenue?: number;
    productionCompanies?: Array<{ id: number; name: string; logo_path?: string }>;
    productionCountries?: Array<{ iso_3166_1: string; name: string }>;
    spokenLanguages?: Array<{ english_name: string; iso_639_1: string }>;
};

export default function MovieDetails({
    releaseDate,
    runtime,
    language,
    status,
    budget,
    revenue,
    productionCompanies,
    productionCountries,
    spokenLanguages,
}: Props) {
    const formatCurrency = (amount: number) => {
        if (amount >= 1000000000) {
            return `$${(amount / 1000000000).toFixed(1)}B`;
        }
        if (amount >= 1000000) {
            return `$${(amount / 1000000).toFixed(1)}M`;
        }
        if (amount >= 1000) {
            return `$${(amount / 1000).toFixed(0)}K`;
        }
        return `$${amount.toLocaleString()}`;
    };

    const formatRuntime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="space-y-6">
            {/* Details Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    {releaseDate && (
                        <div className="space-y-1">
                            <span className="text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Release Date
                            </span>
                            <p className="font-medium">{formatDate(releaseDate)}</p>
                        </div>
                    )}
                    {runtime && runtime > 0 && (
                        <div className="space-y-1">
                            <span className="text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Runtime
                            </span>
                            <p className="font-medium">{formatRuntime(runtime)}</p>
                        </div>
                    )}
                    {language && (
                        <div className="space-y-1">
                            <span className="text-muted-foreground flex items-center gap-1">
                                <Globe className="h-3 w-3" />
                                Language
                            </span>
                            <p className="font-medium">{language}</p>
                        </div>
                    )}
                    {status && (
                        <div className="space-y-1">
                            <span className="text-muted-foreground flex items-center gap-1">
                                <Film className="h-3 w-3" />
                                Status
                            </span>
                            <p className="font-medium">{status}</p>
                        </div>
                    )}
                    {budget && budget > 0 && (
                        <div className="space-y-1">
                            <span className="text-muted-foreground flex items-center gap-1">
                                <DollarSign className="h-3 w-3" />
                                Budget
                            </span>
                            <p className="font-medium">{formatCurrency(budget)}</p>
                        </div>
                    )}
                    {revenue && revenue > 0 && (
                        <div className="space-y-1">
                            <span className="text-muted-foreground flex items-center gap-1">
                                <DollarSign className="h-3 w-3" />
                                Revenue
                            </span>
                            <p className="font-medium">{formatCurrency(revenue)}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Production Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Production</h3>

                {/* Companies */}
                {productionCompanies && productionCompanies.length > 0 && (
                    <div className="space-y-2">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Building className="h-3 w-3" />
                            Companies
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {productionCompanies.map((company) => (
                                <span
                                    key={company.id}
                                    className="px-3 py-1 rounded-full bg-muted/50 text-xs font-medium"
                                >
                                    {company.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Countries */}
                {productionCountries && productionCountries.length > 0 && (
                    <div className="space-y-2">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            Countries
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {productionCountries.map((country) => (
                                <span
                                    key={country.iso_3166_1}
                                    className="text-sm"
                                >
                                    {country.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Languages */}
                {spokenLanguages && spokenLanguages.length > 0 && (
                    <div className="space-y-2">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Languages className="h-3 w-3" />
                            Languages
                        </span>
                        <p className="text-sm">
                            {spokenLanguages.map((lang) => lang.english_name).join(', ')}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
