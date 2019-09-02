import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import Card from "../Card";
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Card />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
