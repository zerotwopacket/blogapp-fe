import { createStore } from 'redux';

export const FORM_ACTIONS = {
  'loadBlog': (blog) => ({ type: 'form/blogLoaded', payload: blog }),
  'changeTitle': title => ({ type: 'form/titleChanged', payload: title }),
  'changeAuthor': author => ({ type: 'form/authorChanged', payload: author }),
  'changeContent': content => ({ type: 'form/contentChanged', payload: content }),
  'notifySuccess': content => ({ type: 'form/operationSucceeded', payload: content }),
  'notifyError': content => ({ type: 'form/operationFailed', payload: content }),
}

export const RESULTS = {
  'SUCCESS': 'SUCCESS',
  'FAILURE': 'FAILURE',
}


const reducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'form/blogLoaded':
      return {
        ...payload,
        isDirty: false
      }
    case 'form/titleChanged':
      return {
        ...state,
        title: payload,
        isDirty: true
      }
    case 'form/authorChanged':
      return {
        ...state,
        author: payload,
        isDirty: true
      }
    case 'form/contentChanged':
      return {
        ...state,
        content: payload,
        isDirty: true
      }
    case 'form/operationSucceeded':
      return {
        ...state,
        message: payload,
        isDirty: false
      }
    case 'form/operationFailed':
      return {
        ...state,
        message: payload,
      }
    default:
      return {
        ...state
      }
  }
}

export const formStore = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOL_EXTENSION__()
);
