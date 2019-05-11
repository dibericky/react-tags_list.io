import React, { useState, Fragment } from "react";
import { Tag, Alert } from "antd";
import styled from "styled-components";

import AddTagButton from './AddTagButton'

export default function TagsViewer({ tags, onAdd, onDelete }) {
  const [isError, setIsError] = useState(false);
  const onAddTag = val => {
    if (onAdd(val)) {
      setIsError(false);
      return true;
    }
    setIsError(true);
  };

  const tagsList = tags.map((tag, index) => {
    return (
      <TagWrapper key={`${index}-${tag.name}`}>
        <Tag
          color={tag.color}
          closable={tag.closable}
          onClose={tag.closable ? () => onDelete(tag.name) : null}
          style={{ margin: 0 }}
        >
          {tag.name}
        </Tag>
      </TagWrapper>
    );
  });
  
  return (
    <Fragment>
      <Container>
        {tagsList}
        <TagWrapper>
          <AddTagButton
            onSubmit={onAddTag}
            isError={isError}
            onChange={() => setIsError(false)}
          />
        </TagWrapper>
      </Container>
      {isError ? (
        <div>
          <Alert message="Tag already exists" type="error" showIcon />
        </div>
      ) : null}
    </Fragment>
  );
}

const TagWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 2px 5px;
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
`;
