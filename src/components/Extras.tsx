import { useState } from 'react';
import { 
  SANTA_FACT, CHRISTMAS_JOKE, CHRISTMAS_TRIVIA, 
  DAILY_QUOTE, RANDOM_RECIPE
} from '../utils/generator';
import { 
  BookOpen, Smile, Award, Coffee, 
  Film, HelpCircle
} from 'lucide-react';


export function Extras() {
  const [joke, setJoke] = useState(CHRISTMAS_JOKE);
  const [fact, setFact] = useState(SANTA_FACT);
  const [trivia, setTrivia] = useState(CHRISTMAS_TRIVIA);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quote, setQuote] = useState(DAILY_QUOTE);
  const [recipe, setRecipe] = useState(RANDOM_RECIPE);

  const rollJoke = () => {
    setJoke(CHRISTMAS_JOKE());
  };

  const rollFact = () => {
    setFact(SANTA_FACT());
  };

  const rollTrivia = () => {
    setTrivia(CHRISTMAS_TRIVIA());
    setShowAnswer(false);
  };

  const rollQuote = () => {
    setQuote(DAILY_QUOTE());
  };

  const rollRecipe = () => {
    setRecipe(RANDOM_RECIPE());
  };

  return (
    <section className="py-10 sm:py-12 px-3 sm:px-4 max-w-7xl mx-auto z-20 transition-colors duration-300">
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <h2 className="font-festive font-bold text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white mb-3">
          🎄 Festive Fun Zone 🎁
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
          Dive into the holiday spirit with daily trivia, jokes, facts, and cozy recipes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
        
        {/* Widget 1: Christmas Quote */}
        <div className="glass rounded-3xl p-6 border border-white/20 dark:border-slate-800/80 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 mb-4 font-bold">
              <BookOpen className="w-5 h-5" />
              <span>Daily Holiday Quote</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 italic font-serif text-lg leading-relaxed mb-6">
              {quote}
            </p>
          </div>
          <button 
            onClick={rollQuote}
            className="w-full py-2.5 bg-red-600/10 hover:bg-red-600/20 text-red-600 dark:text-red-400 dark:bg-red-950/20 dark:hover:bg-red-950/40 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer"
          >
            Roll New Quote
          </button>
        </div>

        {/* Widget 2: Christmas Joke */}
        <div className="glass rounded-3xl p-6 border border-white/20 dark:border-slate-800/80 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-green-600 dark:text-green-400 mb-4 font-bold">
              <Smile className="w-5 h-5" />
              <span>Holiday Joke</span>
            </div>
            <div className="space-y-4 mb-6">
              <p className="text-slate-800 dark:text-white font-semibold text-lg">
                {joke.q}
              </p>
              <p className="text-green-600 dark:text-green-400 font-bold font-sans text-xl animate-[pulse_2s_infinite]">
                {joke.a}
              </p>
            </div>
          </div>
          <button 
            onClick={rollJoke}
            className="w-full py-2.5 bg-green-600/10 hover:bg-green-600/20 text-green-600 dark:text-green-400 dark:bg-green-950/20 dark:hover:bg-green-950/40 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer"
          >
            Roll Another Joke
          </button>
        </div>

        {/* Widget 3: Trivia Card */}
        <div className="glass rounded-3xl p-6 border border-white/20 dark:border-slate-800/80 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-yellow-600 dark:text-yellow-500 mb-4 font-bold">
              <HelpCircle className="w-5 h-5" />
              <span>Holiday Trivia Challenge</span>
            </div>
            <div className="space-y-4 mb-6">
              <p className="text-slate-800 dark:text-white font-medium text-lg">
                Q: {trivia.q}
              </p>
              {showAnswer ? (
                <p className="text-yellow-600 dark:text-yellow-400 font-bold text-lg animate-[fadeIn_0.5s_ease-out]">
                  A: {trivia.a}
                </p>
              ) : (
                <button
                  onClick={() => setShowAnswer(true)}
                  className="px-4 py-1.5 bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 font-semibold rounded-lg text-sm cursor-pointer hover:bg-yellow-500/30 transition-all"
                >
                  Reveal Answer
                </button>
              )}
            </div>
          </div>
          <button 
            onClick={rollTrivia}
            className="w-full py-2.5 bg-yellow-600/10 hover:bg-yellow-600/20 text-yellow-600 dark:text-yellow-500 dark:bg-yellow-950/20 dark:hover:bg-yellow-950/40 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer"
          >
            Next Question
          </button>
        </div>

        {/* Widget 4: Santa Facts */}
        <div className="glass rounded-3xl p-6 border border-white/20 dark:border-slate-800/80 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 mb-4 font-bold">
              <Award className="w-5 h-5" />
              <span>Did You Know? (Santa Fact)</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base mb-6">
              {fact}
            </p>
          </div>
          <button 
            onClick={rollFact}
            className="w-full py-2.5 bg-purple-600/10 hover:bg-purple-600/20 text-purple-600 dark:text-purple-400 dark:bg-purple-950/20 dark:hover:bg-purple-950/40 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer"
          >
            Roll Next Fact
          </button>
        </div>

        {/* Widget 5: Recipe Suggestions */}
        <div className="glass rounded-3xl p-6 border border-white/20 dark:border-slate-800/80 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-500 mb-4 font-bold">
              <Coffee className="w-5 h-5" />
              <span>Christmas Kitchen Recipe</span>
            </div>
            <div className="space-y-2 mb-6">
              <h4 className="text-lg font-bold text-slate-800 dark:text-white">
                {recipe.title}
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {recipe.desc}
              </p>
            </div>
          </div>
          <button 
            onClick={rollRecipe}
            className="w-full py-2.5 bg-amber-600/10 hover:bg-amber-600/20 text-amber-600 dark:text-amber-400 dark:bg-amber-950/20 dark:hover:bg-amber-950/40 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer"
          >
            Get Another Recipe
          </button>
        </div>

        {/* Widget 6: Festive Media Recommendations (Static/Rich Display) */}
        <div className="glass rounded-3xl p-6 border border-white/20 dark:border-slate-800/80 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 mb-4 font-bold">
              <Film className="w-5 h-5" />
              <span>Holiday Media Picks</span>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <span className="text-2xl mt-0.5">🎬</span>
                <div>
                  <h5 className="font-bold text-sm text-slate-800 dark:text-white">Home Alone</h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Essential classic movie full of laughter & nostalgic traps.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="text-2xl mt-0.5">🎵</span>
                <div>
                  <h5 className="font-bold text-sm text-slate-800 dark:text-white">All I Want for Christmas Is You</h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Mariah Carey's timeless holiday pop anthem.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full text-center py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-mono text-slate-400 select-none">
            🎄 Santa Approved Media 🦌
          </div>
        </div>

      </div>
    </section>
  );
}
