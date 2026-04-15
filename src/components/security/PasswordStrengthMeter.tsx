import React from 'react';

interface Props {
  password: string;
}

export const PasswordStrengthMeter: React.FC<Props> = ({ password }) => {
  const getStrength = (pwd: string): { score: number; label: string; color: string } => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-destructive' };
    if (score <= 2) return { score: 2, label: 'Fair', color: 'bg-warning-500' };
    if (score <= 3) return { score: 3, label: 'Good', color: 'bg-accent' };
    if (score <= 4) return { score: 4, label: 'Strong', color: 'bg-success-500' };
    return { score: 5, label: 'Very Strong', color: 'bg-success-700' };
  };

  if (!password) return null;

  const { score, label, color } = getStrength(password);

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= score ? color : 'bg-muted'
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Password strength: <span className="font-medium">{label}</span>
      </p>
    </div>
  );
};
