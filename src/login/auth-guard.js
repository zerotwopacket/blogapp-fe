import { AuthorizationService } from './auth-service.js';

export class AuthGuard {

  constructor() {
    this.authService = new AuthorizationService();
  }

  async check(context, commands, pathRedirect) {

    const isAuthenticated = await this.authService.isAuthorized();

    if (!isAuthenticated) {
      return commands.redirect(pathRedirect || '/login');
    }

    return undefined;
  }
}
