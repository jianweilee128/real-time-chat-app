import UserActionTypes from "./user.types";

const INITIAL_STATE = {
  userList: [],
};

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
      return state;
    case UserActionTypes.GET_ONLINE_USER:
      return state;
    case UserActionTypes.SET_USER_LIST:
      return {
        ...state,
        userList: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
