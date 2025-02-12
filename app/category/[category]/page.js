'use client';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { menu } from '../../../data/menu';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';

export default function CategoryPage({ params }) {
  const { category } = use(params);
  const meals = menu[category];

  if (!meals) {
    return <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <h2 className="text-2xl font-serif text-stone-800">Category not found</h2>
    </div>;
  }

  const formatCategory = (cat) =>
    cat
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 antialiased">
      {/* Header */}
      <header className="bg-stone-900 py-6 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-4">
          <Link
            href="/"
            className="text-amber-50 text-lg hover:text-amber-200 transition-colors flex items-center gap-2"
          >
            <Cross1Icon className="w-4 h-4" />
            Back
          </Link>
          <h1 className="text-2xl font-serif text-amber-50 tracking-tight">
            {formatCategory(category)}
          </h1>
          <div></div>
        </div>
      </header>

      {/* Meals Grid */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {meals.map((meal) => (
            <Dialog.Root key={meal.id}>
              <Dialog.Trigger asChild>
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer overflow-hidden group relative">
                  <div className="relative aspect-video">
                    <Image
                      src={meal.image}
                      alt={meal.name}
                      fill
                      className="object-cover transform transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={75}
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <h2 className="text-xl font-serif mb-2 capitalize">
                        {meal.name}
                      </h2>
                      <span className="text-lg font-medium bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
                        {meal.price}
                      </span>
                    </div>
                    <p className="text-gray-600 line-clamp-2">
                      {meal.description}
                    </p>
                  </div>
                </div>
              </Dialog.Trigger>

              {/* Enhanced Meal Modal */}
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity data-[state=closed]:animate-fadeOut data-[state=open]:animate-fadeIn" />
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-3xl bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] overflow-hidden focus:outline-none outline-none data-[state=closed]:animate-modalClose data-[state=open]:animate-modalOpen">
                  <VisuallyHidden>
                    <Dialog.Title>{meal.name} Details</Dialog.Title>
                  </VisuallyHidden>
                  
                  <div className="relative aspect-video">
                    <Image
                      src={meal.image}
                      alt={meal.name}
                      fill
                      className="object-cover"
                      quality={90}
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/60" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h2 className="text-3xl font-serif mb-2 drop-shadow-lg">
                        {meal.name}
                      </h2>
                      <span className="text-xl font-medium bg-amber-400/90 text-amber-900 px-4 py-1.5 rounded-full inline-flex items-center gap-2">
                        {meal.price}
                      </span>
                    </div>
                    <Dialog.Close 
                      className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
                      aria-label="Close"
                    >
                      <Cross1Icon className="w-5 h-5 text-stone-800" />
                    </Dialog.Close>
                  </div>
                  
                  <div className="p-8 space-y-6">
                    <p className="text-stone-700 text-lg leading-relaxed font-light max-w-prose mx-auto">
                      {meal.description}
                    </p>
                    <div className="border-t border-stone-100 pt-6">
                      <div className="flex justify-end">
                        <Dialog.Close className="px-6 py-2.5 rounded-full bg-stone-900 text-white hover:bg-stone-800 transition-colors flex items-center gap-2 focus:ring-2 focus:ring-amber-400 focus:outline-none">
                          <Cross1Icon className="w-4 h-4" />
                          Close Details
                        </Dialog.Close>
                      </div>
                    </div>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 py-8 mt-12">
        <div className="max-w-4xl mx-auto text-center text-amber-50/80">
          <p className="text-sm">&copy; {new Date().getFullYear()} Culinary Artistry</p>
        </div>
      </footer>
    </div>
  );
}