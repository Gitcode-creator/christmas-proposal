import { Info, Sparkles, Heart } from 'lucide-react';

export function About() {
  return (
    <section className="py-12 sm:py-16 px-3 sm:px-4 max-w-7xl mx-auto z-20 transition-colors duration-300">
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
        <h2 className="font-festive font-bold text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white mb-4">
          Why Personalized Wishes Matter
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
          A generic card is nice, but a wish tailored to a favorite memory, specific mood, or personal joke is something that stays in the heart forever. 
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
        {/* Left Column - Content Description */}
        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0 p-3 bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 rounded-2xl h-12 w-12 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Deeply Personalized Connections</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                By taking into account the recipient's age group, relationship status, preferred language, and custom memory triggers, we synthesize greetings that feel organic, sincere, and fully tailored.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 p-3 bg-green-100 dark:bg-green-950/50 text-green-600 dark:text-green-400 rounded-2xl h-12 w-12 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Flexible Formats & Copywriting</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Need an emotional message for your parents? A funny one for your best friend? Or maybe a professional post for LinkedIn? Generate 15 distinct card, quote, status, and suggestion types at once.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 p-3 bg-yellow-100 dark:bg-yellow-950/50 text-yellow-600 dark:text-yellow-500 rounded-2xl h-12 w-12 flex items-center justify-center">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Instant Card Customization</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Once generated, load your wish directly into our festive card designer. Customize backgrounds, text alignment, and ornament decorations, then download it as a high-resolution PNG image instantly!
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Christmas Tree Illustration - hidden on very small mobile */}
        <div className="flex justify-center items-center">
          <div className="relative w-64 sm:w-80 h-80 sm:h-96 bg-gradient-to-tr from-red-600/10 to-green-600/10 dark:from-red-500/5 dark:to-green-500/5 rounded-3xl p-6 border border-slate-200/50 dark:border-slate-800/80 shadow-inner flex flex-col justify-center items-center overflow-hidden">
            {/* Twinkling star on tree top */}
            <div className="text-yellow-400 text-5xl animate-bounce mb-[-10px] z-10 filter drop-shadow-[0_0_10px_rgba(234,179,8,0.8)]">★</div>
            
            {/* The Tree Triangles */}
            <div className="w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-b-[90px] border-b-green-700 dark:border-b-green-800 rounded-md relative shadow-md">
              <div className="absolute top-[40px] left-[-20px] w-3 h-3 bg-red-500 rounded-full animate-ping" />
              <div className="absolute top-[60px] left-[15px] w-2.5 h-2.5 bg-yellow-300 rounded-full animate-[pulse_1.5s_infinite]" />
            </div>
            <div className="w-0 h-0 border-l-[80px] border-l-transparent border-r-[80px] border-r-transparent border-b-[110px] border-b-green-600 dark:border-b-green-700 rounded-md relative mt-[-40px] z-2 shadow-md">
              <div className="absolute top-[50px] left-[-40px] w-2.5 h-2.5 bg-yellow-300 rounded-full animate-[pulse_2s_infinite]" />
              <div className="absolute top-[30px] right-[-10px] w-3.5 h-3.5 bg-red-500 rounded-full animate-[pulse_1.2s_infinite]" />
              <div className="absolute top-[70px] right-[25px] w-3 h-3 bg-blue-400 rounded-full animate-ping" />
            </div>
            <div className="w-0 h-0 border-l-[100px] border-l-transparent border-r-[100px] border-r-transparent border-b-[130px] border-b-green-500 dark:border-b-green-600 rounded-md relative mt-[-55px] z-3 shadow-md">
              <div className="absolute top-[60px] left-[-60px] w-3 h-3 bg-red-500 rounded-full animate-[pulse_1.5s_infinite]" />
              <div className="absolute top-[35px] left-[20px] w-3 h-3 bg-yellow-300 rounded-full animate-[pulse_1.8s_infinite]" />
              <div className="absolute top-[80px] right-[-50px] w-2.5 h-2.5 bg-blue-400 rounded-full animate-[pulse_2.2s_infinite]" />
            </div>

            {/* Tree Trunk */}
            <div className="w-12 h-14 bg-amber-800 dark:bg-amber-900 rounded-b-md shadow" />

            {/* Glow lights base */}
            <div className="absolute bottom-6 flex space-x-2">
              <span className="w-3.5 h-3.5 bg-red-500 rounded-full animate-[pulse_1s_infinite] shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
              <span className="w-3.5 h-3.5 bg-yellow-400 rounded-full animate-[pulse_1.5s_infinite] shadow-[0_0_8px_rgba(234,179,8,0.8)]" style={{ animationDelay: '0.3s' }} />
              <span className="w-3.5 h-3.5 bg-green-500 rounded-full animate-[pulse_1.2s_infinite] shadow-[0_0_8px_rgba(34,197,94,0.8)]" style={{ animationDelay: '0.6s' }} />
              <span className="w-3.5 h-3.5 bg-blue-500 rounded-full animate-[pulse_1.8s_infinite] shadow-[0_0_8px_rgba(59,130,246,0.8)]" style={{ animationDelay: '0.9s' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
