import React, { Component } from "react";
import ApiContext from "./ApiContext";

export default class MealName extends Component {
  static contextType = ApiContext;

  render() {
    return <h2>{this.context.currentDinner}</h2>;
  }
}
