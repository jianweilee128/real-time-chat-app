import React from "react";
import { shallow } from "enzyme";

import LoginForm from "./login-form.component";

describe("LoginForm component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<LoginForm.WrappedComponent />);
  });

  it("should render LoginForm component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
