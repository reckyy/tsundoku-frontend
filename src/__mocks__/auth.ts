const mockAuth = jest.fn().mockResolvedValue({
  user: {
    name: 'Test User',
    email: 'test@example.com',
    image: 'https://example.com/test.png',
  },
  expires: '2024-06-30T00:00:00.000Z',
});

export { mockAuth as auth };
