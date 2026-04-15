import React from 'react';
import { Handshake } from 'lucide-react';
import { collaborationRequests } from '../../data/collaborationRequests';
import { entrepreneurs, investors } from '../../data/users';

export const DealsPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold">Deals</h1>
        <p className="text-muted-foreground">Track your investment deals and collaborations</p>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <div className="divide-y divide-border">
          {collaborationRequests.map(req => {
            const inv = investors.find(i => i.id === req.investorId);
            const ent = entrepreneurs.find(e => e.id === req.entrepreneurId);
            const statusColors: Record<string, string> = {
              pending: 'bg-accent/10 text-accent-600',
              accepted: 'bg-success-50 text-success-700',
              rejected: 'bg-destructive/10 text-destructive',
            };
            return (
              <div key={req.id} className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Handshake className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{inv?.name} → {ent?.startupName}</p>
                  <p className="text-xs text-muted-foreground truncate">{req.message}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[req.status]}`}>
                  {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
