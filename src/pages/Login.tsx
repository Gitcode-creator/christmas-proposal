import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { InputField } from '../components/InputField';
export function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Auto redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    // Artifical delay for smooth loading aesthetics
    setTimeout(async () => {
      const success = await login(email, password, rememberMe);
      setIsLoading(false);
      if (success) {
        navigate('/home');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0c102b] via-[#1a1c4b] to-[#090b1e] px-4 py-12 relative overflow-hidden select-none">
      
      {/* Decorative stars */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-[15%] left-[10%] w-2 h-2 bg-white rounded-full twinkle-star" />
        <div className="absolute top-[30%] right-[8%] w-3 h-3 bg-yellow-200 rounded-full twinkle-star" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-[20%] left-[12%] w-2.5 h-2.5 bg-yellow-300 rounded-full twinkle-star" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[40%] right-[15%] w-2 h-2 bg-white rounded-full twinkle-star" style={{ animationDelay: '1.5s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass rounded-3xl border border-white/20 p-8 shadow-2xl space-y-6 flex flex-col relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center">
            <span className="text-5xl block mb-2 filter drop-shadow-md">🎅</span>
            <h2 className="font-festive font-bold text-4xl text-white tracking-wide">
              Welcome Back!
            </h2>
            <p className="text-sm text-red-200/60 mt-1.5 font-medium leading-relaxed">
              Login and create magical Christmas wishes for your loved ones.
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-red-950/40 text-red-400 border border-red-500/25 rounded-2xl text-xs font-semibold animate-shake">
              ⚠️ {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Email Address"
              type="email"
              placeholder="e.g. surendra@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />

            <InputField
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />

            {/* Remember Me and Forgot Password links */}
            <div className="flex justify-between items-center text-xs pt-1">
              <label className="flex items-center text-slate-300 font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-900 focus:ring-red-500 focus:ring-offset-slate-900 text-red-600 mr-2 accent-red-600 cursor-pointer"
                  disabled={isLoading}
                />
                Remember Me
              </label>

              <Link
                to="/forgot-password"
                className="text-yellow-400 hover:text-yellow-300 font-bold transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 mt-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold rounded-2xl shadow-lg shadow-red-500/20 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center ${
                isLoading ? 'opacity-85 cursor-not-allowed scale-100' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Checking Chimney List...
                </>
              ) : (
                'Login 🎅'
              )}
            </button>
          </form>

          {/* Registration Trigger Footer */}
          <div className="text-center pt-2 border-t border-white/5">
            <span className="text-xs text-slate-400">Don't have an account? </span>
            <Link
              to="/register"
              className="text-xs font-bold text-green-400 hover:text-green-300 transition-colors"
            >
              Register Account 🎄
            </Link>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
