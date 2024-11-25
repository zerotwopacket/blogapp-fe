import { LitElement, html, css } from 'lit';

export class BlgHeader extends LitElement {
  static styles = css`
    .headerValue {
      font-size: 1.6rem;
      vertical-align: middle;
    }
    .headerValue:before {
      content: "";
      display: inline-block;
      height: 100%;
      vertical-align: middle;
    }
    .headerLink {
      padding: 10px;
      border: 1px solid #abcecf;
      font-size: 1rem;
      border-radius: 0.2rem;
      background-color: #abcecf;
      cursor: pointer;
    }

    .headerLink:hover {
      padding: 10px;
      border: 1px solid #80a3a2;
      font-size: 1rem;
      border-radius: 0.2rem;
      background-color: #80a3a2;
    }

    .headerLink a{
      text-decoration: none;
      color: #000;
    }
    h2{
      margin: 20px 60px;
    }
    .blg-header-container{
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid gray;
    }

  `;

  static properties = {
    mainHeader: {},
    secondaryHeader: {},
    headerLink: {}

  }

  render() {
    return html`
      <div class="blg-header-container">
        <h2 class="headerValue">${this.mainHeader}</h2>
        <h2 class="headerLink"><a href="${this.headerLink}">${this.secondaryHeader}</a></h2>
      </div>
    `;
  }
}

customElements.define('blg-header', BlgHeader);
