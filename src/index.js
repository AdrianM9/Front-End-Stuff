import React from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
import "./index.css";
import Router from "./components/Router";
import * as serviceWorker from "./serviceWorker";

const NetlifyStatus = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.8;
  height: 10px;
`;

const App = () => {
  return (
    <>
      <Router />
      <NetlifyStatus
        src="https://api.netlify.com/api/v1/badges/82e4e323-4642-4ae1-a450-591c79fb03e6/deploy-status"
        alt="status"
      />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
