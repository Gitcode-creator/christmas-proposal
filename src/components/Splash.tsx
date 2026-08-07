import { useEffect, useState } from 'react';

interface SplashProps {
  onComplete: () => void;
}

export function Splash({ onComplete }: SplashProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Increment progress bar to 100 over 3 seconds
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2.5; // 40 steps, total 3 seconds (approx 75ms per step)
      });
    }, 75);

    const timeout = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#0c102b] via-[#1a1c4b] to-[#090b1e] text-white overflow-hidden select-none">
      {/* Twinkling star decorations */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[10%] left-[20%] w-3 h-3 bg-yellow-200 rounded-full twinkle-star" />
        <div className="absolute top-[25%] right-[15%] w-2 h-2 bg-yellow-100 rounded-full twinkle-star" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-[30%] left-[10%] w-2.5 h-2.5 bg-yellow-300 rounded-full twinkle-star" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-[15%] right-[25%] w-3 h-3 bg-yellow-200 rounded-full twinkle-star" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-[40%] right-[40%] w-2 h-2 bg-white rounded-full twinkle-star" style={{ animationDelay: '2s' }} />
      </div>

      <div className="text-center px-4 relative z-10 flex flex-col items-center">
        {/* Animated Christmas Tree */}
        <div className="relative mb-6 text-7xl animate-bounce duration-1000">
          🎄
        </div>

        {/* Bouncing/Twinkling Title */}
        <h1 className="font-festive font-bold text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-200 to-green-500 drop-shadow-[0_4px_12px_rgba(239,68,68,0.4)] tracking-wide mb-2">
          Merry Christmas
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-red-100 font-hand mb-10 tracking-widest animate-pulse">
          Bringing Festive Magic to Life
        </p>

        {/* Santa Animation */}
        <div className="relative w-48 h-20 mb-8 overflow-hidden">
          <div className="absolute left-0 bottom-0 text-4xl animate-[float_3s_infinite_ease-in-out] translate-x-[-100%] animate-[drive-santa_3s_linear_infinite]">
            🎅 🦌 🦌
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="w-64 h-3 bg-slate-800/80 rounded-full border border-slate-700/50 overflow-hidden shadow-inner p-[2px]">
          <div
            className="h-full bg-gradient-to-r from-red-600 via-yellow-400 to-green-600 rounded-full transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-xs text-red-200/50 mt-2 font-mono uppercase tracking-widest animate-pulse">
          Loading Festive Spirit...
        </span>
      </div>

      {/* CSS Animation for Santa Driving */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes drive-santa {
          0% { left: -50px; }
          100% { left: 220px; }
        }
      `}</style>
    </div>
  );
}
