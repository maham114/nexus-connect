import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, PieChart, Search, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { entrepreneurs } from '../../data/users';
import { getRequestsFromInvestor } from '../../data/collaborationRequests';
import { mockMeetings, mockTransactions } from '../../data/mockData';

export const InvestorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  if (!user) return null;

  const sentRequests = getRequestsFromInvestor(user.id);
  const filtered = entrepreneurs.filter(e =>
    searchQuery === '' ||
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.startupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalInvested = mockTransactions
    .filter(t => t.status === 'completed' && t.type === 'funding')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold">Welcome, {user.name}</h1>
          <p className="text-muted-foreground">Discover and connect with promising startups</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Proposals Sent', value: sentRequests.length, icon: Users, color: 'text-primary' },
          { label: 'Active Deals', value: sentRequests.filter(r => r.status === 'accepted').length, icon: PieChart, color: 'text-secondary-500' },
          { label: 'Total Invested', value: `$${(totalInvested / 1000).toFixed(0)}K`, icon: TrendingUp, color: 'text-success-500' },
          { label: 'Meetings', value: mockMeetings.length, icon: Users, color: 'text-accent-500' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center justify-between mb-3">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-heading font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h3 className="text-lg font-heading font-semibold">Discover Startups</h3>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text" placeholder="Search startups..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 rounded-lg border border-border bg-muted/50 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((ent) => {
            const requested = sentRequests.some(r => r.entrepreneurId === ent.id);
            return (
              <div key={ent.id} className="rounded-xl border border-border p-4 hover:shadow-elevated transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <img src={ent.avatarUrl} alt={ent.name} className="h-12 w-12 rounded-full object-cover" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{ent.name}</p>
                    <p className="text-xs text-primary font-medium">{ent.startupName}</p>
                  </div>
                  {ent.isOnline && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-success-500 animate-pulse-soft" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{ent.pitchSummary}</p>
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{ent.industry}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-success-50 text-success-700 font-medium">{ent.fundingNeeded}</span>
                </div>
                <div className="flex gap-2">
                  <Link to={`/profile/entrepreneur/${ent.id}`}
                    className="flex-1 text-center py-1.5 text-xs rounded-lg border border-border hover:bg-muted transition-colors font-medium">
                    View Profile
                  </Link>
                  <button
                    disabled={requested}
                    className={`flex-1 text-center py-1.5 text-xs rounded-lg font-medium transition-colors ${
                      requested
                        ? 'bg-muted text-muted-foreground cursor-default'
                        : 'gradient-primary text-primary-foreground hover:opacity-90'
                    }`}
                  >
                    {requested ? 'Requested' : 'Connect'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
