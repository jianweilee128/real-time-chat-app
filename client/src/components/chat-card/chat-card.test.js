import { shallow } from "enzyme";
import React from "react";
import ChatCard from "./chat-card.component";

describe("ChatCard", () => {
  it("should render correctly", () => {
    const sender = "test";
    const timestamp = "1 Jan 2020";
    const message = "Hi";
    const component = shallow(
      <ChatCard sender={sender} timestamp={timestamp} message={message} />
    );
    expect(component).toMatchSnapshot();
  });
});
