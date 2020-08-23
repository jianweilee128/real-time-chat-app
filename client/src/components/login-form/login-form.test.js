import React from "react";
import { shallow } from "enzyme";

import LoginForm from "./login-form.component";

describe("LoginForm component", () => {
  let wrapper;
  let mockLogin;

  beforeEach(() => {
    mockLogin = jest.fn();

    const mockProps = {
      login: mockLogin,
    };
    wrapper = shallow(<LoginForm.WrappedComponent {...mockProps} />);
  });

  it("should render LoginForm component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call login function when login button is clicked", () => {
    wrapper.find(".login-btn").simulate("click");
    expect(mockLogin).toHaveBeenCalled();
  });
});
