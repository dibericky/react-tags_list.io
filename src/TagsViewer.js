import React, { useState, Fragment } from "react";
import { Tag, Input, Icon, Alert } from "antd";
import styled from "styled-components";

function AddTagButton({ onClick, onChange, isError }) {
  const [showButton, setShowButton] = useState(true);

  const onInputSubmit = e => {
    if (onClick(e.target.value)) {
      setShowButton(true);
    }
  };
  const onErrorInputStyle = {
    border: "1px solid red",
    boxShadow: "0 0 0 2px #ffc4c7"
  };
  return showButton ? (
    <Tag
      onClick={() => setShowButton(false)}
      style={{ background: "#fff", borderStyle: "dashed" }}
    >
      <Icon type="plus" /> New Tag
    </Tag>
  ) : (
    <Input
      type="text"
      size="small"
      onPressEnter={onInputSubmit}
      onChange={onChange}
      style={{ width: 78, ...(isError ? onErrorInputStyle : {}) }}
      suffix={<Icon type={'close-circle-o'} onClick={() => setShowButton(true)}/>}
    />
  );
}

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
      <TagWrapper key={`${index}-${tag.label}`}>
        <Tag
          color={tag.color}
          closable={tag.closable}
          onClose={tag.closable ? onDelete : null}
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
            onClick={onAddTag}
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
