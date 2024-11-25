export class AuthorizationService {
  _key = 'key';

  isAuthorized() {
    const token = this.getToken();
    return new Promise((resolve, reject) => {
      resolve(token !== null);
      // resolve(false);
    });
  }

  removeLogin() {
    // return new Promise((resolve, reject) => {
    // localStorage.removeItem(this._key);
    localStorage.clear();
    //   resolve(true);
    // });
  }

  setToken(token) {
    localStorage.setItem(this._key, token);
  }

  getToken() {
    return localStorage.getItem(this._key);
  }
}
