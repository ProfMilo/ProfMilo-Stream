'use client';

export default function PlatformLogosSection() {
  const platforms = [
    { name: 'tubi', logo: 'TUBI' },
    { name: 'nbc', logo: 'NBC' },
    { name: 'netflix', logo: 'NETFLIX' },
    { name: 'disney-plus', logo: 'Disney+' },
    { name: 'prime', logo: 'prime' },
    { name: 'hbo-max', logo: 'HBO Max' },
    { name: 'apple-tv', logo: 'tv' },
    { name: 'hulu', logo: 'hulu' },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            All Your Favorite Platforms In One Place
          </h2>
        </div>

        {/* Platform Logos */}
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="flex items-center justify-center p-6 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-200 group min-w-[120px] min-h-[80px]"
            >
              <span className="text-xl lg:text-2xl font-bold text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                {platform.logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
