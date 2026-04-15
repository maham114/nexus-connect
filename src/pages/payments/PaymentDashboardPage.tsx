import React, { useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, ArrowRightLeft, TrendingUp, DollarSign, CreditCard, Plus } from 'lucide-react';
import { mockTransactions } from '../../data/mockData';
import { Transaction } from '../../types';
import toast from 'react-hot-toast';

export const PaymentDashboardPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [showModal, setShowModal] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [filter, setFilter] = useState('all');

  const balance = 485000;
  const totalIn = transactions.filter(t => t.status === 'completed' && (t.type === 'deposit' || t.type === 'funding')).reduce((s, t) => s + t.amount, 0);
  const totalOut = transactions.filter(t => t.status === 'completed' && (t.type === 'withdraw' || t.type === 'transfer')).reduce((s, t) => s + t.amount, 0);

  const filteredTx = filter === 'all' ? transactions : transactions.filter(t => t.type === filter);

  const handleAction = (type: string) => {
    if (!amount || isNaN(Number(amount))) { toast.error('Enter a valid amount'); return; }
    const tx: Transaction = {
      id: `tx${Date.now()}`,
      amount: Number(amount),
      type: type as Transaction['type'],
      sender: type === 'deposit' ? 'External Bank' : 'You',
      receiver: type === 'withdraw' ? 'External Bank' : recipient || 'Recipient',
      status: 'completed',
      date: new Date().toISOString().split('T')[0],
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} - $${Number(amount).toLocaleString()}`,
    };
    setTransactions([tx, ...transactions]);
    setShowModal(null);
    setAmount('');
    setRecipient('');
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} successful`);
  };

  const typeIcon = (type: string) => {
    switch (type) {
      case 'deposit': return <ArrowDownLeft className="h-4 w-4 text-success-500" />;
      case 'withdraw': return <ArrowUpRight className="h-4 w-4 text-destructive" />;
      case 'transfer': return <ArrowRightLeft className="h-4 w-4 text-primary" />;
      case 'funding': return <TrendingUp className="h-4 w-4 text-secondary-500" />;
      default: return <DollarSign className="h-4 w-4" />;
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success-50 text-success-700';
      case 'pending': return 'bg-accent/10 text-accent-600';
      case 'failed': return 'bg-destructive/10 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold">Payment Dashboard</h1>
        <p className="text-muted-foreground">Manage your wallet and investment transactions</p>
      </div>

      {/* Balance cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl gradient-primary p-6 text-primary-foreground">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="h-5 w-5 opacity-80" />
            <span className="text-sm opacity-80">Wallet Balance</span>
          </div>
          <p className="text-3xl font-heading font-bold">${balance.toLocaleString()}</p>
          <p className="text-sm opacity-70 mt-1">Available for investment</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center gap-2 mb-2">
            <ArrowDownLeft className="h-5 w-5 text-success-500" />
            <span className="text-sm text-muted-foreground">Total Received</span>
          </div>
          <p className="text-2xl font-heading font-bold">${totalIn.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center gap-2 mb-2">
            <ArrowUpRight className="h-5 w-5 text-destructive" />
            <span className="text-sm text-muted-foreground">Total Sent</span>
          </div>
          <p className="text-2xl font-heading font-bold">${totalOut.toLocaleString()}</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 flex-wrap">
        {['deposit', 'withdraw', 'transfer'].map(action => (
          <button key={action} onClick={() => setShowModal(action)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors">
            {action === 'deposit' && <Plus className="h-4 w-4" />}
            {action === 'withdraw' && <CreditCard className="h-4 w-4" />}
            {action === 'transfer' && <ArrowRightLeft className="h-4 w-4" />}
            {action.charAt(0).toUpperCase() + action.slice(1)}
          </button>
        ))}
      </div>

      {/* Transaction filters */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'funding', 'deposit', 'withdraw', 'transfer'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === f ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Transactions */}
      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-heading font-semibold">Transaction History</h3>
        </div>
        <div className="divide-y divide-border">
          {filteredTx.map(tx => (
            <div key={tx.id} className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                {typeIcon(tx.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{tx.description}</p>
                <p className="text-xs text-muted-foreground">{tx.sender} → {tx.receiver} · {tx.date}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-semibold ${
                  tx.type === 'deposit' || tx.type === 'funding' ? 'text-success-500' : 'text-foreground'
                }`}>
                  {tx.type === 'deposit' || tx.type === 'funding' ? '+' : '-'}${tx.amount.toLocaleString()}
                </p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(tx.status)}`}>
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm">
          <div className="bg-card rounded-xl border border-border shadow-elevated p-6 w-full max-w-sm mx-4">
            <h3 className="text-lg font-heading font-semibold mb-4 capitalize">{showModal}</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-1 block">Amount ($)</label>
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00"
                  className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
              </div>
              {showModal === 'transfer' && (
                <div>
                  <label className="text-sm font-medium mb-1 block">Recipient</label>
                  <input type="text" value={recipient} onChange={e => setRecipient(e.target.value)} placeholder="Enter name or startup"
                    className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
                </div>
              )}
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(null)}
                  className="flex-1 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors">
                  Cancel
                </button>
                <button onClick={() => handleAction(showModal)}
                  className="flex-1 py-2 rounded-lg gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
