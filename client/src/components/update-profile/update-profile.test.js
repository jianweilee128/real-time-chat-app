import React from "react";
import { shallow } from "enzyme";

import UpdateProfile from "./update-profile.component";

describe("UpdateProfile component", () => {
  let wrapper;

  beforeEach(() => {
    const mockProps = {
      user: { name: "JohnDoe", id: "123" },
    };

    wrapper = shallow(<UpdateProfile.WrappedComponent {...mockProps} />);
  });

  it("should render UpdateProfile component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
