import React, { Component } from "react";
import { Link } from "react-router-dom";
import ApiContext from "./ApiContext";
import Title from "./Title";

export default class SignIn extends Component {
  static contextType = ApiContext;

  render() {
    return (
      <>
        <Title />
        <div>
          <h1>Please sign in here to see, add, and edit your meals.</h1>
        </div>
        <form>
          <div id="usernameDiv" className="label-container">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" placeholder="Username" />
          </div>

          <div id="passwordDiv" className="label-container">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" placeholder="Password" />
          </div>
          <button className="submitBtn">
            <Link
              to="/main"
              onClick={() => {
                this.context.logIn();
              }}
            >
              Sign-In
            </Link>
          </button>
        </form>
      </>
    );
  }
}
