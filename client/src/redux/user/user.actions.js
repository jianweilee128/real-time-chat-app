import axios from "axios";
import UserActionTypes from "./user.types";

// Axios Requests For Auth and Users
export const login = (email, password) => {
  return (dispatch) => {
    axios({
      method: "post",
      url: "/api/v1/users/signin",
      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        dispatch(loginSuccess(res.data.user));
      })
      .catch(() =>
        alert("Something occured while trying to log you in. Please try again!")
      );
  };
};

export const loginSuccess = (user) => {
  return {
    type: UserActionTypes.LOGIN_USER_SUCCESS,
    payload: user,
  };
};

export const signup = (name, email, password, passwordConfirm) => {
  return (dispatch) => {
    axios({
      method: "post",
      url: "/api/v1/users/signup",
      data: {
        name: name,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
      },
    })
      .then((res) => dispatch(signupSuccess(res.data.user)))
      .catch(() =>
        alert(
          "Something occured while trying to sign you up. Please try again!"
        )
      );
  };
};

export const signupSuccess = (user) => {
  return {
    type: UserActionTypes.SIGNUP_USER_SUCCESS,
    payload: user,
  };
};

export const logout = () => {
  return (dispatch) => {
    axios({
      method: "get",
      url: "/api/v1/users/logout",
    })
      .then(() => dispatch(logoutSuccess()))
      .catch(() =>
        alert("Something occured while trying to logout. Please try again!")
      );
  };
};

export const logoutSuccess = () => {
  return {
    type: UserActionTypes.LOGOUT_USER_SUCCESS,
  };
};

export const forgotPassword = (email) => {
  return (dispatch) => {
    axios({
      method: "post",
      url: "/api/v1/users/forgotPassword",
      data: {
        email: email,
      },
    })
      .then(() => dispatch(forgotPasswordSuccess()))
      .catch(() =>
        alert(
          "Something occured while trying to send a link to your email to reset it. Please try again!"
        )
      );
  };
};

export const forgotPasswordSuccess = () => {
  return {
    type: UserActionTypes.FORGOT_PASSWORD_SUCCESS,
  };
};

export const resetPassword = (token, newPassword, newPasswordConfirm) => {
  return (dispatch) => {
    axios({
      method: "patch",
      url: `/api/v1/users/resetPassword/${token}`,
      data: {
        password: newPassword,
        passwordConfirm: newPasswordConfirm,
      },
    })
      .then(() => dispatch(resetPasswordSuccess()))
      .catch(() =>
        alert(
          "Something occured while trying to reset your password. Please try again!"
        )
      );
  };
};

export const resetPasswordSuccess = () => {
  return {
    type: UserActionTypes.RESET_PASSWORD_SUCCESS,
  };
};
export const updatePassword = (
  currentPassword,
  newPassword,
  newPasswordConfirm
) => {
  return (dispatch) => {
    axios({
      method: "post",
      url: `/api/v1/users/updatePassword`,
      data: {
        currentPassword: currentPassword,
        password: newPassword,
        passwordConfirm: newPasswordConfirm,
      },
    })
      .then(() => dispatch(updatePasswordSuccess()))
      .catch(() =>
        alert(
          "Something occured while trying to update your password. Please check if you have entered your current password correctly!"
        )
      );
  };
};

export const updatePasswordSuccess = () => {
  return {
    type: UserActionTypes.UPDATE_PASSWORD_SUCCESS,
  };
};

export const updateProfile = (name) => {
  return (dispatch) => {
    axios({
      method: "patch",
      url: "/api/v1/users/updateProfile",
      data: {
        name: name,
      },
    })
      .then((res) => dispatch(updateProfileSuccess(res.data.user)))
      .catch(() =>
        alert(
          "Something occured while trying to update your profile. Please try again!"
        )
      );
  };
};

export const updateProfileSuccess = (user) => {
  return {
    type: UserActionTypes.UPDATE_PROFILE_SUCCESS,
    payload: user,
  };
};

// User Actions

export const toggleUpdateProfile = () => {
  return {
    type: UserActionTypes.TOGGLE_UPDATE_PROFILE,
  };
};

export const toggleLoginOrSignup = () => {
  return {
    type: UserActionTypes.TOGGLE_LOGIN_OR_SIGNUP,
  };
};
