import { createStore } from 'redux';

export const LOADER_ACTIONS = {
  'toggle': () => ({ type: 'loader/toggled' })
}

const reducer = (state = { loader: true, loaderHidden: true }, action) => {
  const { type } = action;
  const { loaderHidden } = state;

  switch (type) {
    case 'loader/toggled':
      return {
        ...state,
        loaderHidden: !loaderHidden
      }
    default:
      return {
        ...state
      }
  }
}

export const loaderStore = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOL_EXTENSION__()
);
