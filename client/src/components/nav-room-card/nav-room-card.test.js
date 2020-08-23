import React from "react";
import { shallow } from "enzyme";

import NavRoomCard from "./nav-room-card.component";

describe("NavRoomCard component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavRoomCard.WrappedComponent />);
  });

  it("should render NavRoomCard component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
