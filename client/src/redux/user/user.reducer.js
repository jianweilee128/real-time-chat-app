import UserActionTypes from "./user.types";

const INITIAL_STATE = {
  user: {},
  isAuthenticated: false,
  isUpdateProfile: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.LOGIN_USER:
      return state;
    case UserActionTypes.SIGNUP_USER:
      return state;
    case UserActionTypes.LOGOUT_USER:
      return state;
    case UserActionTypes.IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: !state.isAuthenticated,
      };
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
      };
    case UserActionTypes.FORGOT_PASSWORD:
      return state;
    case UserActionTypes.RESET_PASSWORD:
      return state;
    case UserActionTypes.UPDATE_PASSWORD:
      return state;
    case UserActionTypes.TOGGLE_UPDATE_PROFILE:
      return {
        ...state,
        isUpdateProfile: !state.isUpdateProfile,
      };
    case UserActionTypes.UPDATE_PROFILE:
      return state;
    default:
      return state;
  }
};

export default userReducer;
