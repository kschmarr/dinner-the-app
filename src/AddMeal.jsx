import React, { Component } from "react";
import ApiContext from "./ApiContext";
import Title from "./Title";
import Nav from "./Nav";

export default class SignIn extends Component {
  static contextType = ApiContext;
  handleSubmitMeal = e => {
    e.preventDefault();
    let mealName = e.target.mealName.value;
    let regularity = e.target.regularity.value;
    console.log(mealName, regularity);
    this.context.addDinner(mealName, regularity);
    this.props.history.push("/list");
  };
  render() {
    return (
      <>
        <Nav />
        <Title />
        <div>
          <h1>Please add your meals here.</h1>
        </div>
        <form
          onSubmit={e => {
            this.handleSubmitMeal(e);
          }}
        >
          <div id="mealNameDiv" className="label-container">
            <label htmlFor="mealName">Meal Name:</label>
            <input
              type="text"
              id="mealName"
              name="mealName"
              placeholder="Meal Name"
            />
          </div>

          <div id="passwordDiv">
            <label htmlFor="regularity">Regularity:</label>
            <select id="regularity" name="regularity">
              <option value="short">Regularly</option>
              <option value="medium">Occasionally</option>
              <option value="long">Rarely</option>
            </select>
          </div>
          <button type="submit" className="submitBtn">
            Submit Meal
          </button>
        </form>
      </>
    );
  }
}
