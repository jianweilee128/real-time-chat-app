import React from "react";
import { shallow } from "enzyme";
import ResetPasswordView from "./reset-password-view";

describe("ResetPasswordView", () => {
  let wrapper;
  let mockResetPassword;
  beforeEach(() => {
    mockResetPassword = jest.fn();
    const mockMatch = {
      params: {
        token: "abc123",
      },
    };

    const mockProps = {
      resetPasswordSuccess: false,
      match: mockMatch,
      resetPassword: mockResetPassword,
    };

    wrapper = shallow(<ResetPasswordView.WrappedComponent {...mockProps} />);
  });
  it("should render ResetPasswordView component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
