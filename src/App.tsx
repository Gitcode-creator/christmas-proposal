import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import { useAudio } from './hooks/useAudio';
import { Splash } from './components/Splash';
import { Navigation } from './components/Navigation';
import { Snowfall } from './components/Snowfall';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Features } from './components/Features';
import { WishForm } from './components/WishForm';
import { WishResults } from './components/WishResults';
import { CardGenerator } from './components/CardGenerator';
import { HistoryList } from './components/HistoryList';
import type { HistoryItem } from './components/HistoryList';
import { FavoritesList } from './components/FavoritesList';
import type { FavoriteItem } from './components/FavoritesList';
import { Extras } from './components/Extras';
import { generateWishes } from './utils/generator';
import type { UserInputs, WishesResult } from './utils/generator';
import { generateWishesWithGemini } from './utils/gemini';
import { getUserWishHistoryKey, getUserFavoritesKey } from './utils/storage';

// Auth Imports
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ChristmasLoader } from './components/ChristmasLoader';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { Profile } from './pages/Profile';
import { NotFound } from './pages/NotFound';

function MainAppShell() {
  const { theme, setTheme } = useTheme();
  const audio = useAudio();
  const { user, isCheckingSession } = useAuth();
  const navigate = useNavigate();

  // Splash screen (first site visit delay)
  const [splashActive, setSplashActive] = useState(true);

  // Transition screen when logging in
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Wish Generator states
  const [currentInputs, setCurrentInputs] = useState<UserInputs | null>(null);
  const [currentResults, setCurrentResults] = useState<WishesResult | null>(null);
  const [activeWishForCard, setActiveWishForCard] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultsActive, setResultsActive] = useState(false);
  const [cardActive, setCardActive] = useState(false);

  // User-partitioned database ledger states
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);

  // Trigger loading screen on Login -> Home path
  useEffect(() => {
    if (user) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [user?.id]);

  // Load partitioned user data
  useEffect(() => {
    if (user) {
      const historyKey = getUserWishHistoryKey(user.id);
      const favoritesKey = getUserFavoritesKey(user.id);

      try {
        const savedHist = localStorage.getItem(historyKey);
        setHistoryItems(savedHist ? JSON.parse(savedHist) : []);
      } catch {
        setHistoryItems([]);
      }

      try {
        const savedFavs = localStorage.getItem(favoritesKey);
        setFavoriteItems(savedFavs ? JSON.parse(savedFavs) : []);
      } catch {
        setFavoriteItems([]);
      }
    } else {
      setHistoryItems([]);
      setFavoriteItems([]);
    }
  }, [user]);

  // Sync partitioned user data
  useEffect(() => {
    if (user) {
      const historyKey = getUserWishHistoryKey(user.id);
      localStorage.setItem(historyKey, JSON.stringify(historyItems));
    }
  }, [historyItems, user]);

  useEffect(() => {
    if (user) {
      const favoritesKey = getUserFavoritesKey(user.id);
      localStorage.setItem(favoritesKey, JSON.stringify(favoriteItems));
    }
  }, [favoriteItems, user]);

  // Generate Wishes Submit Handler
  const handleGenerate = async (inputs: UserInputs, apiKey: string) => {
    setIsGenerating(true);
    try {
      let results: WishesResult;
      if (apiKey) {
        results = await generateWishesWithGemini(inputs, apiKey);
      } else {
        results = generateWishes(inputs);
      }

      setCurrentInputs(inputs);
      setCurrentResults(results);

      // Save to partitioned history
      const newItem: HistoryItem = {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        inputs,
        results,
        isFavorited: false
      };
      setHistoryItems(prev => [newItem, ...prev]);
      
      setResultsActive(true);
      setCardActive(false);
    } catch (err: any) {
      alert(`Generation Failed: ${err?.message || 'Unknown error'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  // History operations
  const handleDeleteHistory = (id: string) => {
    setHistoryItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearHistory = () => {
    setHistoryItems([]);
  };

  const handleToggleHistoryFavorite = (id: string) => {
    setHistoryItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, isFavorited: !item.isFavorited };
      }
      return item;
    }));
  };

  const handleLoadHistoryItem = (item: HistoryItem) => {
    setCurrentInputs(item.inputs);
    setCurrentResults(item.results);
    setResultsActive(true);
    setCardActive(false);
  };

  // Favorites operations
  const handleToggleWishFavorite = (text: string, category: string) => {
    const isAlreadyFavorited = favoriteItems.some(fav => fav.text === text);
    if (isAlreadyFavorited) {
      setFavoriteItems(prev => prev.filter(fav => fav.text !== text));
    } else {
      const newFavorite: FavoriteItem = {
        id: crypto.randomUUID(),
        text,
        category,
        recipientName: currentInputs?.name || 'Loved One',
        timestamp: new Date().toISOString()
      };
      setFavoriteItems(prev => [newFavorite, ...prev]);
    }
  };

  const isWishFavorited = (text: string) => {
    return favoriteItems.some(fav => fav.text === text);
  };

  const handleRemoveFavorite = (id: string) => {
    setFavoriteItems(prev => prev.filter(fav => fav.id !== id));
  };

  const handleClearFavorites = () => {
    setFavoriteItems([]);
  };

  const handleOpenCardEditor = (wishText: string) => {
    setActiveWishForCard(wishText);
    setCardActive(true);
  };

  // Loading overrides
  if (isCheckingSession) {
    return <ChristmasLoader message="Verifying session security..." />;
  }

  if (isTransitioning) {
    return <ChristmasLoader message="Preparing Winter Wonderland..." />;
  }

  return (
    <div className="relative min-h-screen pb-16 overflow-x-hidden flex flex-col justify-between">
      {/* 3-second splash screen on first load */}
      {splashActive && <Splash onComplete={() => setSplashActive(false)} />}

      <Snowfall />

      <Navigation theme={theme} setTheme={setTheme} audio={audio} />

      <main className="flex-grow pt-6 sm:pt-8 pb-10 sm:pb-12 px-0">
        <Routes>
          {/* Auth Route anchors */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Root Redirect handler */}
          <Route path="/" element={<Navigate to={user ? "/home" : "/login"} replace />} />

          {/* Secured Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <div className="space-y-10 sm:space-y-16">
                  <Hero
                    onGenerateClick={() => navigate('/generate')}
                    onExploreFeaturesClick={() => {
                      const element = document.getElementById('about-anchor');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  />
                  <div id="about-anchor">
                    <About />
                  </div>
                  <Features />
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/generate"
            element={
              <ProtectedRoute>
                {cardActive ? (
                  <CardGenerator
                    wishText={activeWishForCard}
                    userName={currentInputs?.name || 'Loved One'}
                    onBack={() => setCardActive(false)}
                  />
                ) : resultsActive && currentResults && currentInputs ? (
                  <WishResults
                    results={currentResults}
                    inputs={currentInputs}
                    onGenerateAgain={() => setResultsActive(false)}
                    onFavoriteToggle={handleToggleWishFavorite}
                    isFavorited={isWishFavorited}
                    onOpenCardEditor={handleOpenCardEditor}
                  />
                ) : (
                  <WishForm onSubmit={handleGenerate} isLoading={isGenerating} />
                )}
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <HistoryList
                  items={historyItems}
                  onDelete={handleDeleteHistory}
                  onClearAll={handleClearHistory}
                  onToggleFavorite={handleToggleHistoryFavorite}
                  onLoadItem={handleLoadHistoryItem}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <FavoritesList
                  items={favoriteItems}
                  onRemove={handleRemoveFavorite}
                  onClearAll={handleClearFavorites}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/extras"
            element={
              <ProtectedRoute>
                <Extras />
              </ProtectedRoute>
            }
          />

          {/* 404 Route */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>

      <footer className="text-center text-xs py-6 sm:py-8 border-t border-slate-200/50 dark:border-slate-800/80 text-slate-400 font-mono mt-8 sm:mt-12 transition-all px-4">
        <p>🎄 WishMagic AI Christmas Wishes Generator 🌟</p>
        <p className="mt-1 opacity-70">Spread warmth, love, and laughter globally.</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <MainAppShell />
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
