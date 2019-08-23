import React, { Component } from "react";

export default class Title extends Component {
  render() {
    return (
      <>
        <h1 className="title mobile">Dinner.</h1>
        <h1 className="title desk">Dinner. The App.</h1>
      </>
    );
  }
}
