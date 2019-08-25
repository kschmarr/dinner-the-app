import React from "react";
import ReactDOM from "react-dom";
import AddMeal from "../AddMeal";
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AddMeal />, div);
  ReactDOM.unmountComponentAtNode(div);
});
