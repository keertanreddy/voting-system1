'use client';

import { useState } from 'react';
import VoterDashboard from '@/components/VoterDashboard';
import AdminDashboard from '@/components/AdminDashboard';
import LoginScreen from '@/components/LoginScreen';
import { Vote, LogOut } from 'lucide-react';

export default function Home() {
  const [authStatus, setAuthStatus] = useState<'login' | 'voter' | 'admin'>('login');
  const [voterId, setVoterId] = useState<string>('');

  const handleLoginVoter = (id: string) => {
    setVoterId(id);
    setAuthStatus('voter');
  };

  const handleLoginAdmin = () => {
    setAuthStatus('admin');
  };

  const handleLogout = () => {
    setAuthStatus('login');
    setVoterId('');
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-slate-50 selection:bg-blue-500/30 overflow-x-hidden">
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        <header className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)]">
              <Vote className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 tracking-tight">
                NexusVote
              </h1>
              <p className="text-sm text-gray-400 font-medium mt-1">Secure Election System</p>
            </div>
          </div>
          
          {authStatus !== 'login' && (
            <div className="flex p-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md shadow-xl">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 text-gray-400 hover:text-white hover:bg-white/5 hover:shadow-md"
              >
                <LogOut className="w-4 h-4" />
                Logout {authStatus === 'voter' ? `(${voterId})` : '(Admin)'}
              </button>
            </div>
          )}
        </header>

        <div className="transition-all duration-500 ease-in-out">
          {authStatus === 'login' && (
            <LoginScreen onLoginVoter={handleLoginVoter} onLoginAdmin={handleLoginAdmin} />
          )}
          {authStatus === 'voter' && <VoterDashboard voterId={voterId} />}
          {authStatus === 'admin' && <AdminDashboard />}
        </div>
      </div>
    </main>
  );
}
