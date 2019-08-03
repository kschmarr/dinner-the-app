import React, { Component } from "react";
import ApiContext from "./ApiContext";
import Title from "./Title";
import Nav from "./Nav";

export default class EditMeal extends Component {
  static contextType = ApiContext;

  handleSubmitMeal = e => {
    e.preventDefault();
    let mealName = e.target.mealName.value;
    let newRegularity = e.target.regularity.value;
    let mealSource = this.findMeal(this.props.location.state.meal);
    this.context.editMeal(mealSource, mealName, newRegularity);
    this.props.history.push("/list");
  };
  handleDeleteMeal = (meal, regularity) => {
    this.context.deleteMeal(meal, regularity);
    this.props.history.push("/list");
  };
  findMeal = meal => {
    if (this.context.short.includes(meal)) {
      return ["short", this.context.short.findIndex(meali => meali === meal)];
    } else if (this.context.medium.includes(meal)) {
      return ["medium", this.context.medium.findIndex(meali => meali === meal)];
    } else {
      return ["long", this.context.long.findIndex(meali => meali === meal)];
    }
  };

  render() {
    const { meal } = this.props.location.state;
    let selectLabel = "";
    let value = this.findMeal(meal);
    if (value[0] === "short") {
      selectLabel = "Regularly";
    } else if (value[0] === "medium") {
      selectLabel = "Sparingly";
    } else {
      selectLabel = "Rarely";
    }

    return (
      <>
        <Nav />
        <Title />
        <div>
          <h1>Please edit your meal here.</h1>
        </div>
        <div>
          <h3>
            Current Name:
            <span className="mealSpan">{meal}</span> --- Regularity:
            <span className="mealSpan">{selectLabel}</span>
          </h3>
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
              defaultValue={meal}
            />
          </div>

          <div id="regularityDiv">
            <label htmlFor="regularity">Regularity:</label>
            <select id="regularity" name="regularity">
              <option value="short">Regularly</option>
              <option value="medium">Sparingly</option>
              <option value="long">Rarely</option>
            </select>
          </div>

          <button type="submit" className="submitBtn">
            Submit Meal
          </button>
        </form>

        <button
          type="delete"
          id="bigDeleteBtn"
          className="submitBtn"
          onClick={() => {
            this.handleDeleteMeal(meal, value[0]);
          }}
        >
          YUCK! (Delete forever)
        </button>
      </>
    );
  }
}
