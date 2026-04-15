import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Bell, Calendar, TrendingUp, PlusCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { CollaborationRequest } from '../../types';
import { getRequestsForEntrepreneur } from '../../data/collaborationRequests';
import { investors } from '../../data/users';
import { mockMeetings } from '../../data/mockData';

export const EntrepreneurDashboard: React.FC = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<CollaborationRequest[]>([]);

  useEffect(() => {
    if (user) setRequests(getRequestsForEntrepreneur(user.id));
  }, [user]);

  if (!user) return null;
  const pendingRequests = requests.filter(r => r.status === 'pending');
  const upcomingMeetings = mockMeetings.filter(m => m.status === 'confirmed');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold">Welcome, {user.name}</h1>
          <p className="text-muted-foreground">Here's what's happening with your startup today</p>
        </div>
        <Link to="/investors"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
          <PlusCircle className="h-4 w-4" /> Find Investors
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Pending Requests', value: pendingRequests.length, icon: Bell, color: 'text-accent-500' },
          { label: 'Total Investors', value: investors.length, icon: Users, color: 'text-primary' },
          { label: 'Upcoming Meetings', value: upcomingMeetings.length, icon: Calendar, color: 'text-secondary-500' },
          { label: 'Profile Views', value: '142', icon: TrendingUp, color: 'text-success-500' },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h3 className="text-lg font-heading font-semibold mb-4">Collaboration Requests</h3>
          {pendingRequests.length === 0 ? (
            <p className="text-muted-foreground text-sm">No pending requests</p>
          ) : (
            <div className="space-y-3">
              {pendingRequests.map((req) => {
                const inv = investors.find(i => i.id === req.investorId);
                return (
                  <div key={req.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                    <img src={inv?.avatarUrl} alt={inv?.name} className="h-10 w-10 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{inv?.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{req.message}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent-600 font-medium">Pending</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h3 className="text-lg font-heading font-semibold mb-4">Upcoming Meetings</h3>
          {upcomingMeetings.length === 0 ? (
            <p className="text-muted-foreground text-sm">No upcoming meetings</p>
          ) : (
            <div className="space-y-3">
              {upcomingMeetings.map((meeting) => (
                <div key={meeting.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{meeting.title}</p>
                    <p className="text-xs text-muted-foreground">{meeting.date} at {meeting.time}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-success-50 text-success-700 font-medium">Confirmed</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <h3 className="text-lg font-heading font-semibold mb-4">Recommended Investors</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {investors.slice(0, 3).map((inv) => (
            <Link key={inv.id} to={`/profile/investor/${inv.id}`}
              className="flex items-center gap-3 p-4 rounded-lg border border-border hover:shadow-elevated transition-all">
              <img src={inv.avatarUrl} alt={inv.name} className="h-12 w-12 rounded-full object-cover" />
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{inv.name}</p>
                <p className="text-xs text-muted-foreground truncate">{inv.investmentInterests.join(', ')}</p>
                <p className="text-xs text-primary font-medium">{inv.minimumInvestment} - {inv.maximumInvestment}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
