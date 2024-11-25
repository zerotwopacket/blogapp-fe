import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

export class BlgButton extends LitElement {

  static styles = css`

    button {
      font-size: 1rem;
      padding: 0.2rem 0.8rem;
    }
  `

  static properties = {
    blgname: {},
    blgtext: {},
    blgClasses: {},
    primary: {},
    on: {},
    disabled: {}
  }

  constructor() {
    super();
    this.disabled = false;
  }

  render() {
    return html`<button
      name="${this.blgname}"
      @click="${this._clicked}"
      type="button"
      class=""
      ?disabled="${this.disabled}">${this.blgtext}</button>`;
  }

  _clicked() {
    this.dispatchEvent(new CustomEvent('btn-clicked', {}));
  }
}

customElements.define('blg-button', BlgButton);
