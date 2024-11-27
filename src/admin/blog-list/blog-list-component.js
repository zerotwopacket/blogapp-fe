import { LitElement, html, css } from 'lit';


import { blgStore } from '../../blg-store.js';
import { BlogListController } from './blog-list-controller.js';



export class BlogListComponent extends LitElement {

  static styles = css`
    h2 {
      margin: 20px;
    }

    .blg-table-container{
      margin: 0 20px;
      padding: 40px;
      // background-color: #d2d4d4;
      box-sizing: border-box;
      border-radius: 10px;
    }

    .blg-table{
      border-collapse: collapse;
      width: 100%;
    }

    .blg-table th, .blg-table td{
      border: 1px solid #aaa;
      padding: 8px;
    }

    .blg-table th{
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      color: #fff;
      // background: #2f4f4f;
      background: #80a3a2;
    }

    .blg-table tr:nth-child(even){
      background-color: #f2f2f2;
    }

    .blg-table tr:hover{
      background-color: #bbb;
    }

    .blg-table td{
    }

    a {
      text-decoration: none;
      color: #2f4f4f;
    }
  `;

  static properties = {
    blogs: {}
  }

  constructor() {
    super();
    this.controller = new BlogListController();
    this.controller.loadBlogPosts();
    this.blogs = blgStore.getState().blogs;
    this._unsubscribe = blgStore.subscribe(() => {
      this.blogs = blgStore.getState().blogs;
    });
  }

  onBeforeEnter(location) {
    if (location !== undefined && location.pathname !== undefined && location.pathname.startsWith('/admin')) {
      this.controller.updateLocation('Admin');
    }
  }

  render() {
    return this._renderTable();
  }

  _renderTable() {
    return html`
      <blg-header
        mainHeader="Blog List"
        secondaryHeader="Create Blog"
        headerLink="/admin/blogs/0/add"
      ></blg-header>
      <div class="blg-table-container">
        <table class="blg-table">
          <tr><th>Title</th><th>Author</th><th>Operation</th></tr>
          ${this.blogs.map((item) => this._renderRow(item))}
        </table>
      </div>
      `;
  }

  _renderRow(item) {
    return html`<tr>
      <td><a href='/admin/blogs/${item.id}/edit'>${item.title}</a></td>
      <td>${item.author}</td>
      <td><button @click=${() => this._removeBlog(item.id)}>Delete</button></td>
    </tr>`;
  }

  _removeBlog(id) {
    this.controller.remove(id);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unsubscribe();
  }

}

customElements.define('blog-list', BlogListComponent);
