import React from "react";
import { shallow } from "enzyme";

import ChatView from "./chat-view";

describe("ChatView component", () => {
  let wrapper;

  beforeEach(() => {
    const mockProps = {
      messageList: [
        {
          message: "Hey",
          sender: "JohnDoe",
          timestamp: "10.37pm",
        },
        {
          message: "Hi",
          sender: "JaneDoe",
          timestamp: "10.38pm",
        },
      ],
    };

    wrapper = shallow(<ChatView.WrappedComponent {...mockProps} />);
  });

  it("should render ChatView component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
