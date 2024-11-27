import { LitElement, html, css } from "lit";

export class BlgCard extends LitElement {

  static styles = css`
    .blog-card {
      margin: 20px;
      display: flex;
      flex-direction: column;
      margin-bottom: 15px;
      background: #daf4f5;
      border-radius: 5px;
      overflow: hidden;
      border-radius: 10px;
    }

    .blog-description {
      padding: 20px;
      background: #abcecf;
    }

    .blog-footer {
      text-align: right;
    }

    .blog-link {
      color: #2f4f4f;
    }

    .blog-link:hover {
      color: #ffffff;
    }

    .blog-link:hover{
      cursor: pointer;
    }

    h1 {
      margin: 0;
      font-size: 1.5rem;
    }
    h2 {
      font-size: 1rem;
      font-weight: 300;
      color: #5e5e5e;
      margin-top: 5px;
    }

    .author{
      font-style: italic;
    }
  `;

  render() {
    return html`
      <div class="blog-card">
        <div class="blog-description">
          <h1>${this.post?.title}</h1>
          <h2 class="author">${this.post?.author}</h2>
          <p>${this.post.content}</p>
          <p class="blog-footer">
            <a class="blog-link" @click="${this._handleClick}">Read More</a>
          </p>
        </div>
      </div>
    `;
  }

  _handleClick() {
    this.dispatchEvent(
      new CustomEvent('readMore', { detail: this.post, composed: true })
    );
  }

}

customElements.define('blog-card', BlgCard);
