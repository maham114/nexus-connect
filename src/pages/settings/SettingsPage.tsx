import React from 'react';
import { Settings, User, Bell, Globe } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-2xl font-heading font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <h3 className="text-base font-heading font-semibold mb-4 flex items-center gap-2">
          <User className="h-4 w-4" /> Profile Settings
        </h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Display Name</label>
            <input type="text" defaultValue={user?.name}
              className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Email</label>
            <input type="email" defaultValue={user?.email}
              className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Bio</label>
            <textarea defaultValue={user?.bio} rows={3}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring resize-none" />
          </div>
          <button className="px-6 py-2 rounded-lg gradient-primary text-primary-foreground text-sm font-medium">
            Save Changes
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <h3 className="text-base font-heading font-semibold mb-4 flex items-center gap-2">
          <Bell className="h-4 w-4" /> Notification Preferences
        </h3>
        <div className="space-y-3">
          {['Email notifications', 'Push notifications', 'Meeting reminders', 'Collaboration updates'].map(pref => (
            <label key={pref} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
              <span className="text-sm">{pref}</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
