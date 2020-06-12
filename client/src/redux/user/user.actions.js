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

export const forgotPassword = (email) => {
  const request = axios({
    method: "post",
    url: "/api/v1/users/forgotPassword",
    data: {
      email: email,
    },
  })
    .then((res) => res)
    .catch(() => alert("Error in resetting password! Please try again..."));

  return {
    type: UserActionTypes.FORGOT_PASSWORD,
    payload: request,
  };
};

export const resetPassword = (token, newPassword, newPasswordConfirm) => {
  const request = axios({
    method: "patch",
    url: `/api/v1/users/resetPassword/${token}`,
    data: {
      password: newPassword,
      passwordConfirm: newPasswordConfirm,
    },
  })
    .then((res) => res)
    .catch(() => alert("Error in resetting password! Please try again..."));

  return {
    type: UserActionTypes.FORGOT_PASSWORD,
    payload: request,
  };
};
export const updatePassword = (
  currentPassword,
  newPassword,
  newPasswordConfirm
) => {
  const request = axios({
    method: "post",
    url: `/api/v1/users/updatePassword`,
    data: {
      currentPassword: currentPassword,
      password: newPassword,
      passwordConfirm: newPasswordConfirm,
    },
  })
    .then((res) => res.data)
    .catch(() => alert("Error in resetting password! Please try again..."));

  return {
    type: UserActionTypes.UPDATE_PASSWORD,
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

export const setCurrentUser = (user) => {
  return {
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user,
  };
};

export const updateProfile = (name) => {
  const request = axios({
    method: "patch",
    url: "/api/v1/users/updateProfile",
    data: {
      name: name,
    },
  })
    .then((res) => res.data)
    .catch(() => alert("Error in getting users! Please try again..."));

  return {
    type: UserActionTypes.UPDATE_PROFILE,
    payload: request,
  };
};

export const setUserList = (userList) => {
  return {
    type: UserActionTypes.SET_USER_LIST,
    payload: userList,
  };
};

export const toggleUpdateProfile = () => {
  return {
    type: UserActionTypes.TOGGLE_UPDATE_PROFILE,
  };
};
