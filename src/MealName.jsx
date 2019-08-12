import React, { Component } from "react";
import ApiContext from "./ApiContext";

export default class MealName extends Component {
  static contextType = ApiContext;

  render() {
    return (
      <h2>
        {this.context.currentMeal ||
          "Welcome to the main event! Click 'Next Meal' to cycle through your meals."}
      </h2>
    );
  }
}
