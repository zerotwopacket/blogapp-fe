import { blgStore, BLOG_ACTIONS } from '../../blg-store.js';

const apiSimulator = (delay) => new Promise(resolve => setTimeout(resolve, delay));

export class BlogPostController {

  getBlogPost(id) {
    const selectedBlogs = blgStore
      .getState().blogs.filter((item) => item.id === id)[0];
    return { ...selectedBlogs };
  }


  updateLocation(home) {
    blgStore.dispatch(BLOG_ACTIONS.updateCurrentLocation(home))
  }
}
