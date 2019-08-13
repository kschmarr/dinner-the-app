import React, { Component } from "react";
import MealName from "./MealName";
import ApiContext from "./ApiContext";
import { Link } from "react-router-dom";

export default class Card extends Component {
  static contextType = ApiContext;

  convert = str => {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  };
  render() {
    const meal = this.context.currentMeal;
    const convertedDate = this.convert(meal.date_last_eaten);
    if (meal.meal) {
      return (
        <>
          <h1>Your next meal is: </h1>
          <MealName />
          <h4>
            Last eaten on:{" "}
            <span>
              {convertedDate === "2001-01-01" ? (
                <h3>It's your first time eating this meal</h3>
              ) : (
                <h3>{convertedDate}</h3>
              )}
            </span>
          </h4>
          <button
            className="submitBtn"
            onClick={() => {
              this.context.nextMeal();
            }}
          >
            Next Meal
          </button>
          <button className="submitBtn">
            <Link
              to={{
                pathname: `/edit-meal/${meal.meal}`,
                state: { meal }
              }}
            >
              Edit Meal
            </Link>
          </button>
        </>
      );
    } else {
      return (
        <>
          <h2>
            "Welcome to the main event! Click 'Next Meal' to cycle through your
            meals."
          </h2>
          <button
            className="submitBtn"
            onClick={() => {
              this.context.nextMeal();
            }}
          >
            Next Meal
          </button>
        </>
      );
    }
  }
}
