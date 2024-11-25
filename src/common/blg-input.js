import { LitElement, html, css } from 'lit';

export class BlgInput extends LitElement {

  static get styles() {
    return css`
      input {
        display: block;
        width: 100%;
        margin-bottom: 14px;
        padding: 6px;
        font-size: 1.0rem;
      }

      label {
        display: block;
        width: 100%;
        font-weight: bold;
        font-size: 1.0rem;
        color: #333;
        letter-spacing: 2px;
      }
    `;
  }

  static properties = {
    label: {},
    placeholder: {},
    value: {},
    blgId: {},
    name: {},
    type: {}
  }

  constructor() {
    super();
    if (this.value === undefined) {
      this.value = ''
    }

    if (this.type === undefined) {
      this.type = 'input';
    }
  }

  render() {
    return html`
      <label for="${this.blgId}">${this.label}<label>
      <input id="${this.blgId}"
      .value="${this.value}"
      .name="${this.name}"
      .id="${this.blgId}"
      .placeholder="${this.placeholder}"
      .type="${this.type}"
      @change="${this._changed}"
    />
    `;
  }

  _changed(e) {
    this.dispatchEvent(new CustomEvent('change', {
      detail: e.target.value
    }));
  }
}

customElements.define('blg-input', BlgInput);
