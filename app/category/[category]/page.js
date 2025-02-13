"use client";

import { use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { menu } from '../../../data/menu';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';
import { useMousePosition } from '../../../lib/useMousePosition';

// Quick category navigation component
const CategoryNav = ({ currentCategory }) => (
  <div className="bg-stone-900/50 border-b border-stone-800 backdrop-blur-sm">
    <div className="max-w-7xl mx-auto px-8 py-3 overflow-x-auto">
      <div className="flex gap-4 items-center">
        {['appetizers', 'main-dishes', 'desserts', 'drinks'].map((cat) => (
          <Link
            key={cat}
            href={`/category/${cat}`}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              currentCategory === cat
                ? 'bg-amber-400/20 text-amber-400'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            {cat
              .split('-')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')}
          </Link>
        ))}
      </div>
    </div>
  </div>
);

// Separate Modal component
const MealModal = ({ meal }) => (
  <Dialog.Portal>
    <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50" />
    <Dialog.Content className="fixed inset-0 flex items-center justify-center p-8 z-50">
      <motion.div
        className="relative w-full max-w-4xl bg-stone-900 rounded-3xl border border-stone-800 overflow-hidden shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="relative aspect-video">
          <Image
            src={meal.image}
            alt={meal.name}
            fill
            className="object-cover"
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <Dialog.Title className="text-4xl font-serif text-white mb-4">
              {meal.name}
            </Dialog.Title>
            <span className="text-xl font-medium bg-amber-400/20 text-amber-400 px-6 py-2 rounded-full">
              {meal.price}
            </span>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <p className="text-stone-300 text-xl leading-relaxed font-light max-w-prose">
            {meal.description}
          </p>
          <div className="border-t border-stone-800 pt-6">
            <Dialog.Close className="w-full px-8 py-4 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 transition-all flex items-center justify-center gap-2">
              <Cross1Icon className="w-6 h-6" />
              Close Experience
            </Dialog.Close>
          </div>
        </div>
      </motion.div>
    </Dialog.Content>
  </Dialog.Portal>
);

export default function CategoryPage({ params }) {
  const { category } = use(params);
  const meals = menu[category];
  const { x, y } = useMousePosition();

  if (!meals) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-serif text-stone-800"
        >
          Category not found
        </motion.h2>
      </div>
    );
  }

  const formatCategory = (cat) =>
    cat
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 antialiased overflow-hidden">
      {/* Animated Header */}
      <motion.header 
        className="bg-stone-900/80 backdrop-blur-sm py-6 sticky top-0 z-10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring' }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8">
          <Link
            href="/"
            className="group flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-all"
          >
            <motion.div whileHover={{ rotate: -90 }}>
              <Cross1Icon className="w-6 h-6 transition-transform group-hover:scale-125" />
            </motion.div>
            <span className="text-xl font-light tracking-widest">EXPLORE</span>
          </Link>
          <h1 className="text-3xl font-serif bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            {formatCategory(category)}
          </h1>
          <div className="w-6" />
        </div>
      </motion.header>

      {/* Quick Category Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="sticky top-[88px] z-10"
      >
        <CategoryNav currentCategory={category} />
      </motion.div>

      {/* Meal Grid */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 py-12">
        <AnimatePresence>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {meals.map((meal) => (
              <Dialog.Root key={meal.id}>
                <Dialog.Trigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative overflow-hidden rounded-2xl border border-stone-800 bg-stone-900/50 backdrop-blur-sm cursor-pointer"
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={meal.image}
                        alt={meal.name}
                        fill
                        className="object-cover transform transition-transform duration-700 group-hover:scale-110"
                        quality={90}
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <Dialog.Title className="text-2xl font-serif text-white mb-2">
                          {meal.name}
                        </Dialog.Title>
                        <span className="text-lg font-medium bg-amber-400/20 text-amber-400 px-4 py-1 rounded-full">
                          {meal.price}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Dialog.Trigger>
                <MealModal meal={meal} />
              </Dialog.Root>
            ))}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Signature Footer */}
      <footer className="relative z-10 py-12 border-t border-stone-800 mt-24">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6">
            <motion.div 
              className="w-12 h-12 mx-auto bg-amber-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
            />
          </div>
          <p className="text-stone-400 text-sm tracking-widest font-light">
            CULINARY ARTISTRY © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}