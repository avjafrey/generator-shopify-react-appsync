import "babel-polyfill";
import "raf";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./App";

import "./styles.global.scss";

ReactDOM.render(
    <App />,
    document.getElementById("root"));
