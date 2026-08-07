import { useState } from 'react';
import { Trash2, Copy, Check, Share2, Calendar, Tag, User } from 'lucide-react';

export interface FavoriteItem {
  id: string;
  text: string;
  category: string;
  recipientName: string;
  timestamp: string;
}

interface FavoritesListProps {
  items: FavoriteItem[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

export function FavoritesList({ items, onRemove, onClearAll }: FavoritesListProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShare = async (text: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Favorite Christmas Wish',
          text: text,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(text);
      alert('Wish content copied for sharing!');
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 z-20 space-y-5 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-festive font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white">
            ❤️ Bookmarked Favorites
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Keep track of your absolute favorite greetings ready to be shared.
          </p>
        </div>

        {items.length > 0 && (
          <button
            onClick={() => {
              if (confirm('Clear all your favorited bookmarks?')) {
                onClearAll();
              }
            }}
            className="flex items-center px-4 py-2 bg-red-600/10 hover:bg-red-600/20 text-red-600 dark:text-red-400 dark:bg-red-950/20 dark:hover:bg-red-950/40 rounded-xl text-sm font-semibold transition-all cursor-pointer border border-red-500/10"
          >
            <Trash2 className="w-4 h-4 mr-1.5" />
            Clear All Favorites
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="glass rounded-3xl p-12 text-center border border-white/20 dark:border-slate-800/80 shadow-md">
          <span className="text-5xl block mb-4">❤️</span>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">No Bookmarked Wishes</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto text-sm leading-relaxed mb-6">
            Bookmark individual generated wishes on the results page to access them instantly from here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {items.map((item) => (
            <div 
              key={item.id}
              className="glass rounded-3xl p-6 border border-white/20 dark:border-slate-800/80 shadow-md flex flex-col justify-between min-h-[220px] relative overflow-hidden bg-gradient-to-br from-red-50/10 to-transparent dark:from-red-950/5"
            >
              {/* Card Ribbon tag */}
              <div className="flex justify-between items-start gap-4 mb-4">
                <div className="flex flex-wrap gap-1.5">
                  <span className="flex items-center text-[10px] bg-red-600/10 text-red-600 dark:text-red-400 font-semibold px-2 py-0.5 rounded-full uppercase">
                    <User className="w-3 h-3 mr-1" />
                    {item.recipientName}
                  </span>
                  <span className="flex items-center text-[10px] bg-green-600/10 text-green-600 dark:text-green-400 font-semibold px-2 py-0.5 rounded-full uppercase">
                    <Tag className="w-3 h-3 mr-1" />
                    {item.category}
                  </span>
                </div>

                <button
                  onClick={() => onRemove(item.id)}
                  className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors p-1 cursor-pointer"
                  title="Remove from Favorites"
                >
                  <Trash2 className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Wish content quotes */}
              <div className="mb-6">
                <p className="text-slate-700 dark:text-slate-200 italic font-serif leading-relaxed text-lg">
                  "{item.text}"
                </p>
              </div>

              {/* Actions panel */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-200/50 dark:border-slate-800/80">
                <span className="text-[10px] text-slate-400 font-mono flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(item.timestamp).toLocaleDateString()}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopy(item.text, item.id)}
                    className="flex items-center px-3 py-1.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded-lg text-xs transition-all cursor-pointer"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3 h-3 mr-1 text-green-600" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 mr-1" />
                        Copy
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleShare(item.text)}
                    className="flex items-center px-3 py-1.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded-lg text-xs transition-all cursor-pointer"
                  >
                    <Share2 className="w-3 h-3 mr-1" />
                    Share
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
