import React from "react";
import { shallow } from "enzyme";
import NavigationBar from "./navigation-bar.component";

describe("NavigationBar component", () => {
  let wrapper;
  let mockSetToggleOptionsPopup;
  let mocktoggleUpdateProfile;

  beforeEach(() => {
    mockSetToggleOptionsPopup = jest.fn();
    mocktoggleUpdateProfile = jest.fn();

    const mockProps = {
      user: { name: "JohnDoe", id: "123" },
      currentRoom: [("mockRoom", "123")],
      roomList: [
        {
          name: "mockRoom",
          _id: "123",
        },
      ],
      setToggleOptionsPopup: mockSetToggleOptionsPopup,
      toggleUpdateProfile: mocktoggleUpdateProfile,
    };

    wrapper = shallow(<NavigationBar.WrappedComponent {...mockProps} />);
  });

  it("should render NavigationBar component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call setToggleOptionsPopup function when clicked", () => {
    wrapper.find(".add-icon").simulate("click");
    expect(mockSetToggleOptionsPopup).toHaveBeenCalled();
  });
  it("should call toggleUpdateProfile function when clicked", () => {
    wrapper.find(".edit-icon").simulate("click");
    expect(mocktoggleUpdateProfile).toHaveBeenCalled();
  });
});
