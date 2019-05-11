import React, {useState} from 'react'
import {Input, Icon, Tag} from 'antd'

export default function AddTagButton({ onSubmit, onChange, isError }) {
    const [showButton, setShowButton] = useState(true);
  
    const onInputSubmit = e => {
      if (onSubmit(e.target.value)) {
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