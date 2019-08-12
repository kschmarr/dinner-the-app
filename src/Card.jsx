import React, { Component } from "react";
import MealName from "./MealName";
import ApiContext from "./ApiContext";
import { Link } from "react-router-dom";

export default class Card extends Component {
  static contextType = ApiContext;
  // componentDidMount() {
  //   this.context.getMeal();
  // }
  render() {
    const meal = this.context.currentMeal;
    return (
      <>
        <h1>Your next meal is: </h1>
        <MealName />
        {/* <h4>
          Last eaten on: <span>!!figure out a way to do this!!</span>
        </h4> */}
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
              pathname: `/edit-meal/${meal}`,
              state: { meal }
            }}
          >
            Edit Meal
          </Link>
        </button>
      </>
    );
  }
}
