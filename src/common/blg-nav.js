import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';
import { LoginController } from '../login/login-controller.js';
import { AuthorizationService } from '../login/auth-service.js';

export class BlgNav extends LitElement {
  static styles = css`
    .header {
      padding: 20px;
      font-size: 25px;
      text-align: center;
      background: white;
    }

    .topnav {
      background-color: #4f4c4c;
      overflow: hidden;
    }

    .mainnav{

    }

    .mainnav a{
      float: left;
      color: #f2f2f2;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
      font-size: 17px;
      cursor: pointer;
    }

    .topnav a {
      // float: left;
      color: #f2f2f2;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
      font-size: 17px;
      cursor: pointer;
    }

    .topnav a:hover {
      background-color: #ddd;
      color: black;
    }

    .topnav a.active {
      background-color: #80a3a2;
      color: white;
    }

    .logout{
      float: right;
    }
  `;

  static properties = {
    links: {},
    currentLink: {},
    showLogout: {}
  }

  constructor() {
    super();
    console.log('creating top nav');
    this._loginController = new LoginController();
    this._authService = new AuthorizationService();
    this._authService
      .isAuthorized()
      .then(() => { this.showLogout = true }, () => { this.showLogout = false })
    this.links = []
  }

  onBeforeEnter(location) {
    const { path } = location.route;
    console.log(path);
  }

  render() {
    return html`
      <div class="topnav">
        <div class="mainnav">
          ${this.links.map((item) => this._renderLink(item))}
        </div>
        ${this._showLogout()}
      </div>
    `;
  }

  _showLogout() {
    if (this._authService.getToken()) {
      return html`<a class="logout" @click="${this._logout}">Logout</a>`;
    }
  }

  _renderLink(item) {
    return html`<a
      class="${this._classes(item)}"
      @click="${() => this._clickLink(item)}"
    >${item}</a>`;
  }

  _classes(item) {

    if (this.currentLink === undefined && this.links.length > 0) {
      const initialLink = this.links[0];
      this.currentLink = initialLink;
    }

    if (item === this.currentLink) {
      return 'active';
    }

    return '';
  }

  _logout() {
    this._loginController.logout();
    this.showLogout = false;
  }

  _clickLink(item) {
    this.currentLink = item;
    if (this.currentLink === 'Home') {
      Router.go('/');
    } else if (this.currentLink === 'Admin') {
      Router.go('/admin/blogs');
    }
  }
}

customElements.define('blg-nav', BlgNav);
