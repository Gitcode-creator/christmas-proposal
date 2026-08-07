import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { InputField } from '../components/InputField';
import { validateEmail, getPasswordStrength } from '../utils/validators';
import { GenderSelect } from '../components/GenderSelect';

interface RegisterDraft {
  name: string;
  email: string;
  age: string;
  gender: string;
}

export function Register() {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Prefer not to say');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // 1. Auto redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  // 2. Restore Draft from sessionStorage
  useEffect(() => {
    try {
      const savedDraft = sessionStorage.getItem('registerDraft');
      if (savedDraft) {
        const draft: RegisterDraft = JSON.parse(savedDraft);
        setName(draft.name || '');
        setEmail(draft.email || '');
        setAge(draft.age || '');
        setGender(draft.gender || 'Prefer not to say');
      }
    } catch (err) {
      console.error('Failed to load draft:', err);
    }
  }, []);

  // 3. Save Draft on changes
  useEffect(() => {
    const draft: RegisterDraft = { name, email, age, gender };
    sessionStorage.setItem('registerDraft', JSON.stringify(draft));
  }, [name, email, age, gender]);

  const getStrengthIndicator = () => {
    const strength = getPasswordStrength(password);
    if (strength === 'strong') return <span className="text-green-400 font-bold">Strong 🟢</span>;
    if (strength === 'medium') return <span className="text-yellow-400 font-bold">Medium 🟡</span>;
    return <span className="text-red-400 font-bold">Weak 🔴</span>;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validations
    if (name.trim().length < 3) {
      setError('Full Name must be at least 3 characters.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email format.');
      return;
    }

    const strength = getPasswordStrength(password);
    if (strength === 'weak') {
      setError('Password must be at least 6 characters, containing 1 capital letter and 1 digit.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Confirm Password does not match Password.');
      return;
    }

    setIsLoading(true);
    setTimeout(async () => {
      const success = await register(
        name, 
        email, 
        password, 
        age.trim() || undefined, 
        gender
      );
      setIsLoading(false);

      if (success) {
        // Clear draft on successful signup
        sessionStorage.removeItem('registerDraft');
        navigate('/login');
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0c102b] via-[#1a1c4b] to-[#090b1e] px-3 sm:px-4 py-8 sm:py-12 relative overflow-hidden select-none">
      
      {/* Star animation background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-[10%] right-[20%] w-2.5 h-2.5 bg-yellow-200 rounded-full twinkle-star" />
        <div className="absolute bottom-[25%] left-[8%] w-2 h-2 bg-white rounded-full twinkle-star" style={{ animationDelay: '1.2s' }} />
        <div className="absolute top-[45%] left-[25%] w-3 h-3 bg-yellow-300 rounded-full twinkle-star" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-[10%] right-[30%] w-2 h-2 bg-white rounded-full twinkle-star" style={{ animationDelay: '2s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <div className="glass rounded-3xl border border-white/20 p-5 sm:p-6 md:p-8 shadow-2xl space-y-5 sm:space-y-6 flex flex-col relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center">
            <span className="text-5xl block mb-2 filter drop-shadow-md">🎄</span>
            <h2 className="font-festive font-bold text-3xl md:text-4xl text-white tracking-wide">
              Create Account
            </h2>
            <p className="text-sm text-red-200/60 mt-1">
              Join us to create, save, and export magical greetings.
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-red-950/40 text-red-400 border border-red-500/25 rounded-2xl text-xs font-semibold animate-shake">
              ⚠️ {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Grid 1: Required inputs */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-red-400 uppercase tracking-widest border-l-4 border-red-500 pl-2">
                Required Settings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Full Name"
                  placeholder="e.g. Surendra"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                />

                <InputField
                  label="Email Address"
                  type="email"
                  placeholder="e.g. surendra@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />

                <div className="flex flex-col space-y-1">
                  <InputField
                    label="Password"
                    type="password"
                    placeholder="Min 6 chars (Capital, Number, Special)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  {password && (
                    <div className="text-[10px] mt-1 text-slate-400">
                      Strength: {getStrengthIndicator()}
                    </div>
                  )}
                </div>

                <InputField
                  label="Confirm Password"
                  type="password"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Grid 2: Optional inputs */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <h3 className="text-xs font-bold text-green-400 uppercase tracking-widest border-l-4 border-green-500 pl-2">
                Optional Sparkles
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Age"
                  type="number"
                  min="1"
                  max="120"
                  placeholder="e.g. 21"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  disabled={isLoading}
                />

                <GenderSelect
                  value={gender}
                  onChange={setGender}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Submit */}
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
                  Hanging Stockings...
                </>
              ) : (
                'Register Account 🎄'
              )}
            </button>
          </form>

          {/* Footer link to Login */}
          <div className="text-center pt-2 border-t border-white/5">
            <span className="text-xs text-slate-400">Already registered? </span>
            <Link
              to="/login"
              className="text-xs font-bold text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              Login 🎅
            </Link>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
