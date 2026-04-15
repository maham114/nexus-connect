import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('sarah@techwave.io');
  const [password, setPassword] = useState('password');
  const [role, setRole] = useState<UserRole>('entrepreneur');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login(email, password, role);
      navigate(role === 'entrepreneur' ? '/dashboard/entrepreneur' : '/dashboard/investor');
    } catch {
      // error handled in context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 gradient-primary items-center justify-center p-12">
        <div className="max-w-md text-primary-foreground">
          <div className="h-12 w-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center mb-8">
            <span className="text-xl font-bold">N</span>
          </div>
          <h1 className="text-4xl font-heading font-bold mb-4">Welcome to Nexus</h1>
          <p className="text-lg opacity-90">
            The premier platform connecting visionary investors with innovative entrepreneurs. Build partnerships that shape the future.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-3">
              <span className="text-lg font-bold text-primary-foreground">N</span>
            </div>
            <h2 className="text-xl font-heading font-bold">Nexus</h2>
          </div>

          <h2 className="text-2xl font-heading font-bold mb-1">Sign in</h2>
          <p className="text-muted-foreground mb-6">Enter your credentials to access your account</p>

          <div className="flex rounded-lg border border-border p-1 mb-6">
            <button
              type="button"
              onClick={() => { setRole('entrepreneur'); setEmail('sarah@techwave.io'); }}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                role === 'entrepreneur'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Entrepreneur
            </button>
            <button
              type="button"
              onClick={() => { setRole('investor'); setEmail('robert@ventureflow.com'); }}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                role === 'investor'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Investor
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-10 rounded-lg border border-border bg-background px-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-ring transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-10 rounded-lg gradient-primary text-primary-foreground font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              ) : (
                <>
                  <LogIn className="h-4 w-4" /> Sign In
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </p>

          <div className="mt-6 p-3 rounded-lg bg-muted/50 border border-border">
            <p className="text-xs text-muted-foreground text-center">
              <strong>Demo:</strong> Use the pre-filled credentials to explore the platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
