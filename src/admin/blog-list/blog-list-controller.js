import { blgStore, BLOG_ACTIONS } from '../../blg-store.js';
import { getBlogs, deleteBlog } from '../api/api-service.js';
import { loaderStore, LOADER_ACTIONS } from '../../common/loader/loader-store.js';

export class BlogListController {

  updateLocation(loc) {
    blgStore.dispatch(BLOG_ACTIONS.updateCurrentLocation(loc));
  }

  remove(id) {
    loaderStore.dispatch(LOADER_ACTIONS.toggle());
    deleteBlog(id)
      .then(() => {
        blgStore.dispatch(BLOG_ACTIONS.deleteBlog(id));
        loaderStore.dispatch(LOADER_ACTIONS.toggle());
      }, (err)=>{
        loaderStore.dispatch(LOADER_ACTIONS.toggle());
        alert(`Unable to delete blog with id ${1}`)
      });
  }

  loadBlogPosts() {
    loaderStore.dispatch(LOADER_ACTIONS.toggle());
    getBlogs()
      .then((data) => {
        blgStore.dispatch(BLOG_ACTIONS.loadBlogs(data));
        loaderStore.dispatch(LOADER_ACTIONS.toggle());
      }, (error) => {
        loaderStore.dispatch(LOADER_ACTIONS.toggle());
      })
  }

}
