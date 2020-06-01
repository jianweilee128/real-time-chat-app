import axios from "axios";
import UserActionTypes from "./user.types";

// Auth Requests
export const login = (email, password) => {
  const request = axios({
    method: "post",
    url: "/api/v1/users/signin",
    data: {
      email: email,
      password: password,
    },
  })
    .then((res) => res.data)
    .catch(() => alert("Error in logging in! Please try again..."));

  return {
    type: UserActionTypes.LOGIN_USER,
    payload: request,
  };
};

export const signup = (name, email, password, passwordConfirm) => {
  const request = axios({
    method: "post",
    url: "/api/v1/users/signup",
    data: {
      name: name,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
    },
  })
    .then((res) => res.data)
    .catch(() => alert("Error in signing up! Please try again..."));

  return {
    type: UserActionTypes.SIGNUP_USER,
    payload: request,
  };
};

export const logout = () => {
  const request = axios({
    method: "get",
    url: "/api/v1/users/logout",
  })
    .then((res) => res)
    .catch(() => alert("Error in logging out! Please try again..."));

  return {
    type: UserActionTypes.LOGOUT_USER,
    payload: request,
  };
};

// User Requests
export const getOnlineUsers = () => {
  const request = axios({
    method: "get",
    url: "/api/v1/users/online",
  })
    .then((res) => res.data)
    .catch(() => alert("Error in getting users! Please try again..."));

  return {
    type: UserActionTypes.GET_ONLINE_USER,
    payload: request,
  };
};

export const setUserList = (userList) => {
  return {
    type: UserActionTypes.SET_USER_LIST,
    payload: userList,
  };
};
