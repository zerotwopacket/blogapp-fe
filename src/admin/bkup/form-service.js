import {
  createBlog,
  updateBlog,
  deleteBlog
} from './api-service.js';


import { formStore, formActions } from './form-store.js';
import { blgStore, BLOG_ACTIONS } from '../../blg-store.js';

export const loadBlog = id => {
  const selectedBlog = blgStore
    .getState().blogs
    .filter((item) => item.id === id)[0];
  formStore.dispatch(formActions.loadBlog(selectedBlog));
}

export const loadEmptyBlog = () => {
  const x = { id: -1, title: '', author: '', content: '' }
  formStore.dispatch(formActions.loadBlog(x));
}

export const update = blog => {
  updateBlog(blog)
    .then(data => {
      blgStore.dispatch(BLOG_ACTIONS.updateBlog(blog));
    });
}

export const remove = id => {
  deleteBlog(id)
    .then(data => {
      blgStore.dispatch(BLOG_ACTIONS.removeBlog(id));
    });
}

export const create = blog => {
  createBlog(blog)
    .then(data => {
      blgStore.dispatch(BLOG_ACTIONS.addBlog(blog));
    });
}

export const reset = id => {
  // update form store
}
