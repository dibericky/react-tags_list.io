import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import Tags from "./Tags";

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
        <Wrapper>
          <Tags />
        </Wrapper>
      </div>
    );
  }
}

const Wrapper = styled.div`
  width: 300px;
  border: 1px solid blue;
  overflow: hidden;
`;
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
