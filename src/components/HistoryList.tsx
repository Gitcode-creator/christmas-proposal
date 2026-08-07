import { useState } from 'react';
import { 
  Search, Trash2, Heart, Copy, Check, Calendar, 
  User, Filter, X, ChevronDown, ChevronUp, ExternalLink
} from 'lucide-react';
import type { WishesResult, UserInputs } from '../utils/generator';


export interface HistoryItem {
  id: string;
  timestamp: string;
  inputs: UserInputs;
  results: WishesResult;
  isFavorited: boolean;
}

interface HistoryListProps {
  items: HistoryItem[];
  onDelete: (id: string) => void;
  onClearAll: () => void;
  onToggleFavorite: (id: string) => void;
  onLoadItem: (item: HistoryItem) => void;
}

export function HistoryList({ 
  items, 
  onDelete, 
  onClearAll, 
  onToggleFavorite, 
  onLoadItem 
}: HistoryListProps) {
  const [search, setSearch] = useState('');
  const [relationFilter, setRelationFilter] = useState('');
  const [moodFilter, setMoodFilter] = useState('');
  const [langFilter, setLangFilter] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name'>('newest');

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedWishId, setCopiedWishId] = useState<string | null>(null);

  const relationships = ['Friend', 'Best Friend', 'Brother', 'Sister', 'Mother', 'Father', 'Grandmother', 'Grandfather', 'Teacher', 'Student', 'Colleague', 'Boss', 'Neighbor', 'Family', 'Son', 'Daughter', 'Husband', 'Wife', 'Boyfriend', 'Girlfriend', 'Crush', 'Other'];
  const languages = ['English', 'Telugu', 'Hindi', 'Tamil', 'Kannada', 'Malayalam', 'English + Telugu'];
  const moods = ['Funny', 'Cute', 'Emotional', 'Inspirational', 'Religious', 'Professional', 'Romantic', 'Classic', 'Short', 'Long'];

  // Filtering logic
  const filteredItems = items.filter(item => {
    const matchSearch = item.inputs.name.toLowerCase().includes(search.toLowerCase()) ||
                        (item.inputs.nickname && item.inputs.nickname.toLowerCase().includes(search.toLowerCase())) ||
                        (item.inputs.keywords && item.inputs.keywords.toLowerCase().includes(search.toLowerCase()));
    const matchRelation = relationFilter === '' || item.inputs.relationship === relationFilter;
    const matchMood = moodFilter === '' || item.inputs.mood === moodFilter;
    const matchLang = langFilter === '' || item.inputs.language === langFilter;

    return matchSearch && matchRelation && matchMood && matchLang;
  });

  // Sorting logic
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
    if (sortBy === 'oldest') {
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    }
    if (sortBy === 'name') {
      return a.inputs.name.localeCompare(b.inputs.name);
    }
    return 0;
  });

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedWishId(id);
    setTimeout(() => setCopiedWishId(null), 2000);
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const clearFilters = () => {
    setSearch('');
    setRelationFilter('');
    setMoodFilter('');
    setLangFilter('');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 z-20 space-y-5 sm:space-y-6">
      
      {/* Header and clear buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-festive font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white">
            📜 Saved Wishes Archive
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Search, sort, filter, and recall previously generated Christmas wish cards.
          </p>
        </div>

        {items.length > 0 && (
          <button
            onClick={() => {
              if (confirm('Are you sure you want to clear your entire saved history?')) {
                onClearAll();
              }
            }}
            className="flex items-center px-4 py-2.5 bg-red-600/10 hover:bg-red-600/20 text-red-600 dark:text-red-400 dark:bg-red-950/20 dark:hover:bg-red-950/40 rounded-xl text-sm font-semibold transition-all cursor-pointer border border-red-500/10"
          >
            <Trash2 className="w-4 h-4 mr-1.5" />
            Clear All History
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="glass rounded-3xl p-12 text-center border border-white/20 dark:border-slate-800/80 shadow-md">
          <span className="text-5xl block mb-4">📜</span>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">No Saved History Yet</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto text-sm leading-relaxed mb-6">
            When you create wishes using the Generator page, they will automatically be archived here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Filtering Dashboard */}
          <div className="glass rounded-3xl p-6 border border-white/20 dark:border-slate-800/80 shadow-md space-y-4">
            <div className="flex items-center text-sm font-bold text-slate-700 dark:text-slate-300 gap-1.5">
              <Filter className="w-4 h-4" />
              <span>Filters & Sorting</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, key..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm border rounded-xl bg-white/50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>

              {/* Relationship Filter */}
              <select
                value={relationFilter}
                onChange={(e) => setRelationFilter(e.target.value)}
                className="px-3 py-2.5 text-sm border rounded-xl bg-white/50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none cursor-pointer"
              >
                <option value="">All Relationships</option>
                {relationships.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>

              {/* Mood Filter */}
              <select
                value={moodFilter}
                onChange={(e) => setMoodFilter(e.target.value)}
                className="px-3 py-2.5 text-sm border rounded-xl bg-white/50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none cursor-pointer"
              >
                <option value="">All Moods</option>
                {moods.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>

              {/* Language Filter */}
              <select
                value={langFilter}
                onChange={(e) => setLangFilter(e.target.value)}
                className="px-3 py-2.5 text-sm border rounded-xl bg-white/50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none cursor-pointer"
              >
                <option value="">All Languages</option>
                {languages.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>

              {/* Sort selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2.5 text-sm border rounded-xl bg-white/50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none cursor-pointer"
              >
                <option value="newest">Sort by: Newest</option>
                <option value="oldest">Sort by: Oldest</option>
                <option value="name">Sort by: Name A-Z</option>
              </select>
            </div>

            {(search || relationFilter || moodFilter || langFilter) && (
              <div className="flex justify-between items-center pt-2 text-xs">
                <span className="text-slate-500 dark:text-slate-400">
                  Found {sortedItems.length} matching entries
                </span>
                <button
                  onClick={clearFilters}
                  className="flex items-center text-red-600 dark:text-red-400 font-semibold cursor-pointer"
                >
                  <X className="w-3.5 h-3.5 mr-1" />
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 gap-4">
            {sortedItems.length === 0 ? (
              <div className="p-8 text-center text-slate-500 dark:text-slate-400 glass rounded-3xl">
                No matching entries match your filter settings.
              </div>
            ) : (
              sortedItems.map((item) => {
                const isExpanded = expandedId === item.id;
                return (
                  <div 
                    key={item.id}
                    className="glass rounded-3xl border border-white/20 dark:border-slate-800/80 shadow-md transition-all duration-300 p-5 md:p-6 flex flex-col gap-4 relative overflow-hidden"
                  >
                    {/* Top bar header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center text-slate-800 dark:text-white font-bold text-lg">
                          <User className="w-4 h-4 mr-1 text-red-600" />
                          {item.inputs.name} {item.inputs.nickname && `(${item.inputs.nickname})`}
                        </div>
                        <span className="text-xs bg-red-600/10 text-red-600 dark:text-red-400 font-semibold px-2.5 py-1 rounded-full uppercase">
                          {item.inputs.relationship}
                        </span>
                        <span className="text-xs bg-green-600/10 text-green-600 dark:text-green-400 font-semibold px-2.5 py-1 rounded-full uppercase">
                          {item.inputs.mood}
                        </span>
                        <span className="text-xs bg-blue-600/10 text-blue-600 dark:text-blue-400 font-semibold px-2.5 py-1 rounded-full uppercase">
                          {item.inputs.language}
                        </span>
                      </div>

                      <div className="flex items-center space-x-1 self-end md:self-auto">
                        <button
                          onClick={() => onToggleFavorite(item.id)}
                          className={`p-2 rounded-full cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                            item.isFavorited ? 'text-red-500 bg-red-100/10' : 'text-slate-400'
                          }`}
                          title="Save to Favorites"
                        >
                          <Heart className="w-5 h-5 fill-current" />
                        </button>
                        <button
                          onClick={() => onLoadItem(item)}
                          className="p-2 rounded-full cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                          title="Load Wishes Page"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => onDelete(item.id)}
                          className="p-2 rounded-full cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-red-600 transition-colors"
                          title="Delete Entry"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Preview Wish Snippet */}
                    <div className="p-4 bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                      <p className="text-slate-700 dark:text-slate-300 italic text-base leading-relaxed">
                        "{item.results.main}"
                      </p>
                    </div>

                    {/* Expand/Collapse logic */}
                    {isExpanded && (
                      <div className="pt-4 border-t border-slate-200/40 dark:border-slate-800/50 grid grid-cols-1 md:grid-cols-2 gap-4 animate-[fadeIn_0.2s_ease-out]">
                        {[
                          { label: '❤️ Emotional Wish', text: item.results.emotional, id: 'emo' },
                          { label: '😂 Funny Wish', text: item.results.funny, id: 'fun' },
                          { label: '✨ Inspirational Wish', text: item.results.inspirational, id: 'insp' },
                          { label: '🙏 Religious Wish', text: item.results.religious, id: 'rel' },
                          { label: '📱 WhatsApp Status', text: item.results.whatsapp, id: 'wa' },
                          { label: '💼 LinkedIn Post', text: item.results.linkedin, id: 'li' },
                        ].map((chunk) => (
                          <div 
                            key={chunk.id}
                            className="p-3 bg-white/20 dark:bg-slate-950/20 rounded-xl border border-slate-100/50 dark:border-slate-900/50 flex flex-col justify-between"
                          >
                            <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest mb-1.5 block">
                              {chunk.label}
                            </span>
                            <p className="text-xs text-slate-600 dark:text-slate-400 italic mb-3">"{chunk.text}"</p>
                            <button
                              onClick={() => handleCopyText(chunk.text, `${item.id}-${chunk.id}`)}
                              className="self-end flex items-center text-[10px] font-bold text-slate-500 hover:text-red-600 cursor-pointer"
                            >
                              {copiedWishId === `${item.id}-${chunk.id}` ? (
                                <>
                                  <Check className="w-3 h-3 mr-1 text-green-600" />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3 mr-1" />
                                  Copy
                                </>
                              )}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Footer / expandable trigger */}
                    <div className="flex flex-wrap justify-between items-center text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/80 gap-2">
                      <div className="flex items-center gap-1 font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(item.timestamp)}
                      </div>

                      <button
                        onClick={() => setExpandedId(isExpanded ? null : item.id)}
                        className="flex items-center text-red-600 dark:text-red-400 font-semibold cursor-pointer"
                      >
                        {isExpanded ? (
                          <>
                            Collapse Details
                            <ChevronUp className="w-4 h-4 ml-1" />
                          </>
                        ) : (
                          <>
                            Expand 15 Wishes
                            <ChevronDown className="w-4 h-4 ml-1" />
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
