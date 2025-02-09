import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

interface PopupProps {
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {showConfetti && <Confetti width={width} height={height} />}
        
        {/* Modal */}
        <motion.div
          className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg shadow-lg border border-gray-700 text-white w-[90%] max-w-md relative"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {/* Close Button */}
          <button
            className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
            onClick={onClose}
          >
            ✕
          </button>

          {/* Animated Checkmark */}
          <motion.div
            className="flex justify-center mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
          >
            <svg
              className="w-16 h-16 text-green-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>

          {/* Header */}
          <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500 mb-2">
            Congratulations!
          </h2>

          {/* Description */}
          <p className="text-center text-gray-300 mb-6">
            You’ve completed all tutorials and are now eligible to join a DAO. 🚀  
            <br />  
            Join <span className="text-green-400 font-semibold">Speedrun Ethereum</span>  
            to level up your DeFi skills and collaborate with top Web3 builders!
          </p>

          {/* Action Button */}
          <div className="flex justify-center">
            <a href="https://speedrunethereum.com/" target="_blank" rel="noopener noreferrer">
              <motion.button
                className="px-6 py-2 bg-green-500 text-black font-semibold rounded-lg shadow-lg transition-transform hover:scale-105 hover:bg-green-400"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Join DAO 🚀
              </motion.button>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Popup;
