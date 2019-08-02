import React, { Component } from "react";

import Nav from "./Nav";
import Title from "./Title";
import Card from "./Card";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Title />
        <Card />
      </div>
    );
  }
}

export default App;
