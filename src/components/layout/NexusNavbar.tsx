import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, X, Bell, MessageCircle, User, LogOut, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const NexusNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const dashboardRoute = user?.role === 'entrepreneur' ? '/dashboard/entrepreneur' : '/dashboard/investor';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border bg-card/95 backdrop-blur-md">
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link to={dashboardRoute} className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">N</span>
            </div>
            <span className="font-heading text-lg font-bold tracking-tight">Nexus</span>
          </Link>
        </div>

        <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search investors, startups..."
              className="w-full h-9 rounded-lg border border-border bg-muted/50 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/notifications"
            className="relative p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
          </Link>
          <Link
            to="/messages"
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <MessageCircle className="h-5 w-5 text-muted-foreground" />
          </Link>

          <div className="relative ml-2 group">
            <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-muted transition-colors">
              <img
                src={user?.avatarUrl || `https://ui-avatars.com/api/?name=${user?.name}&background=3B82F6&color=fff`}
                alt={user?.name}
                className="h-8 w-8 rounded-full object-cover ring-2 ring-border"
              />
              <span className="hidden lg:block text-sm font-medium">{user?.name}</span>
            </button>
            <div className="absolute right-0 top-full mt-1 w-48 rounded-lg border border-border bg-card shadow-elevated opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <Link
                to={user ? `/profile/${user.role}/${user.id}` : '/login'}
                className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted transition-colors rounded-t-lg"
              >
                <User className="h-4 w-4" /> Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors rounded-b-lg"
              >
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
