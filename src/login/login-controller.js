import { Router } from '@vaadin/router';
import { loginStore, LOGIN_ACTIONS } from './login-store.js';
import { AuthorizationService } from './auth-service.js';

const LOGIN_URL = 'http://localhost:8080/auth/login';

const apiLogin = async ( loginCreds ) => {
  const response = await fetch(`${LOGIN_URL}`, {
    method: 'POST',
    body: JSON.stringify(loginCreds),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }

  const data = await response.json();

  return data;
};

export class LoginController {
  constructor() {
    this.authService = new AuthorizationService();
  }

  login(creds) {
    apiLogin(creds).then(
      (data) => {
        this.authService.setToken(data.token);
        Router.go('/admin/blogs');
      },
      () => {
        alert('Invalid login credentials');
      },
    );
  }

  logout() {
    this.authService.removeLogin();
    Router.go('/blogs');
    // .then(() => {
    //   Router.go('/');
    // });
  }

  changeUsername(username) {
    loginStore.dispatch(LOGIN_ACTIONS.changeUsername(username));
  }

  changePassword(password) {
    loginStore.dispatch(LOGIN_ACTIONS.changePassword(password));
  }
}
