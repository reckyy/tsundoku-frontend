import { jest } from '@jest/globals';

const mockUseRouter = jest.fn().mockReturnValue({
  push: jest.fn(),
});

export { mockUseRouter as useRouter };
