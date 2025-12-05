export default function Loading() {
    return (
        <div className="min-h-screen bg-background animate-pulse">
            {/* Hero Skeleton */}
            <div className="relative h-[80vh] w-full bg-zinc-900/50">
                <div className="absolute bottom-0 left-0 p-8 w-full max-w-7xl mx-auto space-y-4">
                    <div className="h-4 w-24 bg-zinc-800 rounded-full" />
                    <div className="h-12 w-3/4 max-w-2xl bg-zinc-800 rounded-lg" />
                    <div className="flex gap-4">
                        <div className="h-8 w-16 bg-zinc-800 rounded-full" />
                        <div className="h-8 w-24 bg-zinc-800 rounded-full" />
                    </div>
                    <div className="h-24 w-full max-w-xl bg-zinc-800 rounded-lg" />
                    <div className="flex gap-4 pt-4">
                        <div className="h-12 w-32 bg-zinc-800 rounded-xl" />
                        <div className="h-12 w-32 bg-zinc-800 rounded-xl" />
                    </div>
                </div>
            </div>

            {/* Section Skeletons */}
            <div className="container mx-auto px-4 py-12 space-y-12">
                {[1, 2].map((i) => (
                    <div key={i} className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div className="h-8 w-48 bg-zinc-900 rounded-lg" />
                            <div className="h-10 w-24 bg-zinc-900 rounded-lg" />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {[1, 2, 3, 4, 5].map((j) => (
                                <div key={j} className="aspect-[2/3] bg-zinc-900 rounded-xl" />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
