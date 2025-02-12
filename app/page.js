import Link from 'next/link';
import { menu } from '../data/menu';

export default function Home() {
  const categories = Object.keys(menu);

  const formatCategory = (category) =>
    category
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 antialiased">
      {/* Enhanced Header */}
      <header className="bg-stone-900 py-12 md:py-16 lg:py-20 mb-12 md:mb-16 lg:mb-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-serif text-amber-50 tracking-tight mb-4"
            style={{ 
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              letterSpacing: '-0.03em'
            }}
          >
            Culinary Artistry
          </h1>
          <p className="text-amber-50/90 font-light text-lg sm:text-xl md:text-2xl tracking-wide max-w-2xl mx-auto">
            Discover our exquisite menu selections
          </p>
        </div>
      </header>

      {/* Responsive Category Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category) => {
            const firstMeal = menu[category][0];
            return (
              <Link key={category} href={`/category/${category}`} legacyBehavior>
                <a className="group relative block overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="relative aspect-square">
                    <img
                      src={firstMeal.image}
                      alt={formatCategory(category)}
                      className="w-full h-full object-cover transform transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50 transition-opacity duration-500 group-hover:via-black/40 group-hover:to-black/60" />
                    {/* Category Title */}
                    <div className="absolute inset-0 flex items-end p-6">
                      <h2 className="text-2xl md:text-3xl font-serif text-white tracking-tight transition-transform duration-500 translate-y-0 group-hover:-translate-y-2">
                        <span className="bg-gradient-to-r from-amber-400/90 to-amber-500/90 bg-clip-text text-transparent">
                          {formatCategory(category)}
                        </span>
                        <span className="block mt-2 w-12 h-0.5 bg-amber-400 transition-all duration-500 group-hover:w-16" />
                      </h2>
                    </div>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-stone-900 py-12 mt-16 md:mt-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-4">
            <svg 
              className="w-8 h-8 mx-auto text-amber-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>
          <p className="text-amber-50/80 text-sm md:text-base font-light tracking-wide">
            © {new Date().getFullYear()} Culinary Artistry
            <span className="mx-2">•</span>
            Crafted with Excellence
          </p>
        </div>
      </footer>
    </div>
  );
}