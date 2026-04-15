import React from 'react';
import { Search } from 'lucide-react';
import { investors } from '../../data/users';
import { Link } from 'react-router-dom';

export const InvestorsPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold">Find Investors</h1>
        <p className="text-muted-foreground">Browse and connect with potential investors</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {investors.map(inv => (
          <Link key={inv.id} to={`/profile/investor/${inv.id}`}
            className="rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-elevated transition-all">
            <div className="flex items-center gap-3 mb-3">
              <img src={inv.avatarUrl} alt={inv.name} className="h-14 w-14 rounded-full object-cover" />
              <div>
                <p className="font-medium">{inv.name}</p>
                <p className="text-xs text-muted-foreground">{inv.investmentStage.join(', ')}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{inv.bio}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {inv.investmentInterests.map(i => (
                <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{i}</span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">{inv.minimumInvestment} - {inv.maximumInvestment}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
