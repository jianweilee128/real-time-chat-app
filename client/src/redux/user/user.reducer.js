import UserActionTypes from "./user.types";

const INITIAL_STATE = {
  user: {},
  userList: [],
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
    case UserActionTypes.GET_ONLINE_USER:
      return state;
    case UserActionTypes.UPDATE_PROFILE:
      return state;
    case UserActionTypes.SET_USER_LIST:
      return {
        ...state,
        userList: action.payload,
      };
    case UserActionTypes.TOGGLE_UPDATE_PROFILE:
      return {
        ...state,
        isUpdateProfile: !state.isUpdateProfile,
      };
    default:
      return state;
  }
};

export default userReducer;
