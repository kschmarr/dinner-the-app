import React, { Component } from "react";
import ApiContext from "./ApiContext";
import Card from "./Card";
import Title from "./Title";
import Nav from "./Nav";

export default class DinnerList extends Component {
  static contextType = ApiContext;

  render() {
    const { short, medium, long } = this.context;

    return (
      <>
        <Nav />
        <Title />
        <h2>Short Rotation</h2>
        <ul>
          {short.map((dinner, i) => (
            <li key={i}>{dinner}</li>
          ))}
        </ul>
        <h2>Medium Rotation</h2>
        <ul>
          {medium.map((dinner, i) => (
            <li key={i}>{dinner}</li>
          ))}
        </ul>
        <h2>Long Rotation</h2>
        <ul>
          {long.map((dinner, i) => (
            <li key={i}>{dinner}</li>
          ))}
        </ul>
      </>
    );
  }
}
