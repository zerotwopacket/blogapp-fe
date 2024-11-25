import { createStore } from 'redux';

export const LOGIN_ACTIONS = {
  'changeUsername': (username) => ({ type: 'login/usernameChanged', payload: username }),
  'changePassword': (password) => ({ type: 'login/passwordChanged', payload: password }),
}

const reducer = (state = { username: '', password: '' }, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'login/usernameChanged': {
      return {
        ...state,
        username: payload
      }
    }
    case 'login/passwordChanged': {
      return {
        ...state,
        password: payload
      }
    }
    default:
      return {
        ...state
      }
  }
}

export const loginStore = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOL_EXTENSION__()
);
