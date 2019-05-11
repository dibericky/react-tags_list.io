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
    onAdd: jest.fn().mockReturnValue(true),
    onDelete: jest.fn()
  };

  it("renders correct numbers of Tag", () => {
    element = mount(<TagsViewer {...props} />);
    const tagsElement = element.find(Tag);
    expect(tagsElement.length).toEqual(tags.length + 1);
  });

  it("renders an AddTagButton", () => {
    element = mount(<TagsViewer {...props} />);
    const addTagButton = element.find('AddTagButton')
    expect(addTagButton.length).toEqual(1)
  })

  it("calls onAdd when AddTagButton submits", () => {
    element = mount(<TagsViewer {...props} />);
    const addTagButton = element.find('AddTagButton')
    addTagButton.prop("onSubmit")('foo')
    expect(props.onAdd).toHaveBeenCalledTimes(1)
    expect(props.onAdd).toHaveBeenCalledWith('foo')
  })

  it("calls onDelete with correct argument when user click on x of closable Tag", () => {
    const expectedClosableTags = tags.filter(tag => tag.closable)
    element = mount(<TagsViewer {...props} />);
    const tagsElement = element.findWhere(node => node.name() === 'Tag' && node.prop('closable'));
    
    tagsElement.forEach((tag, index) => {
      props.onDelete.mockReset()
      tag.prop('onClose')()
      expect(props.onDelete).toHaveBeenCalledTimes(1)
      expect(props.onDelete).toHaveBeenCalledWith(expectedClosableTags[index].name)
    })
  })

  describe("if readOnly", () => {
    it("renders correct numbers of Tag", () => {
      element = mount(<TagsViewer {...props} readOnly />);
      const tagsElement = element.find(Tag);
      expect(tagsElement.length).toEqual(tags.length);
    });

    it("does not renders an AddTagButton", () => {
      element = mount(<TagsViewer {...props} readOnly />);
      const addTagButton = element.find('AddTagButton')
      expect(addTagButton.length).toEqual(0)
    })

    it("does not set closable and onClose on Tag", () => {
      element = mount(<TagsViewer {...props} readOnly />);
      const tagsElement = element.find(Tag);
      tagsElement.forEach(tag => {
        expect(tag.prop('closable')).toEqual(false)
        expect(tag.prop('onClose')).toEqual(null)
      })
    })
  })
});
