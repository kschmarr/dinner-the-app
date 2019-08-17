import React, { Component } from "react";
// import MealName from "./MealName";
import ApiContext from "./ApiContext";
import { Link } from "react-router-dom";
import ValidationError from "./ValidationError";

export default class Card extends Component {
  static contextType = ApiContext;

  convert = str => {
    let date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  };

  render() {
    const { currentMeal, short, medium, long } = this.context;

    let convertedDate;
    currentMeal === undefined
      ? (convertedDate = "2001-01-01")
      : (convertedDate = this.convert(currentMeal.date_last_eaten));
    const lowMealCount =
      short.length < 1 || medium.length < 1 || long.length < 1;
    return (
      <div className="container">
        {currentMeal ? (
          <div>
            <h1>Your next meal is: </h1>
            <h2 className="mealName">{currentMeal.meal}</h2>
            <div id="rotationDiv">
              <h1 className="rotation">Rotation: </h1>
              <h2 className="rotationSpan">
                {currentMeal.rotation.charAt(0).toUpperCase() +
                  currentMeal.rotation.slice(1)}
              </h2>
            </div>
            <div>
              <h1 className="dateEaten">Last eaten on: </h1>
              {convertedDate === "2001-01-01" ? (
                <h2>It's your first time eating this meal</h2>
              ) : (
                <h2 className="ateDate">{convertedDate}</h2>
              )}
            </div>
            <button
              className="submitBtn"
              onClick={() => {
                this.context.nextMeal();
              }}
              disabled={lowMealCount}
            >
              Next Meal
            </button>
            <ValidationError
              hasError={lowMealCount}
              message="Must have at least one meal in each rotation for functionality. Check out 'See All Meals' link in navbar."
            />
            <Link
              to={{
                pathname: `/edit-meal/${currentMeal.meal}`,
                state: { meal: currentMeal }
              }}
            >
              <button className="submitBtn">Edit Meal</button>
            </Link>
          </div>
        ) : (
          <>
            <h2 className="welcomeText">
              Welcome to the main event! Click 'See Current Meal' to continue.
            </h2>

            <button
              className="submitBtn"
              onClick={() => {
                this.context.getMeal();
              }}
            >
              See Current Meal
            </button>
          </>
        )}
      </div>
    );
  }
}
