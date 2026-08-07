import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

interface GenderSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const OPTIONS = ['Male', 'Female', 'Other', 'Prefer not to say'];

export function GenderSelect({ value, onChange, disabled = false }: GenderSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col w-full relative" ref={containerRef}>
      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
        Gender
      </label>

      {/* Dropdown trigger button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 border rounded-xl bg-white/40 dark:bg-slate-900/60 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-left font-medium"
      >
        <span className="truncate">{value || 'Select Gender'}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Options Dropdown list */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full mt-1.5 z-30 glass border border-white/20 dark:border-slate-800/80 rounded-xl shadow-xl overflow-hidden py-1 backdrop-blur-md bg-white/80 dark:bg-slate-900/90"
          >
            {OPTIONS.map((opt) => {
              const isSelected = value === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelect(opt)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-all duration-150 text-left cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-800/50 ${
                    isSelected
                      ? 'bg-green-600 hover:bg-green-600 text-white font-bold dark:bg-green-700'
                      : 'text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <span>{opt}</span>
                  {isSelected && <Check className="w-4 h-4 text-white" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
