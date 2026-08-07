import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  Music, Volume2, VolumeX, Moon, Sun, Laptop, 
  Menu, X, Heart, History, Sparkles, Home, Gift, User, LogOut
} from 'lucide-react';
import type { Theme } from '../hooks/useTheme';
import { useAuth } from '../context/AuthContext';

interface NavigationProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  audio: {
    isPlaying: boolean;
    volume: number;
    isMuted: boolean;
    togglePlay: () => void;
    setVolume: (v: number) => void;
    setIsMuted: (m: boolean) => void;
  };
}

export function Navigation({ theme, setTheme, audio }: NavigationProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const tabs = [
    { path: '/home', label: 'Home', icon: Home },
    { path: '/generate', label: 'Generator', icon: Sparkles },
    { path: '/history', label: 'History', icon: History },
    { path: '/favorites', label: 'Favorites', icon: Heart },
    { path: '/extras', label: 'Festive Fun', icon: Gift },
  ];

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full glass border-b border-white/10 dark:border-slate-800/80 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand Title */}
          <Link to={isAuthenticated ? "/home" : "/login"} className="flex items-center gap-1 sm:gap-2">
            <span className="text-xl sm:text-2xl animate-bounce">🎄</span>
            <span className="font-festive font-bold text-lg sm:text-2xl tracking-wider text-red-600 dark:text-red-500 drop-shadow-[0_2px_4px_rgba(239,68,68,0.2)]">
              WishMagic AI
            </span>
          </Link>

          {/* Desktop Nav Items (Only visible if logged in) */}
          {isAuthenticated && (
            <nav className="hidden md:flex space-x-1 lg:space-x-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <NavLink
                    key={tab.path}
                    to={tab.path}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-red-600 text-white shadow-md shadow-red-500/20 scale-105'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-white/10 dark:hover:bg-slate-800/80 hover:text-red-600 dark:hover:text-red-400'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 mr-1.5" />
                    {tab.label}
                  </NavLink>
                );
              })}
            </nav>
          )}

          {/* Audio, Theme & Profile Controls (Right Hand Side) */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Background Music synthesizer */}
            <div className="relative flex items-center">
              <button
                onClick={audio.togglePlay}
                onMouseEnter={() => setShowVolumeSlider(true)}
                className={`p-2 rounded-full cursor-pointer transition-all duration-300 ${
                  audio.isPlaying 
                    ? 'bg-green-600 text-white animate-[pulse_2s_infinite]' 
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
                title={audio.isPlaying ? "Pause Christmas Chime" : "Play Christmas Chime"}
              >
                <Music className={`w-5 h-5 ${audio.isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
              </button>

              {audio.isPlaying && (
                <div 
                  className={`flex items-center ml-2 bg-slate-100 dark:bg-slate-800/90 rounded-full px-2 py-1 border border-slate-200 dark:border-slate-700 transition-all duration-300 ${
                    showVolumeSlider ? 'opacity-100 w-32' : 'opacity-0 w-0 overflow-hidden pointer-events-none'
                  }`}
                  onMouseLeave={() => setShowVolumeSlider(false)}
                >
                  <button
                    onClick={() => audio.setIsMuted(!audio.isMuted)}
                    className="text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 cursor-pointer"
                  >
                    {audio.isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={audio.isMuted ? 0 : audio.volume}
                    onChange={(e) => {
                      audio.setVolume(parseFloat(e.target.value));
                      if (audio.isMuted) audio.setIsMuted(false);
                    }}
                    className="w-20 h-1 mx-1.5 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                </div>
              )}
            </div>

            {/* Theme Selectors */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full p-0.5">
              {[(['light', 'dark', 'system'] as Theme[]).map((t) => {
                const isActive = theme === t;
                return (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`p-1.5 rounded-full cursor-pointer transition-all duration-150 ${
                      isActive
                        ? 'bg-white dark:bg-slate-700 text-red-600 dark:text-red-400 shadow-sm'
                        : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                    }`}
                    title={`${t.charAt(0).toUpperCase() + t.slice(1)} Mode`}
                  >
                    {t === 'light' && <Sun className="w-4 h-4" />}
                    {t === 'dark' && <Moon className="w-4 h-4" />}
                    {t === 'system' && <Laptop className="w-4 h-4" />}
                  </button>
                );
              })]}
            </div>

            {/* Logged in info (Welcome, Profile, Logout) OR Logged Out buttons */}
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-2 border-l border-slate-200 dark:border-slate-700 pl-3">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 max-w-[120px] truncate">
                  Hi, {user.name} 🎄
                </span>
                
                {/* Profile Link */}
                <Link
                  to="/profile"
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
                  title="Profile Settings"
                >
                  <User className="w-4.5 h-4.5" />
                </Link>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full hover:bg-red-500/10 text-red-500 transition-colors cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-4.5 h-4.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 pl-2">
                <Link
                  to="/login"
                  className="px-4 py-2 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-xl"
                >
                  Login 🎅
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white text-sm font-bold rounded-xl shadow-md"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Hamburger Menu (Mobile) */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={audio.togglePlay}
              className={`p-2 rounded-full cursor-pointer ${
                audio.isPlaying ? 'bg-green-600 text-white animate-pulse' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {audio.isMuted || !audio.isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-white/10 dark:border-slate-800/80 px-3 pt-2 pb-4 space-y-1 animate-[slideDown_0.2s_ease-out]">
          {/* Mobile user info when authenticated */}
          {isAuthenticated && user && (
            <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-white/5 dark:bg-slate-800/30 rounded-xl">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-bold text-sm overflow-hidden flex-shrink-0">
                {user.profileImage ? (
                  <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user.name.charAt(0).toUpperCase()
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{user.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
              </div>
            </div>
          )}
          {isAuthenticated && tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <NavLink
                key={tab.path}
                to={tab.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center w-full px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-red-600 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-white/10 dark:hover:bg-slate-800/80'
                  }`
                }
              >
                <Icon className="w-5 h-5 mr-3" />
                {tab.label}
              </NavLink>
            );
          })}

          {isAuthenticated ? (
            <>
              <NavLink
                to="/profile"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center w-full px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-red-600 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-white/10 dark:hover:bg-slate-800/80'
                  }`
                }
              >
                <User className="w-5 h-5 mr-3" />
                Profile Settings
              </NavLink>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 rounded-xl text-base font-semibold text-red-500 hover:bg-red-500/10 cursor-pointer"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-xl"
              >
                Login 🎅
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white text-sm font-bold rounded-xl shadow-md"
              >
                Register
              </Link>
            </div>
          )}

          <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center px-4">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Theme</span>
            <div className="flex space-x-1 bg-slate-100 dark:bg-slate-800 rounded-full p-0.5 border border-slate-200 dark:border-slate-700">
              {(['light', 'dark', 'system'] as Theme[]).map((t) => {
                const isActive = theme === t;
                return (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`p-2 rounded-full cursor-pointer ${
                      isActive
                        ? 'bg-white dark:bg-slate-700 text-red-600 dark:text-red-400 shadow-sm'
                        : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                    }`}
                  >
                    {t === 'light' && <Sun className="w-4 h-4" />}
                    {t === 'dark' && <Moon className="w-4 h-4" />}
                    {t === 'system' && <Laptop className="w-4 h-4" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
