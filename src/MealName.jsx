import React, { Component } from "react";
import ApiContext from "./ApiContext";

export default class MealName extends Component {
  static contextType = ApiContext;

  render() {
    let { currentMeal } = this.context;
    return (
      <>
        <h2 className="mealName">
          {currentMeal === undefined
            ? `Welcome to the main event! Click 'Next Meal' to see what's for dinner.`
            : currentMeal.meal}
        </h2>
        {currentMeal === undefined ? (
          <></>
        ) : (
          <h2 className="rotation">Rotation:{currentMeal.rotation}</h2>
        )}
      </>
    );
  }
}
