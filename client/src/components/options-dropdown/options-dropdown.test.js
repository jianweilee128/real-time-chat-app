import React from "react";
import { shallow } from "enzyme";

import OptionsDropdown from "./options-dropdown.component";

describe("OptionsDropdown component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<OptionsDropdown.WrappedComponent />);
  });

  it("should render OptionsDropdown component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
