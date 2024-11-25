
import { Router } from '@vaadin/router';
import { LitElement, html, css } from "lit";

import { blgStore } from '../../blg-store.js';
import { BlogPostsController } from './blog-posts-controller.js';

export class BlogPosts extends LitElement {

  static styles = css`
    h2 {
      margin: 20px;
    }
  `;

  static properties = {
    blogPosts: {}
  }

  constructor() {
    super();
    this.controller = new BlogPostsController();
    this.blogPosts = [];
    this._unsubcribe = blgStore.subscribe(() => {
      this.blogPosts = blgStore.getState().blogs;
    });
    this.controller.loadBlogPosts();
  }

  onBeforeEnter(location) {
    if (location !== undefined && location.pathname !== undefined && location.pathname.startsWith('/blogs')) {
      this.controller.updateLocation('Home');
    }
  }


  render() {
    this.loadBlogCard();
    return html`
      <h2>Blog Posts</h2>
      ${this.blogPosts.map(post => html`<blog-card .post="${post}"></blog-card>`)}
    `;
  }


  disconnectedCallback() {
    super.disconnectedCallback();
    this._unsubcribe();
  }

  firstUpdated() {
    this.addEventListener('readMore', event => {
      const post = event.detail;
      Router.go(`/blogs/${post.id}`);
    });
  }

  async loadBlogCard() {
    await import('../blog-card.js');
  }

}

customElements.define('blog-posts', BlogPosts);
