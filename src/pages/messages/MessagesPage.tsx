import React from 'react';
import { MessageCircle } from 'lucide-react';
import { messages } from '../../data/messages';
import { users } from '../../data/users';
import { useAuth } from '../../context/AuthContext';

export const MessagesPage: React.FC = () => {
  const { user } = useAuth();
  const userMessages = messages.filter(m => m.senderId === user?.id || m.receiverId === user?.id);

  const conversations = new Map<string, typeof messages>();
  userMessages.forEach(msg => {
    const otherId = msg.senderId === user?.id ? msg.receiverId : msg.senderId;
    if (!conversations.has(otherId)) conversations.set(otherId, []);
    conversations.get(otherId)!.push(msg);
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold">Messages</h1>
        <p className="text-muted-foreground">Your conversations with investors and entrepreneurs</p>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        {conversations.size === 0 ? (
          <div className="p-12 text-center">
            <MessageCircle className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No messages yet</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {Array.from(conversations.entries()).map(([otherId, msgs]) => {
              const otherUser = users.find(u => u.id === otherId);
              const lastMsg = msgs[msgs.length - 1];
              return (
                <div key={otherId} className="flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors cursor-pointer">
                  <div className="relative">
                    <img src={otherUser?.avatarUrl} alt={otherUser?.name}
                      className="h-12 w-12 rounded-full object-cover" />
                    {otherUser?.isOnline && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success-500 ring-2 ring-card" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{otherUser?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(lastMsg.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{lastMsg.content}</p>
                  </div>
                  {!lastMsg.isRead && lastMsg.receiverId === user?.id && (
                    <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
