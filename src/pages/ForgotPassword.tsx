import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { InputField } from '../components/InputField';
import { useToast } from '../context/ToastContext';
import { validateEmail, getPasswordStrength } from '../utils/validators';
import { simulateHash } from '../utils/hash';
import type { User } from '../context/AuthContext';


export function ForgotPassword() {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Retrieves registered users
  const getUsers = (): User[] => {
    try {
      const saved = localStorage.getItem('users');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !validateEmail(email)) {
      setError('Please provide a valid email address.');
      return;
    }

    const users = getUsers();
    const found = users.some(u => u.email.toLowerCase() === email.toLowerCase().trim());

    if (!found) {
      setError('No account exists with this email address.');
      return;
    }

    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

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

    setTimeout(() => {
      const users = getUsers();
      const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase().trim());
      
      if (userIndex !== -1) {
        users[userIndex].password = simulateHash(password);
        localStorage.setItem('users', JSON.stringify(users));
        showToast('Password updated successfully 🎄', 'success');
        navigate('/login');
      } else {
        setError('An unexpected error occurred. Please try again.');
        setStep(1);
      }
      
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0c102b] via-[#1a1c4b] to-[#090b1e] px-4 py-12 relative overflow-hidden select-none">
      
      {/* Decorative stars */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-[20%] left-[15%] w-2 h-2 bg-white rounded-full twinkle-star" />
        <div className="absolute bottom-[35%] right-[10%] w-3 h-3 bg-yellow-200 rounded-full twinkle-star" style={{ animationDelay: '1.5s' }} />
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
            <span className="text-5xl block mb-2 filter drop-shadow-md">🔑</span>
            <h2 className="font-festive font-bold text-3xl text-white tracking-wide">
              Reset Password
            </h2>
            <p className="text-sm text-red-200/60 mt-1">
              {step === 1 ? 'Enter your registered email.' : 'Choose your new secure password.'}
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-red-950/40 text-red-400 border border-red-500/25 rounded-2xl text-xs font-semibold animate-shake">
              ⚠️ {error}
            </div>
          )}

          {step === 1 ? (
            /* STEP 1 FORM: EMAIL CHECK */
            <form onSubmit={handleStep1Submit} className="space-y-4">
              <InputField
                label="Registered Email"
                type="email"
                placeholder="e.g. surendra@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <button
                type="submit"
                className="w-full py-3.5 mt-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold rounded-2xl shadow-lg shadow-red-500/20 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer text-sm"
              >
                Find My Account 🔍
              </button>
            </form>
          ) : (
            /* STEP 2 FORM: NEW PASSWORD */
            <form onSubmit={handleStep2Submit} className="space-y-4">
              <div className="flex flex-col space-y-1">
                <InputField
                  label="New Password"
                  type="password"
                  placeholder="Min 6 chars (Capital, Number, Special)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
                {password && (
                  <div className="text-[10px] mt-1 text-slate-400">
                    Strength: {getPasswordStrength(password) === 'strong' ? 'Strong 🟢' : getPasswordStrength(password) === 'medium' ? 'Medium 🟡' : 'Weak 🔴'}
                  </div>
                )}
              </div>

              <InputField
                label="Confirm New Password"
                type="password"
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
              />

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
                    Updating Reindeer Registry...
                  </>
                ) : (
                  'Update Password 🎄'
                )}
              </button>
            </form>
          )}

          {/* Footer Back link */}
          <div className="text-center pt-2 border-t border-white/5">
            <Link
              to="/login"
              className="text-xs font-bold text-slate-400 hover:text-white transition-colors"
            >
              Cancel and go back
            </Link>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
