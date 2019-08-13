import React, { Component } from "react";
import ApiContext from "./ApiContext";

export default class MealName extends Component {
  static contextType = ApiContext;

  render() {
    const { currentMeal } = this.context;
    return (
      <>
        <h2>
          {currentMeal.meal ||
            "Welcome to the main event! Click 'Next Meal' to cycle through your meals."}
        </h2>
        <h3>Rotation:{currentMeal.rotation}</h3>
      </>
    );
  }
}
