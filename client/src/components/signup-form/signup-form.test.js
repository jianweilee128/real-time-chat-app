import React from "react";
import { shallow } from "enzyme";

import SignupForm from "./signup-form.component";

describe("SignupForm component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SignupForm.WrappedComponent />);
  });

  it("should render SignupForm component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
