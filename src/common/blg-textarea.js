
import { LitElement, html, css } from 'lit';

export class BlgTextArea extends LitElement {

  static styles =
    css`
      textarea {
        display: block;
        width: 100%;
        margin-bottom: 14px;
        padding: 8px;
      }

      label {
        display: block;
        width: 100%;
        font-weight: bold;
        font-size: 1.0rem;
        letter-spacing: 2px;
      }
    `;

  static properties = {
    label: {},
    placeholder: {},
    content: {},
    blgId: {},
    name: {}
  }

  render() {
    return html`
      <label for="${this.blgId}">${this.label}<label>
      <textarea
        .name="${this.name}"
        .id="blg-content-1"
        .placeholder="${this.placeholder}"
        .value="${this.content}"
        @change="${this._changed}"
        rows="20"
      ></textarea>`;
  }

  _changed(e) {
    this.dispatchEvent(new CustomEvent('change', {
      detail: e.target.value
    }));
  }
}


customElements.define('blg-textarea', BlgTextArea);
