import { LitElement, html, css } from "lit";

export class BlogAdmin extends LitElement {

  static styles = css`
  `;

  render() {
    return html`
    <slot></slot>
    `;
  }
}

customElements.define('blog-admin', BlogAdmin);
