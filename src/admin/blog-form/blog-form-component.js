import { LitElement, html, css } from 'lit'


import { formStore } from "./form-store.js";

import { FormController } from './form-controller.js';
import '../../common/blg-header.js';
import '../../common/blg-button.js';


export class BlogFormComponent extends LitElement {

  static styles = css`
    h2{
      margin: 20px;
    }
    .blogForm{
      margin: 0 20px;
      padding: 40px;
      border-radius: 10px;
    }

    .message-wrapper{

    }

    .message-wrapper p{
      margin: 20px 100px;
    }
  `

  static properties = {
    blog: {}
  }

  constructor() {
    super();
    this.controller = new FormController();
    this._unsubscribe = formStore.subscribe(() => {
      this.blog = formStore.getState();
    });
  }

  onBeforeEnter(location) {
    console.log(location);
    const { path } = location.route;
    if (path.endsWith('edit')) {
      const { id } = location.params;
      this._operation = 'edit';
      this.controller.load(parseInt(id));
    } else {
      this._operation = 'add';
      this.controller.loadEmpty();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unsubscribe();
  }

  render() {
    return html`

      <blg-header
        mainHeader="Blog Form"
        secondaryHeader="Blog List"
        headerLink="/admin/blogs"
      ></blg-header>
    <form class="blogForm">
        <blg-input
          value="${this.blog.title}"
          label="TITLE"
          blgId="blg-input-title"
          @change="${this._onTitleChanged}"
          placeholder="Add title"
        ></blg-input>
        <blg-input
          value="${this.blog.author}"
          label="AUTHOR"
          @change="${this._onAuthorChanged}"
          placeholder="Add author"
        ></blg-input>
        <blg-textarea
          content="${this.blog.content}"
          label="CONTENT"
          placeholder="Write your blog here"
          @change="${this._onContentChanged}"
        ></blg-textarea>
        <div>
        <blg-button
          blgtext="${this._operation === 'edit' ? 'Update' : 'Create'}"
          blgname="${this._operation === 'edit' ? 'update' : 'create'}"
          .disabled="${!this.blog.isDirty}"
          @btn-clicked="${this._onSubmit}"
        ></blg-button>
        <blg-button
          blgtext="Delete"
          blgname="delete"
          .disabled="${this._operation === 'add'}"
          @btn-clicked="${this._onDelete}"
        ></blg-button>
        <blg-button
          blgtext="Reset"
          blgname="reset"
          .disabled="${!this.blog.isDirty}"
          @btn-clicked="${this._onReset}"
        ></blg-button>
          </div>
    </form>
      `;
  }

  showMessage() {
    return html`<div><h3>${this.message}</h3></div>`;
  }

  _onTitleChanged(e) {
    this.controller.changeTitle(e.detail);
  }

  _onAuthorChanged(e) {
    this.controller.changeAuthor(e.detail);
  }

  _onContentChanged(e) {
    this.controller.changeContent(e.detail);
  }

  _onSubmit() {
    if (this._operation === 'edit') {
      this.controller.update(this.blog);
    } else {
      this.controller.create(this.blog);
    }
  }

  _onDelete() {
    this.controller.remove(this.blog.id);
  }

  _onReset() {
    this.controller.load(this.blog.id);
  }
}

customElements.define('blog-form', BlogFormComponent);
