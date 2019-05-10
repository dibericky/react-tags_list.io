import React from "react";
import { mount } from "enzyme";
import { Tag } from "antd";

import TagsViewer from "../TagsViewer";

describe("TagsViewer", () => {
  let element;
  let tags = [
    { name: "foo", closable: true, color: "magenta" },
    { name: "bar", color: "cyan" }
  ];
  const props = {
    tags,
    onAdd: jest.fn(),
    onDelete: jest.fn()
  };

  it("renders correct numbers of Tag", () => {
    element = mount(<TagsViewer {...props} />);
    const tagsElement = element.find(Tag);
    expect(tagsElement.length).toEqual(tags.length + 1);
  });
});
