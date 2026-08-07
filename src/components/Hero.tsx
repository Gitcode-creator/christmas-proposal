import { useEffect, useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface HeroProps {
  onGenerateClick: () => void;
  onExploreFeaturesClick: () => void;
}

export function Hero({ onGenerateClick, onExploreFeaturesClick }: HeroProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let christmasDate = new Date(`December 25, ${currentYear} 00:00:00`);

      // If Christmas has passed this year, count down to next year's Christmas
      if (now.getTime() > christmasDate.getTime()) {
        christmasDate = new Date(`December 25, ${currentYear + 1} 00:00:00`);
      }

      const difference = christmasDate.getTime() - now.getTime();

      let days = Math.floor(difference / (1000 * 60 * 60 * 24));
      let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      let minutes = Math.floor((difference / 1000 / 60) % 60);
      let seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden pt-8 sm:pt-12 pb-16 sm:pb-20 px-4 text-center max-w-5xl mx-auto z-20 flex flex-col items-center">
      {/* Decorative ornaments floating left/right - only on large screens */}
      <div className="absolute left-[5%] top-[10%] text-5xl opacity-30 float-decoration hidden xl:block" style={{ animationDelay: '1s' }}>❄️</div>
      <div className="absolute right-[5%] top-[15%] text-5xl opacity-30 float-decoration hidden xl:block" style={{ animationDelay: '3s' }}>🎁</div>
      <div className="absolute left-[8%] bottom-[10%] text-4xl opacity-20 float-decoration hidden xl:block" style={{ animationDelay: '2.5s' }}>🔔</div>
      <div className="absolute right-[8%] bottom-[5%] text-4xl opacity-20 float-decoration hidden xl:block" style={{ animationDelay: '4s' }}>🌟</div>

      {/* Twinkling star */}
      <div className="text-5xl sm:text-6xl lg:text-7xl mb-4 animate-[spin_10s_linear_infinite] filter drop-shadow-[0_0_15px_rgba(234,179,8,0.6)]">
        ⭐
      </div>

      {/* Main Hero Header - responsive typography using clamp */}
      <h1 className="font-festive font-bold text-responsive-hero text-slate-900 dark:text-white tracking-wide max-w-4xl mx-auto drop-shadow-sm transition-colors duration-300">
        AI <span className="text-red-600 dark:text-red-500 christmas-glow">Christmas Wishes</span> Generator
      </h1>

      {/* Subtitle */}
      <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed transition-colors duration-300 px-2">
        Craft deeply personalized, magical, and heartwarming holiday messages for your friends, family, and colleagues in seconds using advanced AI logic.
      </p>

      {/* Action Buttons - stacked on mobile, row on sm+ */}
      <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center w-full max-w-sm sm:max-w-md">
        <button
          onClick={onGenerateClick}
          className="flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold rounded-2xl cursor-pointer shadow-lg shadow-red-500/35 transform hover:scale-105 active:scale-95 transition-all duration-200 text-sm sm:text-base"
        >
          <Sparkles className="w-5 h-5 mr-2 animate-[pulse_1.5s_infinite]" />
          Generate Wishes
        </button>
        <button
          onClick={onExploreFeaturesClick}
          className="flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-200 font-semibold rounded-2xl cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200 border border-slate-300/20 text-sm sm:text-base"
        >
          Explore Features
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>

      {/* Countdown Card Container */}
      <div className="mt-10 sm:mt-16 w-full max-w-3xl glass rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-white/20 dark:border-slate-800/80 relative">
        <div className="absolute top-[-16px] left-[50%] translate-x-[-50%] bg-red-600 text-white text-xs font-bold font-mono tracking-widest px-4 py-1.5 rounded-full uppercase shadow whitespace-nowrap">
          Countdown to Christmas
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 mt-4">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds },
          ].map((item) => (
            <div 
              key={item.label} 
              className="flex flex-col items-center bg-white/40 dark:bg-slate-900/60 rounded-2xl py-3 px-1 sm:py-4 md:py-5 border border-white/30 dark:border-slate-800/50 shadow-sm"
            >
              <span className="font-mono font-bold text-2xl sm:text-3xl md:text-5xl text-red-600 dark:text-red-500 drop-shadow-[0_2px_4px_rgba(239,68,68,0.15)] animate-[pulse_1.5s_infinite]">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mt-1 md:mt-2">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
