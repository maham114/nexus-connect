import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Home, Users, MessageCircle, Bell, FileText,
  Settings, HelpCircle, Handshake, Calendar, Video,
  Wallet, Shield, Building2, CircleDollarSign
} from 'lucide-react';

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, text }) => {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(to + '/');

  return (
    <NavLink
      to={to}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
        isActive
          ? 'bg-primary/10 text-primary'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      }`}
    >
      {icon}
      <span>{text}</span>
    </NavLink>
  );
};

export const NexusSidebar: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const entrepreneurItems = [
    { to: '/dashboard/entrepreneur', icon: <Home className="h-4 w-4" />, text: 'Dashboard' },
    { to: `/profile/entrepreneur/${user.id}`, icon: <Building2 className="h-4 w-4" />, text: 'My Startup' },
    { to: '/investors', icon: <Users className="h-4 w-4" />, text: 'Find Investors' },
    { to: '/meetings', icon: <Calendar className="h-4 w-4" />, text: 'Meetings' },
    { to: '/video-call', icon: <Video className="h-4 w-4" />, text: 'Video Calls' },
    { to: '/messages', icon: <MessageCircle className="h-4 w-4" />, text: 'Messages' },
    { to: '/notifications', icon: <Bell className="h-4 w-4" />, text: 'Notifications' },
    { to: '/documents', icon: <FileText className="h-4 w-4" />, text: 'Documents' },
    { to: '/payments', icon: <Wallet className="h-4 w-4" />, text: 'Payments' },
  ];

  const investorItems = [
    { to: '/dashboard/investor', icon: <Home className="h-4 w-4" />, text: 'Dashboard' },
    { to: `/profile/investor/${user.id}`, icon: <CircleDollarSign className="h-4 w-4" />, text: 'My Portfolio' },
    { to: '/entrepreneurs', icon: <Users className="h-4 w-4" />, text: 'Find Startups' },
    { to: '/meetings', icon: <Calendar className="h-4 w-4" />, text: 'Meetings' },
    { to: '/video-call', icon: <Video className="h-4 w-4" />, text: 'Video Calls' },
    { to: '/messages', icon: <MessageCircle className="h-4 w-4" />, text: 'Messages' },
    { to: '/notifications', icon: <Bell className="h-4 w-4" />, text: 'Notifications' },
    { to: '/deals', icon: <Handshake className="h-4 w-4" />, text: 'Deals' },
    { to: '/documents', icon: <FileText className="h-4 w-4" />, text: 'Documents' },
    { to: '/payments', icon: <Wallet className="h-4 w-4" />, text: 'Payments' },
  ];

  const sidebarItems = user.role === 'entrepreneur' ? entrepreneurItems : investorItems;

  const commonItems = [
    { to: '/settings', icon: <Settings className="h-4 w-4" />, text: 'Settings' },
    { to: '/security', icon: <Shield className="h-4 w-4" />, text: 'Security' },
    { to: '/help', icon: <HelpCircle className="h-4 w-4" />, text: 'Help' },
  ];

  return (
    <aside className="hidden md:flex fixed left-0 top-16 bottom-0 w-64 flex-col border-r border-border bg-card overflow-y-auto z-40">
      <div className="flex flex-col gap-1 p-4 flex-1">
        <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Main Menu
        </p>
        {sidebarItems.map((item) => (
          <SidebarItem key={item.to} {...item} />
        ))}

        <div className="mt-6">
          <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Settings
          </p>
          {commonItems.map((item) => (
            <SidebarItem key={item.to} {...item} />
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-border">
        <div className="rounded-lg bg-primary/5 p-3 text-center">
          <p className="text-xs text-muted-foreground">Logged in as</p>
          <p className="text-sm font-medium mt-0.5">{user.name}</p>
          <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
        </div>
      </div>
    </aside>
  );
};
