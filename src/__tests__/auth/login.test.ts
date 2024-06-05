import { auth } from '@/auth';

jest.mock('@/auth');

describe('auth function', () => {
  it('should return mocked session', async () => {
    const session = await auth();
    expect(session).toEqual({
      user: {
        name: 'Test User',
        email: 'test@example.com',
        image: 'https://example.com/test.png',
      },
      expires: '2024-06-30T00:00:00.000Z',
    });
  });
});
