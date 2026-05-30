'use client';

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { CheckCircle, AlertCircle, Loader2, UserCircle2 } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface VoterDashboardProps {
  voterId: string;
}

export default function VoterDashboard({ voterId }: VoterDashboardProps) {
  const { data: candidates, error, isLoading } = useSWR('/api/candidates', fetcher);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (localStorage.getItem(`has_voted_${voterId}`)) {
      setStatus('success');
    }
  }, [voterId]);

  const handleVote = async () => {
    if (!selectedId || !voterId) return;
    
    setStatus('submitting');
    try {
      const res = await fetch('/api/votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidateId: selectedId, voterId })
      });
      
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || 'Failed to vote');
      }
      
      localStorage.setItem(`has_voted_${voterId}`, 'true');
      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message);
    }
  };

  if (isLoading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin w-8 h-8 text-blue-500" /></div>;
  if (error) return <div className="text-red-500 text-center bg-red-500/10 p-4 rounded-xl">Failed to load candidates.</div>;

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-green-500/10 border border-green-500/20 rounded-2xl animate-in fade-in zoom-in duration-500">
        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Vote Recorded</h2>
        <p className="text-gray-400 text-center max-w-md">Thank you for participating! Your secure vote has been strictly recorded. To prevent duplicate voting, this action cannot be undone.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {candidates?.map((candidate: any) => (
          <div 
            key={candidate.id}
            onClick={() => setSelectedId(candidate.id)}
            className={`relative p-8 rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden group flex flex-col items-center
              ${selectedId === candidate.id 
                ? 'bg-blue-600/20 border-2 border-blue-500 scale-105 shadow-[0_0_30px_rgba(59,130,246,0.3)]' 
                : 'bg-white/5 border-2 border-white/10 hover:border-white/20 hover:bg-white/10 hover:scale-105'
              }
            `}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-24 h-24 rounded-full mb-6 bg-white/5 border-4 border-white/10 flex items-center justify-center shadow-lg group-hover:bg-white/10 transition-colors">
              <UserCircle2 className="w-12 h-12 text-gray-400 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-2xl font-bold text-center text-white mb-3">{candidate.name}</h3>
            <p className="text-sm text-gray-400 text-center leading-relaxed flex-grow">{candidate.description}</p>
            
            {selectedId === candidate.id && (
              <div className="absolute top-4 right-4 bg-blue-500 rounded-full p-1 shadow-lg shadow-blue-500/50 animate-in zoom-in">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-3 text-red-400 bg-red-400/10 p-4 rounded-xl border border-red-400/20 max-w-md mx-auto">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">{errorMessage}</p>
        </div>
      )}

      <div className="flex justify-center mt-12">
        <button
          onClick={handleVote}
          disabled={!selectedId || status === 'submitting'}
          className="group relative px-8 py-4 font-bold text-white rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] overflow-hidden scale-100 active:scale-95"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative flex items-center gap-2">
            {status === 'submitting' ? <Loader2 className="animate-spin w-5 h-5" /> : null}
            Submit Secure Vote
          </span>
        </button>
      </div>
    </div>
  );
}
