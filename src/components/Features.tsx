import { 
  Sparkles, MessageSquare, Smartphone, Download, 
  Globe, Copy, Share2, Heart 
} from 'lucide-react';

const FEATURES = [
  {
    icon: Sparkles,
    title: "Personalized Wishes",
    description: "Tailored around memories, activities, age categories, nicknames, and specific keywords.",
    color: "from-red-500 to-rose-600"
  },
  {
    icon: MessageSquare,
    title: "AI Generated Messages",
    description: "Powered by smart templates or real-time Gemini generation for endless unique outcomes.",
    color: "from-green-500 to-emerald-600"
  },
  {
    icon: Smartphone,
    title: "Social Media Captions",
    description: "Generate copy-paste ready updates for WhatsApp, Instagram, X (Twitter), and LinkedIn.",
    color: "from-blue-500 to-indigo-600"
  },
  {
    icon: Download,
    title: "Download Wish Cards",
    description: "Instantly draft wishes onto customized graphics cards and download as high-resolution PNGs.",
    color: "from-purple-500 to-violet-600"
  },
  {
    icon: Globe,
    title: "Multiple Languages",
    description: "Supports English, Telugu, Hindi, Tamil, Kannada, Malayalam, and billingual combos.",
    color: "from-amber-500 to-orange-600"
  },
  {
    icon: Copy,
    title: "Copy with One Click",
    description: "Easily copy individual categories or copy all generated wishes into a single master layout.",
    color: "from-cyan-500 to-teal-600"
  },
  {
    icon: Share2,
    title: "Share Anywhere",
    description: "Native Share API integrations alongside quick redirect buttons for WhatsApp, Telegram, and Email.",
    color: "from-pink-500 to-fuchsia-600"
  },
  {
    icon: Heart,
    title: "Save Favorites",
    description: "Keep your favorite drafts bookmarked in a clean, persistent local storage ledger.",
    color: "from-red-600 to-pink-500"
  }
];

export function Features() {
  return (
    <section className="py-12 sm:py-16 px-3 sm:px-4 max-w-7xl mx-auto z-20 transition-colors duration-300">
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
        <h2 className="font-festive font-bold text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white mb-4">
          Magical App Features
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
          Everything you need to spread perfect holiday cheer across the globe in a variety of styles.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {FEATURES.map((feat, index) => {
          const Icon = feat.icon;
          return (
            <div 
              key={index}
              className="glass relative rounded-2xl p-6 border border-white/20 dark:border-slate-800/80 shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300 flex flex-col items-center text-center group cursor-default"
            >
              {/* Floating color bubble behind icon on hover */}
              <div className={`absolute top-6 w-12 h-12 rounded-2xl bg-gradient-to-tr ${feat.color} opacity-10 group-hover:scale-150 transition-all duration-300`} />

              <div className={`relative p-3.5 rounded-2xl bg-gradient-to-tr ${feat.color} text-white shadow-md mb-5 group-hover:rotate-6 transition-all duration-300`}>
                <Icon className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 transition-colors">
                {feat.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {feat.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
