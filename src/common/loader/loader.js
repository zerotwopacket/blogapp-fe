import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { loaderStore } from './loader-store.js';

export class BlgLoader extends LitElement {

  static properties = {
    classes: {},
  }

  static styles = css`
    .loader{
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #333333;
      transition: opacity 0.75s, visibility 0.75s;
    }

    .loader::after {
      content: "";
      width: 75px;
      height: 75px;
      border: 15px solid #dddddd;
      // border-top-color: #009578;
      border-top-color: #abcecf;
      border-radius: 50%;
      animation: loading 0.75s ease infinite;
    }

    .loaderHidden {
      opacity: 0;
      visibility: hidden;
    }

    @keyframes loading {
      from {
        transform: rotate(0turn);
      }
      to {
        transform: rotate(1turn);
      }
    }
  `

  constructor() {
    super();
    this.classes = { loader: true, loaderHidden: false };
    this._unsubscribe = loaderStore.subscribe(() => {
      this.classes = loaderStore.getState();
    })
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unsubscribe();
  }

  render() {
    return html`<div class="${classMap(this.classes)}"></div>`
  }
}

customElements.define('blg-loader', BlgLoader);
