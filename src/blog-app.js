import { LitElement, html, css } from 'lit';
import './common/loader/loader.js';
import './common/blg-nav.js';
import { blgStore, BLOG_ACTIONS } from './blg-store.js';


class BlogApp extends LitElement {

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

    .topnav a {
      float: left;
      color: #f2f2f2;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
      font-size: 17px;
    }

    .topnav a:hover {
      background-color: #ddd;
      color: black;
    }

    .topnav a.active {
      background-color: #80a3a2;
      color: white;
    }
  `;

  static properties = {
    links: {},
    currentLink: {}
  }

  constructor() {
    super();
    this._unsubscribe = blgStore.subscribe(() => {
      this.currentLink = blgStore.getState().currentLink;
    });
  }

  render() {
    return html`
      <blg-nav
        .links="${['Home', 'Admin']}"
        .currentLink="${this.currentLink}"
         >
      </blg-nav>
      <slot></slot>
      <blg-loader></blg-loader>
    `;
  }
}

customElements.define('blog-app', BlogApp);
