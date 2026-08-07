import React, { useState } from 'react';
import { Sparkles, Key, Info, HelpCircle } from 'lucide-react';
import type { UserInputs } from '../utils/generator';


interface WishFormProps {
  onSubmit: (inputs: UserInputs, apiKey: string) => void;
  isLoading: boolean;
}

export function WishForm({ onSubmit, isLoading }: WishFormProps) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Prefer not to say');
  const [relationship, setRelationship] = useState('Friend');
  const [language, setLanguage] = useState('English');
  const [mood, setMood] = useState('Classic');
  
  // Optionals
  const [nickname, setNickname] = useState('');
  const [occupation, setOccupation] = useState('');
  const [country, setCountry] = useState('');
  const [favoriteMemory, setFavoriteMemory] = useState('');
  const [favoriteActivity, setFavoriteActivity] = useState('');
  const [favoriteCharacter, setFavoriteCharacter] = useState('');
  const [favoriteColor, setFavoriteColor] = useState('');
  const [keywords, setKeywords] = useState('');

  // AI Power Mode Key
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('gemini_api_key') || '';
  });
  const [showKeyInput, setShowKeyInput] = useState(false);

  // Validations
  const [error, setError] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!name.trim()) {
      setError('Please provide a Full Name.');
      return;
    }
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      setError('Please provide a valid Age (between 1 and 120).');
      return;
    }

    // Save key
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey.trim());
    } else {
      localStorage.removeItem('gemini_api_key');
    }

    const inputs: UserInputs = {
      name: name.trim(),
      age: ageNum,
      gender,
      relationship,
      language,
      mood,
      nickname: nickname.trim() || undefined,
      occupation: occupation.trim() || undefined,
      country: country.trim() || undefined,
      favoriteMemory: favoriteMemory.trim() || undefined,
      favoriteActivity: favoriteActivity.trim() || undefined,
      favoriteCharacter: favoriteCharacter.trim() || undefined,
      favoriteColor: favoriteColor.trim() || undefined,
      keywords: keywords.trim() || undefined
    };

    onSubmit(inputs, apiKey.trim());
  };

  const getAgeClassification = (val: string) => {
    const num = parseInt(val);
    if (isNaN(num)) return '';
    if (num <= 12) return '👶 Child';
    if (num <= 19) return '🧑 Teen';
    if (num <= 35) return '🧑 Young Adult';
    if (num <= 55) return '🧑 Adult';
    return '👵 Senior';
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 z-20">
      <form onSubmit={handleFormSubmit} className="glass rounded-3xl p-4 sm:p-6 md:p-10 border border-white/20 dark:border-slate-800/80 shadow-2xl space-y-6 sm:space-y-8">
        
        {/* Header and API mode toggle */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200/50 dark:border-slate-800/80 pb-6 gap-4">
          <div>
            <h2 className="font-festive font-bold text-3xl text-slate-900 dark:text-white flex items-center">
              <span>🎁 Wish Customizer</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Provide detail to generate uniquely personal greetings.
            </p>
          </div>

          <div className="flex flex-col items-end w-full md:w-auto">
            <button
              type="button"
              onClick={() => setShowKeyInput(!showKeyInput)}
              className="flex items-center text-xs font-semibold px-3.5 py-2 rounded-xl bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 cursor-pointer transition-colors border border-yellow-500/20"
            >
              <Key className="w-3.5 h-3.5 mr-1.5" />
              {apiKey ? 'AI Power Mode Enabled' : 'Unlock AI Power Mode (Optional)'}
            </button>
            
            {showKeyInput && (
              <div className="mt-2 w-full md:w-64 animate-[fadeIn_0.2s_ease-out]">
                <input
                  type="password"
                  placeholder="Enter Gemini API Key..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full text-xs px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600 bg-white/70 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Keys are stored in local storage and never leave your browser. Leave empty to use local generation.
                </span>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-100/80 dark:bg-red-950/40 text-red-700 dark:text-red-400 rounded-2xl text-sm font-semibold border border-red-200/50 dark:border-red-900/50 animate-shake">
            ⚠️ {error}
          </div>
        )}

        {/* Section 1: Required */}
        <div className="space-y-6">
          <h3 className="text-base font-bold text-red-600 dark:text-red-500 uppercase tracking-widest border-l-4 border-red-600 pl-2">
            Required Settings
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            
            {/* Full Name */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center">
                Full Name <span className="text-red-600 ml-1">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Bangaram"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 bg-white/50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white"
              />
            </div>

            {/* Age */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center">
                Age <span className="text-red-600 ml-1">*</span>
                {age && (
                  <span className="text-xs text-red-600 dark:text-red-400 ml-2 font-mono">
                    ({getAgeClassification(age)})
                  </span>
                )}
              </label>
              <input
                type="number"
                required
                min="1"
                max="120"
                placeholder="e.g. 23"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 bg-white/50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white"
              />
            </div>

            {/* Gender */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Gender <span className="text-red-600 ml-1">*</span>
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 bg-white/50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white cursor-pointer"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            {/* Relationship */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Relationship <span className="text-red-600 ml-1">*</span>
              </label>
              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 bg-white/50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white cursor-pointer"
              >
                {['Friend', 'Best Friend', 'Brother', 'Sister', 'Mother', 'Father', 'Grandmother', 'Grandfather', 'Teacher', 'Student', 'Colleague', 'Boss', 'Neighbor', 'Family', 'Son', 'Daughter', 'Husband', 'Wife', 'Boyfriend', 'Girlfriend', 'Crush', 'Other'].map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* Language */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Language <span className="text-red-600 ml-1">*</span>
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 bg-white/50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white cursor-pointer"
              >
                {['English', 'Telugu', 'Hindi', 'Tamil', 'Kannada', 'Malayalam', 'English + Telugu'].map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            {/* Mood */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center">
                Mood <span className="text-red-600 ml-1">*</span>
                <span className="ml-1 text-slate-400 cursor-help" title="Select the tone of the wishes.">
                  <Info className="w-3.5 h-3.5" />
                </span>
              </label>
              <select
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 bg-white/50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white cursor-pointer"
              >
                {['Funny', 'Cute', 'Emotional', 'Inspirational', 'Religious', 'Professional', 'Romantic', 'Classic', 'Short', 'Long'].map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Section 2: Optional */}
        <div className="space-y-6 pt-4 border-t border-slate-200/50 dark:border-slate-800/80">
          <h3 className="text-base font-bold text-green-600 dark:text-green-500 uppercase tracking-widest border-l-4 border-green-600 pl-2">
            Optional Sparkles (Personalized Context)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Nickname */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Nickname</label>
              <input
                type="text"
                placeholder="e.g. Nanna"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 bg-white/50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white"
              />
            </div>

            {/* Occupation */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Occupation</label>
              <input
                type="text"
                placeholder="e.g. Engineer, Student"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 bg-white/50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white"
              />
            </div>

            {/* Country */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Country</label>
              <input
                type="text"
                placeholder="e.g. India, USA"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 bg-white/50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white"
              />
            </div>

            {/* Favorite Color */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Favorite Color</label>
              <input
                type="text"
                placeholder="e.g. Gold, Blue"
                value={favoriteColor}
                onChange={(e) => setFavoriteColor(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 bg-white/50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white"
              />
            </div>

            {/* Favorite Christmas Character */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Favorite Character</label>
              <input
                type="text"
                placeholder="e.g. Rudolph, Grinch"
                value={favoriteCharacter}
                onChange={(e) => setFavoriteCharacter(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 bg-white/50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white"
              />
            </div>

            {/* Message Keywords */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center">
                Custom Keywords
                <span className="ml-1 text-slate-400 cursor-help" title="Comma separated keywords (e.g. warmth, blessings, laughs).">
                  <HelpCircle className="w-3.5 h-3.5" />
                </span>
              </label>
              <input
                type="text"
                placeholder="e.g. peace, warm hugs, joy"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 bg-white/50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white"
              />
            </div>

            {/* Favorite Memory */}
            <div className="flex flex-col md:col-span-1">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Favorite Memory</label>
              <input
                type="text"
                placeholder="e.g. last year's snowball fight"
                value={favoriteMemory}
                onChange={(e) => setFavoriteMemory(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 bg-white/50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white"
              />
            </div>

            {/* Favorite Christmas Activity */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Favorite Activity</label>
              <input
                type="text"
                placeholder="e.g. baking cinnamon rolls under the fireplace"
                value={favoriteActivity}
                onChange={(e) => setFavoriteActivity(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 bg-white/50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white"
              />
            </div>

          </div>
        </div>

        {/* Submit */}
        <div className="pt-6 text-center border-t border-slate-200/50 dark:border-slate-800/80">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-10 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold rounded-2xl shadow-lg shadow-red-500/25 cursor-pointer transform hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 flex items-center justify-center mx-auto sm:max-w-sm md:max-w-none ${
              isLoading ? 'opacity-80 cursor-not-allowed scale-100' : ''
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Weaving Magic Wishes...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2 animate-[pulse_1.5s_infinite]" />
                Generate AI Christmas Wishes
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
