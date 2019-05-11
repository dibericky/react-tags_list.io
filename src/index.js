import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import TagsDemo from "./Tags";
import TagsViewer from "./TagsViewer"

import "antd/dist/antd.css";
import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }
  static getDerivedStateFromError(error) {
    console.log(error);
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <span>
          {"Error: "}
          {this.state.error}
        </span>
      );
    }

    return (
      <div className="App">
        <Title>List of Tag with Add and Delete feature</Title>
        <Wrapper>
          <TagsDemo />
        </Wrapper>
        <br />
        <Title>Read only List of Tag</Title>
        <TagsViewer tags={[{name: 'foo', color: 'magenta'}, {name: 'bar', color: 'blue'}]} readOnly />
      </div>
    );
  }
}

const Title = styled.h3`
  text-align: left;
`
const Wrapper = styled.div`
  width: 300px;
  border: 1px solid blue;
  overflow: hidden;
`;
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
