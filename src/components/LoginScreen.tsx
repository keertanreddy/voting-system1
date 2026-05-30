'use client';

import { useState } from 'react';
import { User, Shield, ArrowRight, Lock } from 'lucide-react';

interface LoginScreenProps {
  onLoginVoter: (voterId: string) => void;
  onLoginAdmin: () => void;
}

export default function LoginScreen({ onLoginVoter, onLoginAdmin }: LoginScreenProps) {
  const [role, setRole] = useState<'voter' | 'admin'>('voter');
  const [voterId, setVoterId] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (role === 'voter') {
      if (!voterId.trim()) {
        setError('Please enter your Voter ID');
        return;
      }
      onLoginVoter(voterId.trim());
    } else {
      if (passcode !== 'admin123') {
        setError('Invalid admin passcode');
        return;
      }
      onLoginAdmin();
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center animate-in fade-in duration-700 zoom-in-95">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute top-[-50%] left-[-50%] w-[100%] h-[100%] bg-blue-500/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-50%] right-[-50%] w-[100%] h-[100%] bg-purple-500/20 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-white/10 rounded-2xl shadow-lg border border-white/5 backdrop-blur-md">
              <Shield className="w-10 h-10 text-blue-400" />
            </div>
          </div>

          <h2 className="text-3xl font-extrabold text-white text-center mb-2 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-gray-400 text-center mb-8 font-medium">
            Select your role to access the portal
          </p>

          <div className="flex p-1 bg-black/20 rounded-xl mb-8 border border-white/5 backdrop-blur-sm">
            <button
              onClick={() => { setRole('voter'); setError(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${role === 'voter' ? 'bg-blue-600/30 text-white shadow-md border border-blue-500/30' : 'text-gray-500 hover:text-gray-300'}`}
              type="button"
            >
              <User className="w-4 h-4" />
              Voter
            </button>
            <button
              onClick={() => { setRole('admin'); setError(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${role === 'admin' ? 'bg-purple-600/30 text-white shadow-md border border-purple-500/30' : 'text-gray-500 hover:text-gray-300'}`}
              type="button"
            >
              <Lock className="w-4 h-4" />
              Admin
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative group">
              {role === 'voter' ? (
                <>
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                  </div>
                  <input
                    type="text"
                    value={voterId}
                    onChange={(e) => setVoterId(e.target.value)}
                    placeholder="Enter Voter ID"
                    className="block w-full pl-12 pr-4 py-4 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-inner"
                  />
                </>
              ) : (
                <>
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                  </div>
                  <input
                    type="password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter Admin Passcode"
                    className="block w-full pl-12 pr-4 py-4 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all shadow-inner"
                  />
                </>
              )}
            </div>

            {error && (
              <p className="text-red-400 text-sm font-medium text-center animate-in fade-in slide-in-from-top-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              className={`w-full flex items-center justify-center gap-2 py-4 px-4 rounded-xl text-white font-bold text-lg transition-all duration-300 overflow-hidden relative group shadow-lg ${
                role === 'voter' 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/25' 
                  : 'bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 hover:shadow-purple-500/25'
              }`}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                Continue to Portal
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
