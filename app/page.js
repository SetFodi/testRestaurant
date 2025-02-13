"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { menu } from '../data/menu';
import { motion, AnimatePresence } from 'framer-motion';
import { useMousePosition } from '../lib/useMousePosition';

const categoryOrder = ['appetizers', 'main-dishes', 'desserts', 'drinks'];

const formatCategory = (category) =>
  category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

// Scroll helper function
const scrollToCategories = () => {
  const categoriesSection = document.getElementById('categories');
  if (categoriesSection) {
    categoriesSection.scrollIntoView({ behavior: 'smooth' });
  }
};

// Fancy arrow component with animation
const ScrollArrow = () => (
  <motion.div 
    className="mt-12 cursor-pointer"
    onClick={scrollToCategories}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <motion.div
      className="flex flex-col items-center text-amber-400"
      animate={{ y: [0, 10, 0] }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <span className="text-sm tracking-wider mb-2">SEE MENU CATEGORIES</span>
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        className="text-amber-400"
      >
        <motion.path
          d="M12 4L12 20M12 20L5 13M12 20L19 13"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>
    </motion.div>
  </motion.div>
);

// Floating particles component
const FloatingParticles = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    initialX: `${Math.random() * 100}%`,
    initialY: `${Math.random() * 100}%`,
    targetX: `${Math.random() * 100}%`,
    targetY: `${Math.random() * 100}%`,
    duration: Math.random() * 10 + 10
  }));

  return (
    <div className="fixed inset-0 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
          initial={{ x: particle.initialX, y: particle.initialY }}
          animate={{ x: particle.targetX, y: particle.targetY }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
};

// Main Home component
export default function Home() {
  const { x, y } = useMousePosition();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render animations until mounted
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-stone-950 font-sans text-stone-100 antialiased overflow-hidden">
        <div className="h-screen flex items-center justify-center">
          <h1 className="text-7xl md:text-9xl font-serif mb-6 bg-gradient-to-r from-amber-300 to-amber-600 bg-clip-text text-transparent">
            Culinary Artistry
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 font-sans text-stone-100 antialiased overflow-hidden">
      {/* Parallax Background */}
      <div 
        className="fixed inset-0 bg-[url('/textures/marble-texture.jpg')] opacity-10"
        style={{
          transform: `translate(${-x * 0.02}px, ${-y * 0.02}px)`,
          backgroundSize: '1200px'
        }}
      />

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Hero Section */}
      <motion.header 
        className="relative h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="relative z-10 text-center">
          <motion.h1
            className="text-7xl md:text-9xl font-serif mb-6 bg-gradient-to-r from-amber-300 to-amber-600 bg-clip-text text-transparent"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Culinary Artistry
          </motion.h1>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-xl md:text-2xl font-light tracking-wider max-w-2xl mx-auto">
              <span className="inline-block border-r-2 border-amber-500 pr-4 mr-4">
                MICHELIN-STARRED EXPERIENCE
              </span>
              SINCE 1998
            </div>
            <ScrollArrow />
          </motion.div>
        </div>
      </motion.header>

      {/* Category Navigation */}
      <motion.main 
        id="categories"
        className="relative z-10 scroll-mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 p-8 max-w-7xl mx-auto">
          {categoryOrder.map((category) => {
            const firstMeal = menu[category][0];
            return (
              <Link 
                key={category} 
                href={`/category/${category}`}
                className="group relative overflow-hidden rounded-3xl transform transition-all duration-700 hover:scale-[1.02]"
              >
                <div className="relative h-[225px] md:h-[450px]">
                  <Image
                    src={firstMeal.image}
                    alt={formatCategory(category)}
                    fill
                    className="object-cover transform transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110"
                    quality={90}
                    priority
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 transition-opacity duration-500 group-hover:via-black/50" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h2 className="text-4xl md:text-5xl font-serif mb-4">
                      <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                        {formatCategory(category)}
                      </span>
                    </h2>
                    <div className="h-1 w-16 bg-amber-500 transition-all duration-500 group-hover:w-24" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </motion.main>

      {/* Footer */}
      <footer className="relative z-10 py-16 border-t border-stone-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <motion.div 
              className="w-12 h-12 mx-auto bg-amber-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <svg viewBox="0 0 24 24">
                <path 
                  fill="currentColor" 
                  d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66L12,15.39Z" 
                />
              </svg>
            </motion.div>
          </div>
          <p className="text-stone-400 text-sm tracking-widest font-light">
            CRAFTED WITH PASSION • {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}