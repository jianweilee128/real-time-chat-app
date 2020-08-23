import React from "react";
import { shallow } from "enzyme";
import OptionsPopup from "./options-popup.component";

describe("OptionsPopup component", () => {
  let wrapper;
  let mockSetToggleOptionsPopup;

  beforeEach(() => {
    mockSetToggleOptionsPopup = jest.fn();

    const mockProps = {
      user: { name: "JohnDoe", id: "123" },
      currentRoom: [("mockRoom", "123")],
      setToggleOptionsPopup: mockSetToggleOptionsPopup,
    };

    wrapper = shallow(<OptionsPopup.WrappedComponent {...mockProps} />);
  });

  it("should render OptionsPopup component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call setToggleOptionsPopup function when clicked", () => {
    wrapper.find(".close-icon").simulate("click");
    expect(mockSetToggleOptionsPopup).toHaveBeenCalled();
  });
});
