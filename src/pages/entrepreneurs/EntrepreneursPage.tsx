import React from 'react';
import { entrepreneurs } from '../../data/users';
import { Link } from 'react-router-dom';

export const EntrepreneursPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold">Find Startups</h1>
        <p className="text-muted-foreground">Discover innovative startups seeking investment</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {entrepreneurs.map(ent => (
          <Link key={ent.id} to={`/profile/entrepreneur/${ent.id}`}
            className="rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-elevated transition-all">
            <div className="flex items-center gap-3 mb-3">
              <img src={ent.avatarUrl} alt={ent.name} className="h-14 w-14 rounded-full object-cover" />
              <div>
                <p className="font-medium">{ent.name}</p>
                <p className="text-xs text-primary font-medium">{ent.startupName}</p>
              </div>
              {ent.isOnline && <span className="ml-auto h-2 w-2 rounded-full bg-success-500" />}
            </div>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{ent.pitchSummary}</p>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{ent.industry}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-success-50 text-success-700 font-medium">{ent.fundingNeeded}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
