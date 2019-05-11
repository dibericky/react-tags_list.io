import React, { useState, Fragment } from "react";
import { Tag, Alert } from "antd";
import styled from "styled-components";
import PropTypes from 'prop-types'

import AddTagButton from './AddTagButton'

export default function TagsViewer({ tags, onAdd, onDelete, errorMessage, readOnly }) {
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
          closable={!readOnly && tag.closable}
          onClose={!readOnly && tag.closable ? () => onDelete(tag.name) : null}
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
        {
          !readOnly ? 
            <TagWrapper>
              <AddTagButton
                onSubmit={onAddTag}
                isError={isError}
                onChange={() => setIsError(false)}
              />
            </TagWrapper> 
          : null
        }
      </Container>
      {isError ? (
        <div>
          <Alert message={errorMessage} type="error" showIcon />
        </div>
      ) : null}
    </Fragment>
  );
}

TagsViewer.defaultPros = {
  readOnly: false,
  onAdd: () => {},
  onDelete: () => {},
  tags: [],
  errorMessage: "Error on adding tag."
}
TagsViewer.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    closable: PropTypes.bool
  })),
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
  errorMessage: PropTypes.string,
  readOnly: PropTypes.bool
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
