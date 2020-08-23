import React from "react";
import { shallow } from "enzyme";
import ForgotPasswordView from "./forgot-password-view";

describe("ForgotPasswordView", () => {
  let wrapper;
  let mockForgotPassword;
  beforeEach(() => {
    mockForgotPassword = jest.fn();

    const mockProps = {
      forgotPasswordSuccess: false,
      forgotPassword: mockForgotPassword,
    };

    wrapper = shallow(<ForgotPasswordView.WrappedComponent {...mockProps} />);
  });
  it("should render ForgotPasswordView component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
