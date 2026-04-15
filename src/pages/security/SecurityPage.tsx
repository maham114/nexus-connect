import React, { useState } from 'react';
import { Shield, Key, Smartphone, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { PasswordStrengthMeter } from '../../components/security/PasswordStrengthMeter';
import toast from 'react-hot-toast';

export const SecurityPage: React.FC = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [password, setPassword] = useState('');
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newValues = [...otpValues];
    newValues[index] = value;
    setOtpValues(newValues);
    // Auto-focus next
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const handleVerify2FA = () => {
    const code = otpValues.join('');
    if (code.length === 6) {
      setIs2FAEnabled(true);
      setShow2FA(false);
      toast.success('Two-factor authentication enabled');
    } else {
      toast.error('Please enter a valid 6-digit code');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-2xl font-heading font-bold">Security Settings</h1>
        <p className="text-muted-foreground">Manage your account security and access controls</p>
      </div>

      {/* Password */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Key className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-base font-heading font-semibold">Password</h3>
            <p className="text-sm text-muted-foreground">Update your password regularly for better security</p>
          </div>
          <button onClick={() => setShowChangePassword(!showChangePassword)}
            className="ml-auto px-4 py-1.5 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors">
            Change
          </button>
        </div>
        {showChangePassword && (
          <div className="space-y-3 mt-4 pt-4 border-t border-border">
            <div>
              <label className="text-sm font-medium mb-1 block">Current Password</label>
              <input type="password" className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">New Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
              <PasswordStrengthMeter password={password} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Confirm Password</label>
              <input type="password" className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <button onClick={() => { setShowChangePassword(false); toast.success('Password updated'); }}
              className="px-6 py-2 rounded-lg gradient-primary text-primary-foreground text-sm font-medium">
              Update Password
            </button>
          </div>
        )}
      </div>

      {/* 2FA */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-lg bg-secondary-500/10 flex items-center justify-center">
            <Smartphone className="h-5 w-5 text-secondary-500" />
          </div>
          <div>
            <h3 className="text-base font-heading font-semibold">Two-Factor Authentication</h3>
            <p className="text-sm text-muted-foreground">
              {is2FAEnabled ? 'Enabled — your account is extra secure' : 'Add an extra layer of security'}
            </p>
          </div>
          {is2FAEnabled ? (
            <CheckCircle className="ml-auto h-5 w-5 text-success-500" />
          ) : (
            <button onClick={() => setShow2FA(!show2FA)}
              className="ml-auto px-4 py-1.5 rounded-lg gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
              Enable
            </button>
          )}
        </div>
        {show2FA && !is2FAEnabled && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">
              Enter the 6-digit code from your authenticator app (use <code className="text-xs bg-muted px-1 py-0.5 rounded">123456</code> for demo)
            </p>
            <div className="flex gap-2 justify-center mb-4">
              {otpValues.map((val, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  maxLength={1}
                  value={val}
                  onChange={e => handleOtpChange(idx, e.target.value)}
                  className="w-12 h-14 text-center text-xl font-bold rounded-lg border border-border bg-background outline-none focus:ring-2 focus:ring-ring transition-all"
                />
              ))}
            </div>
            <button onClick={handleVerify2FA}
              className="w-full py-2 rounded-lg gradient-primary text-primary-foreground text-sm font-medium">
              Verify & Enable
            </button>
          </div>
        )}
      </div>

      {/* Sessions */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <Lock className="h-5 w-5 text-accent-500" />
          </div>
          <div>
            <h3 className="text-base font-heading font-semibold">Active Sessions</h3>
            <p className="text-sm text-muted-foreground">Manage devices where you're logged in</p>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { device: 'Chrome on MacOS', location: 'San Francisco, CA', current: true },
            { device: 'Safari on iPhone', location: 'San Francisco, CA', current: false },
          ].map((session, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
              <div className="flex-1">
                <p className="text-sm font-medium">{session.device}</p>
                <p className="text-xs text-muted-foreground">{session.location}</p>
              </div>
              {session.current ? (
                <span className="text-xs px-2 py-0.5 rounded-full bg-success-50 text-success-700 font-medium">Current</span>
              ) : (
                <button className="text-xs text-destructive hover:underline">Revoke</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
