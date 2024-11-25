import { LitElement, html, css } from 'lit';
import { BlogPostController } from './blog-post-controller.js';

export class BlgPost extends LitElement {

  controller = new BlogPostController();

  static styles = css`
    h2{
      margin: 20px;
    }

    .post-container{
      padding: 20px;
      margin: 0 20px;
      background-color: #abcecf;
      border-radius: 10px;
    }

    .post-author{
      text-align: right;
      font-style: italic;
      font-size: .8em;
    }
  `;

  static properties = {
    post: {}
  }

  onBeforeEnter(location) {
    const { id } = location.params;
    this.post = this.controller.getBlogPost(parseInt(id));

    if (location !== undefined && location.pathname !== undefined && location.pathname.startsWith('/blogs')) {
      this.controller.updateLocation('Home');
    }
  }



  render() {
    return html`
      <h2>${this.post.title}</h2>
      <div class="post-container">
        <p>${this.post.content}</p>
        <p class="post-author">-${this.post.author}</p>
      </div>
    `;
  }
}

customElements.define('blog-post', BlgPost);
