import React from 'react';
import { HelpCircle, Mail, MessageCircle, FileText, ExternalLink } from 'lucide-react';

export const HelpPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-2xl font-heading font-bold">Help & Support</h1>
        <p className="text-muted-foreground">Get help with your Nexus account</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { icon: FileText, title: 'Documentation', desc: 'Browse guides and tutorials', color: 'text-primary' },
          { icon: MessageCircle, title: 'Live Chat', desc: 'Chat with our support team', color: 'text-secondary-500' },
          { icon: Mail, title: 'Email Support', desc: 'support@nexusplatform.com', color: 'text-accent-500' },
          { icon: HelpCircle, title: 'FAQ', desc: 'Frequently asked questions', color: 'text-success-500' },
        ].map(item => (
          <div key={item.title} className="rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-elevated transition-all cursor-pointer">
            <item.icon className={`h-8 w-8 ${item.color} mb-3`} />
            <h3 className="text-base font-heading font-semibold">{item.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <h3 className="text-base font-heading font-semibold mb-4">Frequently Asked Questions</h3>
        <div className="space-y-3">
          {[
            { q: 'How do I connect with investors?', a: 'Browse the Find Investors page and send collaboration requests.' },
            { q: 'How do I schedule a meeting?', a: 'Go to the Meetings page to set availability and request meetings.' },
            { q: 'How do I sign documents?', a: 'Visit the Document Chamber to review and e-sign contracts.' },
            { q: 'Is my payment information secure?', a: 'Yes, all transactions are simulated in this demo environment.' },
          ].map((faq, i) => (
            <details key={i} className="group p-3 rounded-lg bg-muted/50 border border-border">
              <summary className="text-sm font-medium cursor-pointer list-none flex items-center justify-between">
                {faq.q}
                <span className="text-muted-foreground group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <p className="text-sm text-muted-foreground mt-2">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};
