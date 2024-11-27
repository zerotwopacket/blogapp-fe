import { getBlogs } from '../../admin/api/api-service.js';
import { blgStore, BLOG_ACTIONS } from '../../blg-store.js';
import { loaderStore, LOADER_ACTIONS } from '../../common/loader/loader-store.js';

export class BlogPostsController {

  updateLocation(loc) {
    blgStore.dispatch(BLOG_ACTIONS.updateCurrentLocation(loc));
  }

  loadBlogPosts() {
    loaderStore.dispatch(LOADER_ACTIONS.toggle());
    getBlogs()
      .then((data) => {
        blgStore.dispatch(BLOG_ACTIONS.loadBlogs(data));
        loaderStore.dispatch(LOADER_ACTIONS.toggle());
      });
  }
}
