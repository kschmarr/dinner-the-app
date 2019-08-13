import React, { Component } from "react";
import ApiContext from "./ApiContext";
import Title from "./Title";
import Nav from "./Nav";
import { Link } from "react-router-dom";

export default class MealList extends Component {
  static contextType = ApiContext;
  componentDidMount() {
    this.context.getAllMeals();
  }

  render() {
    const { short, medium, long } = this.context;

    return (
      <>
        <Nav />
        <Title />
        <h2>Short Rotation</h2>
        <ul>
          {short.map((meal, i) => (
            <li key={i}>
              <Link
                to={{
                  pathname: `/edit-meal/${meal.meal}`,
                  state: { meal }
                }}
              >
                {meal.meal}
              </Link>
            </li>
          ))}
        </ul>
        <h2>Medium Rotation</h2>
        <ul>
          {medium.map((meal, i) => (
            <li key={i}>
              <Link
                to={{
                  pathname: `/edit-meal/${meal.meal}`,
                  state: { meal }
                }}
              >
                {meal.meal}
              </Link>
            </li>
          ))}
        </ul>
        <h2>Long Rotation</h2>
        <ul>
          {long.map((meal, i) => (
            <li key={i}>
              <Link
                to={{
                  pathname: `/edit-meal/${meal.meal}`,
                  state: { meal }
                }}
              >
                {meal.meal}
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}
