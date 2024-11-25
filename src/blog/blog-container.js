import { LitElement, html } from 'lit';

export class BlogContainer extends LitElement {
  render() {
    return html`
    <slot></slot>`;
  }
}

customElements.define('blog-container', BlogContainer);
