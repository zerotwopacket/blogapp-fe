import { LitElement, html, css } from "lit";
import { loginStore } from './login-store.js';
import { LoginController } from "./login-controller.js";

import('../common/blg-input.js');

export class LoginPage extends LitElement {

  static styles = css`
    .login-wrapper{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80vh;
    }
    .login-form-container{
      width: 500px;
    }
  `


  static properties = {
    username: {},
    password: {}
  }

  constructor() {
    super();
    this.loginController = new LoginController();
    this._unsubscribe = loginStore.subscribe(() => {
      this.username = loginStore.getState().username;
      this.password = loginStore.getState().password;
    });
  }

  render() {
    return html`
      <div class="login-wrapper">
        <div class="login-form-container">
            <blg-input
              label="Username"
              value="${this.username}"
              placeholder="Username"
              @change="${this._changeUsername}"
            ></blg-input>
            <blg-input
              label="Password"
              value="${this.password}"
              placeholder="Password"
              type="password"
              @change="${this._changePassword}"
            ></blg-input>
            <button @click="${this._doLogin}">Login</button>
        </div>
      </div>
      `
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unsubscribe();
  }

  _doLogin(e) {
    this.loginController.login({ username: this.username, password: this.password });
  }

  _changeUsername(e) {
    this.loginController.changeUsername(e.detail);
  }

  _changePassword(e) {
    this.loginController.changePassword(e.detail);
  }
}

customElements.define("login-page", LoginPage);
