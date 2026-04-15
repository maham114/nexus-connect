import { Message } from '../types';

export const messages: Message[] = [
  {
    id: 'm1',
    senderId: 'i1',
    receiverId: 'e1',
    content: 'Hi Sarah, I reviewed your pitch deck and I\'m very interested in TechWave AI.',
    timestamp: '2024-02-15T10:30:00Z',
    isRead: true,
  },
  {
    id: 'm2',
    senderId: 'e1',
    receiverId: 'i1',
    content: 'Thank you Robert! I\'d love to schedule a call to discuss further.',
    timestamp: '2024-02-15T11:00:00Z',
    isRead: true,
  },
  {
    id: 'm3',
    senderId: 'i1',
    receiverId: 'e1',
    content: 'Great! How about Thursday at 2 PM?',
    timestamp: '2024-02-15T11:15:00Z',
    isRead: false,
  },
  {
    id: 'm4',
    senderId: 'i2',
    receiverId: 'e2',
    content: 'David, your GreenLife proposal is exactly what we\'re looking for. Let\'s talk!',
    timestamp: '2024-02-14T09:00:00Z',
    isRead: true,
  },
  {
    id: 'm5',
    senderId: 'e2',
    receiverId: 'i2',
    content: 'Emily, that\'s wonderful to hear! I\'m available anytime this week.',
    timestamp: '2024-02-14T10:30:00Z',
    isRead: true,
  },
];
