import React from "react";
import ReactDOM from "react-dom";
import EditMeal from "../EditMeal";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  let location = {
    state: {
      meal: { title: "" }
    }
  };
  ReactDOM.render(
    <BrowserRouter>
      <EditMeal location={location} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
