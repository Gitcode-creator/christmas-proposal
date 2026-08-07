import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import type { User } from '../context/AuthContext';
import { InputField } from '../components/InputField';
import { GenderSelect } from '../components/GenderSelect';
import { useToast } from '../context/ToastContext';
import { Calendar, Mail, UserCheck, AlertTriangle, Upload, Trash2 } from 'lucide-react';

export function Profile() {
  const { user, updateProfile, deleteAccount } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Prefer not to say');
  const [profileImage, setProfileImage] = useState('');
  
  // Extra states loaded from main database (like createdAt)
  const [dbUser, setDbUser] = useState<User | null>(null);

  // Load user data from localStorage users list
  useEffect(() => {
    if (!user) return;
    try {
      const saved = localStorage.getItem('users');
      const users: User[] = saved ? JSON.parse(saved) : [];
      const found = users.find(u => u.id === user.id);
      if (found) {
        setDbUser(found);
        setName(found.name || '');
        setAge(found.age || '');
        setGender(found.gender || 'Prefer not to say');
        setProfileImage(found.profileImage || '');
      }
    } catch {
      console.error('Failed to load user info from database');
    }
  }, [user, isEditing]);

  // Image Upload handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      showToast('❌ Invalid format. Supports PNG, JPG, JPEG, or WEBP only.', 'error');
      return;
    }

    // Validate size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      showToast('❌ Image size is too large (maximum limit 2MB).', 'error');
      return;
    }

    // Convert to Base64
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setProfileImage(base64);
      showToast('📸 Preview image loaded. Click Save to commit changes!', 'info');
    };
    reader.readAsDataURL(file);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('❌ Full Name cannot be empty.', 'error');
      return;
    }
    if (name.trim().length < 3) {
      showToast('❌ Name must be at least 3 characters.', 'error');
      return;
    }

    const success = await updateProfile(
      name, 
      age.trim() || undefined, 
      gender, 
      profileImage || undefined
    );

    if (success) {
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    const confirmation = confirm(
      "⚠️ WARNING: Are you absolutely sure you want to delete your account? This will permanently delete your account profile, wish history log, and favorite bookmarks. This action CANNOT be undone!"
    );
    if (confirmation) {
      const success = await deleteAccount();
      if (success) {
        navigate('/login');
      }
    }
  };

  // Generate Christmas Initial Avatar (e.g. S)
  const renderAvatar = () => {
    const initial = name ? name.trim().charAt(0).toUpperCase() : 'U';
    if (profileImage) {
      return (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative w-28 h-28 rounded-full border-4 border-red-600 shadow-lg overflow-hidden group"
        >
          <img 
            src={profileImage} 
            alt="Avatar" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </motion.div>
      );
    }
    return (
      <div className="relative flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-tr from-red-700 to-red-500 border-4 border-yellow-500 shadow-xl select-none">
        {/* Cute Santa Hat placed on top left of initials */}
        <span className="absolute top-[-10px] left-[50%] translate-x-[-50%] text-4xl filter drop-shadow">🎅</span>
        <span className="font-festive font-bold text-5xl text-yellow-100 mt-2 tracking-widest">
          {initial}
        </span>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 z-20 space-y-6 sm:space-y-8">
      
      {/* Title */}
      <div className="text-center">
        <h2 className="font-festive font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white">
          🎄 Account Dashboard
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm sm:text-base">
          Manage your personal details and partitioned local databases.
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start"
      >
        
        {/* Left Column: Avatar Card (Span 4) */}
        <div className="lg:col-span-4 glass rounded-3xl p-6 border border-white/20 dark:border-slate-800/80 shadow-lg flex flex-col items-center text-center space-y-4">
          {renderAvatar()}
          
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white truncate max-w-[200px]">
              {name}
            </h3>
            <span className="text-xs bg-red-600/10 text-red-600 dark:text-red-400 font-bold px-2.5 py-1 rounded-full uppercase mt-2 inline-block">
              {gender}
            </span>
          </div>

          <div className="w-full pt-4 border-t border-slate-200/50 dark:border-slate-800/80 text-left space-y-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2 text-slate-400" />
              <span className="truncate max-w-[180px]">{user?.email}</span>
            </div>
            {dbUser && (
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                <span>Joined: {new Date(dbUser.createdAt).toLocaleDateString()}</span>
              </div>
            )}
            <div className="flex items-center">
              <UserCheck className="w-4 h-4 mr-2 text-slate-400" />
              <span>Age: {age ? `${age} years` : 'Not specified'}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Editor Form or Display (Span 8) */}
        <div className="lg:col-span-8 glass rounded-3xl p-6 md:p-8 border border-white/20 dark:border-slate-800/80 shadow-xl">
          {!isEditing ? (
            /* VIEW PROFILE INFO */
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-200/50 dark:border-slate-800/80 pb-4">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Profile Details</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl text-xs transition-all cursor-pointer"
                >
                  Edit Profile ✏️
                </motion.button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-sm">
                <div>
                  <span className="text-xs text-slate-400 block font-semibold mb-1 uppercase tracking-wider">Full Name</span>
                  <span className="text-base text-slate-800 dark:text-white font-medium">{name}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-semibold mb-1 uppercase tracking-wider">Email Address</span>
                  <span className="text-base text-slate-400 dark:text-slate-500 font-medium select-all italic bg-slate-100/50 dark:bg-slate-800/50 px-2 py-1 rounded">
                    {user?.email} (Read-only)
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-semibold mb-1 uppercase tracking-wider">Age Group</span>
                  <span className="text-base text-slate-800 dark:text-white font-medium">{age ? `${age} years old` : 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-semibold mb-1 uppercase tracking-wider">Gender Preference</span>
                  <span className="text-base text-slate-800 dark:text-white font-medium">{gender}</span>
                </div>
                {dbUser && (
                  <div className="md:col-span-2">
                    <span className="text-xs text-slate-400 block font-semibold mb-1 uppercase tracking-wider">Account Creation Date</span>
                    <span className="text-base text-slate-400 dark:text-slate-500 font-medium italic">
                      {new Date(dbUser.createdAt).toUTCString()} (Read-only)
                    </span>
                  </div>
                )}
              </div>

              {/* Danger Zone */}
              <div className="pt-8 border-t border-red-500/20">
                <div className="flex items-center space-x-2 text-red-500 font-bold text-sm uppercase tracking-wider mb-3">
                  <AlertTriangle className="w-4.5 h-4.5" />
                  <span>Danger Zone</span>
                </div>
                
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                  Deleting your account removes your credentials from the users registry, plus cleans all saved wishes, downloads, and bookmarks from the local database.
                </p>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleDelete}
                  className="px-5 py-2.5 bg-red-600/10 hover:bg-red-600/25 border border-red-500/30 text-red-600 dark:text-red-400 dark:bg-red-950/20 dark:hover:bg-red-950/40 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Delete Account 🗑️
                </motion.button>
              </div>
            </div>
          ) : (
            /* EDIT PROFILE INFO */
            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-200/50 dark:border-slate-800/80 pb-4">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Edit Profile Details</h3>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold rounded-xl text-xs transition-all cursor-pointer"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl text-xs transition-all cursor-pointer"
                  >
                    Save Changes 💾
                  </motion.button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Profile Image Base64 Uploader */}
                <div className="flex flex-col md:col-span-2 p-4 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl bg-white/20 dark:bg-slate-900/30">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">
                    Profile Picture
                  </span>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Hidden Native File Input */}
                    <input
                      type="file"
                      id="profile-image-upload"
                      accept="image/png, image/jpeg, image/jpg, image/webp"
                      onChange={handleImageChange}
                      className="hidden"
                    />

                    {/* Styled Button Trigger */}
                    <label
                      htmlFor="profile-image-upload"
                      className="w-full sm:w-auto px-4 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-red-600/10"
                    >
                      <Upload className="w-4 h-4" />
                      Select Device Image
                    </label>

                    {profileImage && (
                      <button
                        type="button"
                        onClick={() => {
                          setProfileImage('');
                          showToast('🗑️ Profile picture reset. Initials avatar will be used.', 'info');
                        }}
                        className="w-full sm:w-auto px-4 py-3 border border-red-500/20 text-red-500 hover:bg-red-500/10 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove Picture
                      </button>
                    )}
                  </div>
                  
                  <span className="text-[10px] text-slate-400 mt-2">
                    Supports PNG, JPG, JPEG, WEBP files up to 2MB. Image will be converted to Base64 data and securely cached locally.
                  </span>
                </div>

                <InputField
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <InputField
                  label="Age"
                  type="number"
                  min="1"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 21"
                />

                <GenderSelect
                  value={gender}
                  onChange={setGender}
                />
              </div>
            </form>
          )}
        </div>

      </motion.div>
    </div>
  );
}
