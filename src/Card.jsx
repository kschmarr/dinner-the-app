import React, { Component } from "react";
import MealName from "./MealName";
import ApiContext from "./ApiContext";
import { Link } from "react-router-dom";

export default class Card extends Component {
  static contextType = ApiContext;
  componentDidMount() {
    if (this.context.currentDinnerIndex === 0) {
      this.context.nextDinner();
    }
  }

  render() {
    return (
      <>
        <h1>Your next meal is: </h1>
        <MealName />
        <h4>
          Last eaten on: <span>!!figure out a way to do this!!</span>
        </h4>
        <button
          onClick={() => {
            this.context.nextDinner();
          }}
        >
          Next Meal
        </button>
        <button>
          <Link to="/editmeal">Edit Meal</Link>
        </button>
      </>
    );
  }
}
