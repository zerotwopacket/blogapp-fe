import { createStore } from 'redux';


const INITIAL_STATE = {
  blogs: [],
  currentLink: 'Admin'
}

export const BLOG_ACTIONS = {
  'addBlog': (blog) => ({ type: 'blogs/blogAdded', payload: blog }),
  'updateBlog': (blog) => ({ type: 'blogs/blogUpdated', payload: blog }),
  'deleteBlog': (id) => ({ type: 'blogs/blogDeleted', payload: id }),
  'loadBlogs': (blogs) => ({ type: 'blogs/blogsLoaded', payload: blogs }),
  'updateCurrentLocation': (newLocation) => ({ type: 'blogs/locationUpdated', payload: newLocation })
}


const REDUCER = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'blogs/blogsLoaded': {
      return {
        ...state,
        blogs: payload,
      }
    }
    case 'blogs/blogAdded': {
      const { blogs, nextId } = state;
      return {
        ...state,
        blogs: [...blogs, { ...payload, id: nextId }],
      }
    }
    case 'blogs/blogUpdated': {
      const { blogs } = state;
      const b = blogs.filter((item) => item.id !== payload.id);
      return {
        ...state,
        blogs: [...b, payload]
      }
    }
    case 'blogs/blogDeleted': {
      const { blogs } = state;
      return {
        ...state,
        blogs: blogs.filter((item) => item.id !== payload)
      }
    }
    case 'blogs/locationUpdated': {
      return {
        ...state,
        currentLink: payload
      }
    }
    default:
      return {
        ...state
      }
  }

}


export const blgStore = createStore(
  REDUCER,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOL_EXTENSION__()
);
// export const blogStore = createStore(reducer)
