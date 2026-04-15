import { CollaborationRequest } from '../types';

export const collaborationRequests: CollaborationRequest[] = [
  {
    id: 'cr1',
    investorId: 'i1',
    entrepreneurId: 'e1',
    message: 'I am very interested in your AI-powered financial analytics platform. Would love to discuss potential investment opportunities.',
    status: 'pending',
    createdAt: '2024-02-15T10:30:00Z',
  },
  {
    id: 'cr2',
    investorId: 'i2',
    entrepreneurId: 'e2',
    message: 'Your sustainable packaging solution aligns perfectly with our investment thesis. Let\'s schedule a call.',
    status: 'accepted',
    createdAt: '2024-02-10T14:00:00Z',
  },
  {
    id: 'cr3',
    investorId: 'i3',
    entrepreneurId: 'e3',
    message: 'HealthPulse looks promising! I\'d like to learn more about your traction and growth plans.',
    status: 'pending',
    createdAt: '2024-02-18T09:15:00Z',
  },
  {
    id: 'cr4',
    investorId: 'i1',
    entrepreneurId: 'e2',
    message: 'While GreenLife isn\'t our typical focus, the market opportunity is compelling. Can we discuss?',
    status: 'rejected',
    createdAt: '2024-01-20T11:45:00Z',
  },
];

export const getRequestsForEntrepreneur = (entrepreneurId: string): CollaborationRequest[] => {
  return collaborationRequests.filter(req => req.entrepreneurId === entrepreneurId);
};

export const getRequestsFromInvestor = (investorId: string): CollaborationRequest[] => {
  return collaborationRequests.filter(req => req.investorId === investorId);
};
