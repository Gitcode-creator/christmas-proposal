import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0c102b] via-[#1a1c4b] to-[#090b1e] px-4 py-12 text-center relative overflow-hidden select-none">
      
      {/* Decorative stars */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[20%] right-[25%] w-2 h-2 bg-white rounded-full twinkle-star" />
        <div className="absolute bottom-[30%] left-[20%] w-3 h-3 bg-yellow-200 rounded-full twinkle-star" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="glass rounded-3xl border border-white/20 p-8 md:p-12 shadow-2xl max-w-md w-full relative overflow-hidden"
      >
        <span className="text-7xl block mb-4 filter drop-shadow-md">🎄</span>
        
        <h1 className="font-festive font-bold text-4xl text-white mb-2 tracking-wide">
          Page Not Found
        </h1>
        
        <p className="text-sm text-red-200/60 leading-relaxed mb-8">
          The chimney you are looking for seems to have vanished in the snow! Let's get you back to safety.
        </p>

        <Link
          to="/home"
          className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold rounded-2xl shadow-lg shadow-red-500/20 transform hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 cursor-pointer"
        >
          <Home className="w-4 h-4 mr-2" />
          Back Home
        </Link>
      </motion.div>
    </div>
  );
}
