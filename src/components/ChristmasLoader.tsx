import { motion } from 'framer-motion';

export function ChristmasLoader({ message = "Spreading Christmas Magic..." }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#0c102b] via-[#1a1c4b] to-[#090b1e] text-white">
      {/* Falling snow particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-bounce"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center text-center px-4 max-w-sm">
        {/* Glowing Spinning Christmas Tree */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="text-7xl mb-6 relative select-none cursor-default filter drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]"
        >
          🎄
        </motion.div>

        {/* Text */}
        <h3 className="font-festive text-2xl md:text-3xl text-red-100 font-bold tracking-wide animate-pulse">
          {message}
        </h3>
        
        <span className="text-[10px] text-red-200/40 uppercase tracking-widest font-mono mt-3">
          Loading Festive Spirit...
        </span>
      </div>
    </div>
  );
}
