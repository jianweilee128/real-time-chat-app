import * as actions from "./user.actions";
import userReducer from "./user.reducer";
import UserActionTypes from "./user.types";

describe("user actions", () => {
  it("should create an action to toggle update profile view", () => {
    const expectedAction = {
      type: UserActionTypes.TOGGLE_UPDATE_PROFILE,
    };
    expect(actions.toggleUpdateProfile()).toEqual(expectedAction);
  });
  it("should create an action to toggle whether to show the login form or signup form", () => {
    const expectedAction = {
      type: UserActionTypes.TOGGLE_LOGIN_OR_SIGNUP,
    };
    expect(actions.toggleLoginOrSignup()).toEqual(expectedAction);
  });
});

describe("user reducer", () => {
  it("should return the initial state", () => {
    expect(userReducer(undefined, {})).toEqual({
      user: {},
      isAuthenticated: false,
      isUpdateProfile: false,
      loginOrSignup: false,
      forgotPasswordSuccess: false,
      resetPasswordSuccess: false,
      updatePasswordSuccess: false,
    });
  });

  it("should handle TOGGLE_UPDATE_PROFILE", () => {
    expect(
      userReducer([], {
        type: UserActionTypes.TOGGLE_UPDATE_PROFILE,
      })
    ).toEqual({
      isUpdateProfile: true,
    });
  });

  it("should handle TOGGLE_LOGIN_OR_SIGNUP", () => {
    expect(
      userReducer([], {
        type: UserActionTypes.TOGGLE_LOGIN_OR_SIGNUP,
      })
    ).toEqual({
      loginOrSignup: true,
    });
  });
});
