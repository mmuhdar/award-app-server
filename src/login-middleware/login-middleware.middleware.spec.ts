import { LoginMiddlewareMiddleware } from './login-middleware.middleware';

describe('LoginMiddlewareMiddleware', () => {
  it('should be defined', () => {
    expect(new LoginMiddlewareMiddleware()).toBeDefined();
  });
});
