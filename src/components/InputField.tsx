import { useState } from 'react';
import type { InputHTMLAttributes } from 'react';

import { Eye, EyeOff } from 'lucide-react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function InputField({ label, error, type = 'text', className = '', ...props }: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center">
        {label}
        {props.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative flex items-center">
        <input
          type={inputType}
          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 bg-white/50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white transition-all duration-200 ${
            error ? 'border-red-500 ring-2 ring-red-500/20' : ''
          } ${className}`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
            title={showPassword ? "Hide Password" : "Show Password"}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>

      {error && (
        <span className="text-xs text-red-500 font-semibold mt-1 animate-[slideDown_0.2s_ease-out]">
          {error}
        </span>
      )}
    </div>
  );
}
