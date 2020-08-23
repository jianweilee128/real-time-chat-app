import React from "react";
import AuthView from "./auth-view";
import LoginForm from "../../components/login-form/login-form.component";
import SignupForm from "../../components/signup-form/signup-form.component";
import { shallow } from "enzyme";

describe("AuthView", () => {
  let wrapper;
  it("should render login component", () => {
    const mockProps = {
      loginOrSignup: false,
    };
    wrapper = shallow(<AuthView.WrappedComponent {...mockProps} />);
    expect(wrapper.contains(<LoginForm />)).toEqual(true);
  });
  it("should render signup component", () => {
    const mockProps = {
      loginOrSignup: true,
    };
    wrapper = shallow(<AuthView.WrappedComponent {...mockProps} />);
    expect(wrapper.contains(<SignupForm />)).toEqual(true);
  });
});
