import { jest } from '@jest/globals';

const mockUseSession = jest.fn().mockReturnValue({
  data: {
    user: {
      name: 'Test User',
      email: 'test@example.com',
      image: 'https://example.com/test.png',
    },
    expires: '2024-06-30T00:00:00.000Z',
  },
  status: 'authenticated',
});

const SessionProvider = ({ children }) => children;

export { mockUseSession as useSession, SessionProvider };
