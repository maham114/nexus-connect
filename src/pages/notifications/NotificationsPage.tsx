import React from 'react';
import { Bell, Check, UserPlus, FileText, Calendar } from 'lucide-react';

const notifications = [
  { id: 1, type: 'request', title: 'New Collaboration Request', message: 'Robert Williams wants to connect', time: '2 hours ago', read: false },
  { id: 2, type: 'document', title: 'Document Signed', message: 'NDA Agreement has been signed', time: '5 hours ago', read: false },
  { id: 3, type: 'meeting', title: 'Meeting Confirmed', message: 'Investment discussion scheduled for March 20', time: '1 day ago', read: true },
  { id: 4, type: 'request', title: 'Request Accepted', message: 'Emily Rodriguez accepted your collaboration request', time: '2 days ago', read: true },
];

export const NotificationsPage: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    request: <UserPlus className="h-4 w-4 text-primary" />,
    document: <FileText className="h-4 w-4 text-secondary-500" />,
    meeting: <Calendar className="h-4 w-4 text-accent-500" />,
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with your latest activity</p>
        </div>
        <button className="text-sm text-primary hover:underline flex items-center gap-1">
          <Check className="h-4 w-4" /> Mark all read
        </button>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <div className="divide-y divide-border">
          {notifications.map(n => (
            <div key={n.id} className={`flex items-start gap-3 p-4 transition-colors ${!n.read ? 'bg-primary/5' : 'hover:bg-muted/30'}`}>
              <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                {iconMap[n.type] || <Bell className="h-4 w-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{n.title}</p>
                <p className="text-xs text-muted-foreground">{n.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
              </div>
              {!n.read && <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-2" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
