import { Router } from '@vaadin/router';

import { formStore, formActions, RESULTS } from './form-store.js';
import { blgStore, BLOG_ACTIONS } from '../../blg-store.js';
import { loaderStore, LOADER_ACTIONS } from '../../common/loader/loader-store.js';

import { updateBlog, createBlog, deleteBlog } from '../bkup/api-service.js';

const apiSimulator = (delay) => new Promise(resolve => setTimeout(resolve, delay));

export class FormController {

  update(blog) {
    loaderStore.dispatch(LOADER_ACTIONS.toggle());
    // apiSimulator(2000)
    updateBlog(blog)
      .then(() => {
        blgStore.dispatch(BLOG_ACTIONS.updateBlog(blog));
        formStore.dispatch(formActions
          .notifySuccess({ result: RESULTS.SUCCESS, message: 'Blog updated' }));
        loaderStore.dispatch(LOADER_ACTIONS.toggle());
      }, (error) => {
        loaderStore.dispatch(LOADER_ACTIONS.toggle());
      });
  }

  remove(id) {
    loaderStore.dispatch(LOADER_ACTIONS.toggle());
    // apiSimulator(2000)
    deleteBlog(id)
      .then(() => {
        blgStore.dispatch(BLOG_ACTIONS.deleteBlog(id));
        loaderStore.dispatch(LOADER_ACTIONS.toggle());
        Router.go('/admin/blogs');
      });
  }

  load(id) {
    const { blogs } = blgStore.getState();
    const blog = blogs.filter((item) => item.id === id)[0];
    formStore.dispatch(formActions.loadBlog(blog));
  }

  loadEmpty() {
    formStore.dispatch(formActions.loadBlog({ title: '', author: '', content: '', isDirty: false }));
  }

  create(blog) {
    loaderStore.dispatch(LOADER_ACTIONS.toggle());
    const { nextId } = blgStore.getState();
    // apiSimulator(2000)
    createBlog(blog)
      .then(() => {
        loaderStore.dispatch(LOADER_ACTIONS.toggle());
        blgStore.dispatch(BLOG_ACTIONS.addBlog({ ...blog, id: nextId }));
        Router.go('/admin/blogs');
      });
  }

  changeTitle(title) {
    formStore.dispatch(formActions.changeTitle(title));
  }

  changeAuthor(author) {
    formStore.dispatch(formActions.changeAuthor(author));
  }

  changeContent(content) {
    formStore.dispatch(formActions.changeContent(content));
  }

}

export const update = blog => {
  loaderStore.dispatch(LOADER_ACTIONS.toggle());
  apiSimulator(2000)
    .then(() => {
      blgStore.dispatch(BLOG_ACTIONS.updateBlog(blog));
      formStore.dispatch(formActions
        .notifySuccess({ result: RESULTS.SUCCESS, message: 'Blog updated' }));
      loaderStore.dispatch(LOADER_ACTIONS.toggle());
    })
    .catch((error) => {
      console.log(error);
      loaderStore.dispatch(LOADER_ACTIONS.toggle());
    });
}

export const remove = id => {
  loaderStore.dispatch(LOADER_ACTIONS.toggle());
  apiSimulator(2000)
    .then(() => {
      blgStore.dispatch(BLOG_ACTIONS.deleteBlog(id));
      loaderStore.dispatch(LOADER_ACTIONS.toggle());
    });
}

export const load = id => {
  const { blogs } = blgStore.getState();
  const blog = blogs.filter((item) => item.id === id)[0];
  formStore.dispatch(formActions.loadBlog(blog));
}

export const create = blog => {
  loaderStore.dispatch(LOADER_ACTIONS.toggle());
  apiSimulator(2000)
    .then(() => {
      loaderStore.dispatch(LOADER_ACTIONS.toggle());
      blgStore.dispatch(BLOG_ACTIONS.addBlog(blog));
    });
}
