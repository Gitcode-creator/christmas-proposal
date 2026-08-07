import React, { createContext, useContext, useState, useEffect } from 'react';
import { simulateHash } from '../utils/hash';
import { clearUserData } from '../utils/storage';
import { useToast } from './ToastContext';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // stored hashed
  age?: string;
  gender?: string;
  profileImage?: string; // stored as base64
  createdAt: string;
}

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  profileImage?: string; // stored as base64
  loginTime: string;
}

interface AuthContextType {
  user: CurrentUser | null;
  isAuthenticated: boolean;
  isCheckingSession: boolean;
  login: (email: string, password: string, rememberMe: boolean) => Promise<boolean>;
  register: (name: string, email: string, password: string, age?: string, gender?: string) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string, newPassword: string) => Promise<boolean>;
  updateProfile: (name: string, age?: string, gender?: string, profileImage?: string) => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { showToast } = useToast();
  
  // Checking session spinner
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  // Restore current user session on start
  const [user, setUser] = useState<CurrentUser | null>(() => {
    const localUser = localStorage.getItem('currentUser');
    const sessionUser = sessionStorage.getItem('currentUser');
    try {
      if (localUser) return JSON.parse(localUser);
      if (sessionUser) return JSON.parse(sessionUser);
    } catch {
      localStorage.removeItem('currentUser');
      sessionStorage.removeItem('currentUser');
    }
    return null;
  });

  useEffect(() => {
    // Artificial 500ms delay to simulate session loading
    const timer = setTimeout(() => {
      setIsCheckingSession(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Lockout parameters: 5 failed attempts locks for 60 seconds
  const [failedAttempts, setFailedAttempts] = useState<Record<string, number>>({});
  const [lockoutUntil, setLockoutUntil] = useState<Record<string, number>>({});

  // Helper: Retrieve all registered users
  const getUsersList = (): User[] => {
    try {
      const saved = localStorage.getItem('users');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  };

  // Helper: Update users list
  const saveUsersList = (users: User[]) => {
    localStorage.setItem('users', JSON.stringify(users));
  };

  // 1. LOGIN
  const login = async (email: string, password: string, rememberMe: boolean): Promise<boolean> => {
    const emailLower = email.toLowerCase().trim();
    
    // Check lockouts
    const lockTime = lockoutUntil[emailLower] || 0;
    if (lockTime > Date.now()) {
      const remainingSeconds = Math.ceil((lockTime - Date.now()) / 1000);
      showToast(`❌ Account temporarily locked. Try again in ${remainingSeconds}s.`, 'error');
      return false;
    }

    const users = getUsersList();
    const foundUser = users.find(u => u.email.toLowerCase() === emailLower);

    if (!foundUser) {
      showToast('❌ Invalid email or password.', 'error');
      return false;
    }

    // Verify Password (hash check)
    const hashedAttempt = simulateHash(password);
    if (foundUser.password !== hashedAttempt) {
      const currentFailures = (failedAttempts[emailLower] || 0) + 1;
      setFailedAttempts(prev => ({ ...prev, [emailLower]: currentFailures }));

      if (currentFailures >= 5) {
        // Lock for 60s
        const lockExpiration = Date.now() + 60000;
        setLockoutUntil(prev => ({ ...prev, [emailLower]: lockExpiration }));
        setFailedAttempts(prev => ({ ...prev, [emailLower]: 0 }));
        showToast('❌ Too many failed attempts. Account locked for 60s.', 'error');
      } else {
        showToast(`❌ Invalid email or password. (${5 - currentFailures} attempts remaining)`, 'error');
      }
      return false;
    }

    // Success: Reset failures & create session
    setFailedAttempts(prev => ({ ...prev, [emailLower]: 0 }));
    
    const sessionUser: CurrentUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      profileImage: foundUser.profileImage,
      loginTime: new Date().toISOString()
    };

    setUser(sessionUser);

    if (rememberMe) {
      localStorage.setItem('currentUser', JSON.stringify(sessionUser));
    } else {
      sessionStorage.setItem('currentUser', JSON.stringify(sessionUser));
    }

    showToast(`🎄 Welcome back ${foundUser.name}!`, 'success');
    return true;
  };

  // 2. REGISTER
  const register = async (
    name: string, 
    email: string, 
    password: string, 
    age?: string, 
    gender?: string
  ): Promise<boolean> => {
    const users = getUsersList();
    const emailLower = email.toLowerCase().trim();

    if (users.some(u => u.email.toLowerCase() === emailLower)) {
      showToast('❌ Account already exists. Please login.', 'error');
      return false;
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: emailLower,
      password: simulateHash(password),
      age: age || undefined,
      gender: gender || 'Prefer not to say',
      createdAt: new Date().toISOString()
    };

    saveUsersList([...users, newUser]);
    showToast('🎄 Account created successfully!', 'success');
    return true;
  };

  // 3. LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    showToast('✨ You have been logged out.', 'info');
  };

  // 4. FORGOT PASSWORD
  const forgotPassword = async (email: string, newPassword: string): Promise<boolean> => {
    const users = getUsersList();
    const emailLower = email.toLowerCase().trim();
    const userIndex = users.findIndex(u => u.email.toLowerCase() === emailLower);

    if (userIndex === -1) {
      showToast('❌ Account not found with this email.', 'error');
      return false;
    }

    // Update password
    users[userIndex].password = simulateHash(newPassword);
    saveUsersList(users);
    
    showToast('🎄 Password updated successfully!', 'success');
    return true;
  };

  // 5. UPDATE PROFILE
  const updateProfile = async (
    name: string, 
    age?: string, 
    gender?: string, 
    profileImage?: string
  ): Promise<boolean> => {
    if (!user) return false;

    const users = getUsersList();
    const userIndex = users.findIndex(u => u.id === user.id);

    if (userIndex === -1) return false;

    // Update main database
    users[userIndex].name = name.trim();
    users[userIndex].age = age || undefined;
    users[userIndex].gender = gender || 'Prefer not to say';
    users[userIndex].profileImage = profileImage;
    saveUsersList(users);

    // Save to partitioned key profile_USERID
    if (profileImage) {
      localStorage.setItem(`profile_${user.id}`, JSON.stringify({
        id: user.id,
        profileImage
      }));
    } else {
      localStorage.removeItem(`profile_${user.id}`);
    }

    // Update session state
    const updatedSession: CurrentUser = {
      ...user,
      name: name.trim(),
      profileImage
    };
    
    setUser(updatedSession);

    // Sync session token
    if (localStorage.getItem('currentUser')) {
      localStorage.setItem('currentUser', JSON.stringify(updatedSession));
    } else {
      sessionStorage.setItem('currentUser', JSON.stringify(updatedSession));
    }

    showToast('✨ Profile updated successfully!', 'success');
    return true;
  };

  // 6. DELETE ACCOUNT
  const deleteAccount = async (): Promise<boolean> => {
    if (!user) return false;

    const users = getUsersList();
    const updatedUsers = users.filter(u => u.id !== user.id);
    saveUsersList(updatedUsers);

    // Clear user data partition keys
    clearUserData(user.id);

    // Clear session
    setUser(null);
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');

    showToast('✨ Account and associated data deleted permanently.', 'info');
    return true;
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isCheckingSession,
        login,
        register,
        logout,
        forgotPassword,
        updateProfile,
        deleteAccount
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
