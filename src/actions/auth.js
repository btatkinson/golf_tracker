import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../types';
import api from '../api';

export const userLoggedIn = (user) => ({
  type: USER_LOGGED_IN,
  user
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

export const login = credentials => (dispatch) =>
  api.user.login(credentials).then(user=>{
    localStorage.golftrackerJWT = user.token;
    dispatch(userLoggedIn(user));
});

export const logout = () => dispatch => {
    localStorage.removeItem(localStorage.golftrackerJWT);
    dispatch(userLoggedOut());
    localStorage.clear();
};

export const confirm = (token) => dispatch => {
  console.log("hello from auth");
  api.user.confirmToken(token)
  .then(user=>{
    localStorage.golftrackerJWT = user.token;
    dispatch(userLoggedIn(user));
  });
};
