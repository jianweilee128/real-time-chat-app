import UserActionTypes from "./user.types";

const INITIAL_STATE = {};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.LOGIN_USER:
      return {
        ...state,
        loginSuccess: action.payload,
      };
    case UserActionTypes.SIGNUP_USER:
      return {
        ...state,
        signupSuccess: action.payload,
      };
    case UserActionTypes.LOGOUT_USER:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default userReducer;
