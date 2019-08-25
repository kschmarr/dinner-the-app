import React from "react";
import ReactDOM from "react-dom";
import EditMeal from "../EditMeal";
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<EditMeal />, div);
  ReactDOM.unmountComponentAtNode(div);
});
