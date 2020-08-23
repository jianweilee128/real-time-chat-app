import UserActionTypes from "./user.types";

const INITIAL_STATE = {
  user: {},
  isAuthenticated: false,
  isUpdateProfile: false,
  loginOrSignup: false,
  forgotPasswordSuccess: false,
  resetPasswordSuccess: false,
  updatePasswordSuccess: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case UserActionTypes.SIGNUP_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case UserActionTypes.LOGOUT_USER_SUCCESS:
      return {
        isAuthenticated: false,
      };
    case UserActionTypes.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordSuccess: true,
      };
    case UserActionTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordSuccess: true,
      };
    case UserActionTypes.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        updatePasswordSuccess: true,
      };
    case UserActionTypes.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case UserActionTypes.TOGGLE_UPDATE_PROFILE:
      return {
        ...state,
        isUpdateProfile: !state.isUpdateProfile,
      };

    case UserActionTypes.TOGGLE_LOGIN_OR_SIGNUP:
      return {
        ...state,
        loginOrSignup: !state.loginOrSignup,
      };
    default:
      return state;
  }
};

export default userReducer;
