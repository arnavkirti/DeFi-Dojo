import React from 'react';
import { motion } from 'framer-motion';

const WoodenThemeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#2b1810]">
      {/* Wooden texture overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          filter: 'contrast(120%) brightness(90%)'
        }}
      />

      {/* Wood grain animated lines */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-full w-1 bg-gradient-to-b from-transparent via-[#3d2315]/20 to-transparent"
            initial={{ x: `${i * 12.5}%`, scaleY: 0 }}
            animate={{ 
              scaleY: [0, 1, 0],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>

      {/* Wooden frame borders */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 border-8 border-[#4a2c1c] rounded-lg shadow-[inset_0_0_20px_rgba(0,0,0,0.3)]" />
        <div className="absolute inset-4 border-4 border-[#3d2315] rounded-lg" />
      </div>

      {/* Content wrapper with scroll effects */}
      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Japanese-style decorative elements */}
        <div className="fixed top-4 left-4 w-16 h-16 opacity-30">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path 
              d="M10,50 A40,40 0 1,1 90,50 A40,40 0 1,1 10,50" 
              fill="none" 
              stroke="#8b5e3c" 
              strokeWidth="2"
            />
            <path 
              d="M30,50 A20,20 0 1,1 70,50 A20,20 0 1,1 30,50" 
              fill="none" 
              stroke="#8b5e3c" 
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>

        {/* Animated corner decorations */}
        {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((position, i) => (
          <motion.div
            key={i}
            className={`fixed w-16 h-16 ${position} pointer-events-none`}
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 90 * i }}
            transition={{ duration: 0.8, delay: 0.2 * i }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
              <path
                d="M0,0 L100,0 L100,20 C60,20 20,60 20,100 L0,100 Z"
                fill="#5c3824"
              />
            </svg>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default WoodenThemeLayout;