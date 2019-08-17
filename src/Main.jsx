import React, { Component } from "react";
import Nav from "./Nav";
import Title from "./Title";
import Card from "./Card";
import ApiContext from "./ApiContext";
class App extends Component {
  static contextType = ApiContext;
  componentDidMount() {
    this.context.getMeal();
  }

  render() {
    return (
      <div className="main">
        <Nav location={this.props.location} />
        <Title />
        <Card />
      </div>
    );
  }
}

export default App;
