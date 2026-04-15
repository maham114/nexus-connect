import React from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Calendar, Users as UsersIcon, Globe, Mail, TrendingUp } from 'lucide-react';
import { entrepreneurs, investors } from '../../data/users';

export const ProfilePage: React.FC = () => {
  const { role, id } = useParams<{ role: string; id: string }>();

  if (role === 'entrepreneur') {
    const ent = entrepreneurs.find(e => e.id === id);
    if (!ent) return <div className="p-8 text-center text-muted-foreground">Profile not found</div>;

    return (
      <div className="space-y-6 animate-fade-in max-w-3xl">
        <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
          <div className="h-32 gradient-primary" />
          <div className="p-6 -mt-12">
            <div className="flex items-end gap-4">
              <img src={ent.avatarUrl} alt={ent.name}
                className="h-24 w-24 rounded-xl object-cover border-4 border-card shadow-elevated" />
              <div className="mb-1">
                <h1 className="text-xl font-heading font-bold">{ent.name}</h1>
                <p className="text-primary font-medium">{ent.startupName}</p>
              </div>
              {ent.isOnline && (
                <span className="mb-2 ml-auto text-xs px-2 py-1 rounded-full bg-success-50 text-success-700 font-medium">Online</span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: MapPin, label: 'Location', value: ent.location },
            { icon: Calendar, label: 'Founded', value: String(ent.foundedYear) },
            { icon: UsersIcon, label: 'Team Size', value: `${ent.teamSize} members` },
            { icon: TrendingUp, label: 'Funding Needed', value: ent.fundingNeeded },
          ].map(item => (
            <div key={item.label} className="rounded-xl border border-border bg-card p-4 shadow-card flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-sm font-medium">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h3 className="text-base font-heading font-semibold mb-2">About</h3>
          <p className="text-sm text-muted-foreground">{ent.bio}</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h3 className="text-base font-heading font-semibold mb-2">Pitch Summary</h3>
          <p className="text-sm text-muted-foreground">{ent.pitchSummary}</p>
          <span className="inline-block mt-3 text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">{ent.industry}</span>
        </div>
      </div>
    );
  }

  // Investor profile
  const inv = investors.find(i => i.id === id);
  if (!inv) return <div className="p-8 text-center text-muted-foreground">Profile not found</div>;

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-secondary-600 to-secondary-500" />
        <div className="p-6 -mt-12">
          <div className="flex items-end gap-4">
            <img src={inv.avatarUrl} alt={inv.name}
              className="h-24 w-24 rounded-xl object-cover border-4 border-card shadow-elevated" />
            <div className="mb-1">
              <h1 className="text-xl font-heading font-bold">{inv.name}</h1>
              <p className="text-secondary-600 font-medium">Investor</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-4 shadow-card text-center">
          <p className="text-2xl font-heading font-bold">{inv.totalInvestments}</p>
          <p className="text-xs text-muted-foreground">Total Investments</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-card text-center">
          <p className="text-2xl font-heading font-bold">{inv.minimumInvestment}</p>
          <p className="text-xs text-muted-foreground">Min Investment</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-card text-center">
          <p className="text-2xl font-heading font-bold">{inv.maximumInvestment}</p>
          <p className="text-xs text-muted-foreground">Max Investment</p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <h3 className="text-base font-heading font-semibold mb-2">About</h3>
        <p className="text-sm text-muted-foreground">{inv.bio}</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <h3 className="text-base font-heading font-semibold mb-3">Investment Interests</h3>
        <div className="flex gap-2 flex-wrap">
          {inv.investmentInterests.map(interest => (
            <span key={interest} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">{interest}</span>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <h3 className="text-base font-heading font-semibold mb-3">Portfolio Companies</h3>
        <div className="flex gap-2 flex-wrap">
          {inv.portfolioCompanies.map(company => (
            <span key={company} className="text-xs px-3 py-1 rounded-full bg-secondary-500/10 text-secondary-600 font-medium">{company}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
