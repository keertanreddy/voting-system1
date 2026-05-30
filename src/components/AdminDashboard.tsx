'use client';

import useSWR from 'swr';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Loader2, TrendingUp, Users } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];

export default function AdminDashboard() {
  const { data: results, error, isLoading } = useSWR('/api/votes', fetcher, { refreshInterval: 2000 });

  if (isLoading && !results) {
    return <div className="flex justify-center p-12"><Loader2 className="animate-spin w-8 h-8 text-purple-500" /></div>;
  }
  if (error) return <div className="text-red-500 text-center bg-red-500/10 p-4 rounded-xl">Failed to load live results.</div>;

  const totalVotes = results?.reduce((acc: number, curr: any) => acc + curr.votes, 0) || 0;
  
  let leadingCandidate = 'Waiting for votes...';
  if (totalVotes > 0) {
    const sorted = [...results].sort((a, b) => b.votes - a.votes);
    leadingCandidate = sorted[0].name;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-6 shadow-lg">
          <div className="p-4 bg-purple-500/20 rounded-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <Users className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            <p className="text-gray-400 font-medium mb-1">Total Votes Cast</p>
            <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200 tracking-tight">{totalVotes}</h3>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-6 shadow-lg">
          <div className="p-4 bg-blue-500/20 rounded-xl border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <TrendingUp className="w-8 h-8 text-blue-400" />
          </div>
          <div className="min-w-0">
            <p className="text-gray-400 font-medium mb-1">Leading Candidate</p>
            <h3 className="text-2xl font-bold text-white truncate">{leadingCandidate}</h3>
          </div>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm shadow-xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
          <h3 className="text-xl font-bold text-white">Live Vote Distribution</h3>
        </div>
        
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={results} margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
              <XAxis 
                dataKey="name" 
                stroke="#6b7280" 
                tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 500 }} 
                axisLine={{ stroke: '#374151' }}
                tickLine={false}
                dy={10}
              />
              <YAxis 
                stroke="#6b7280" 
                tick={{ fill: '#9ca3af', fontSize: 12 }} 
                axisLine={{ stroke: '#374151' }}
                tickLine={false}
                allowDecimals={false} 
              />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ 
                  backgroundColor: 'rgba(17, 24, 39, 0.95)', 
                  borderColor: 'rgba(255,255,255,0.1)', 
                  borderRadius: '16px', 
                  color: '#fff',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                  padding: '12px 20px'
                }}
                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
              />
              <Bar dataKey="votes" radius={[8, 8, 0, 0]} animationDuration={1000}>
                {results?.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
