import React, { useState } from "react";

import TagsViewer from "./TagsViewer";

export default function TagsDemo() {
  const [tags, setTags] = useState([
    { name: "foo", closable: true, color: "magenta" },
    { name: "bar", color: "cyan" },
    { name: "lorem", closable: true, color: "blue" }
  ]);

  const onAdd = value => {
    const isAlreadyExisting = tags.some(tag => tag.name === value);
    if (isAlreadyExisting) {
      return false;
    }
    const cloneTags = tags.slice(0);
    cloneTags.push({ name: value, closable: true, color: "green" });
    setTags(cloneTags);
    return true;
  };
  
  const onDelete = value => {
    const filteredTags = tags.filter(tag => tag.name !== value);
    setTags(filteredTags);
  };
  return <TagsViewer tags={tags} onAdd={onAdd} onDelete={onDelete} errorMessage={"Tag already exists"} />;
}
