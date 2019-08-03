import React, { Component } from "react";
import { Link } from "react-router-dom";
import ApiContext from "./ApiContext";

export default class Nav extends Component {
  static contextType = ApiContext;

  render() {
    const { loggedIn } = this.context;
    // let link;

    // if (loggedIn) {
    //   link = (
    //     <Link
    //       to="/signin"
    //       onClick={() => {
    //         this.context.logIn();
    //       }}
    //     >
    //       Sign-Out
    //     </Link>
    //   );
    // } else {
    //   link = <Link to="/signin">Sign-In</Link>;
    // }
    return (
      <nav className="nav">
        <ul>
          <li>
            {loggedIn ? (
              <Link
                to="/signin"
                onClick={() => {
                  this.context.logIn();
                }}
              >
                Sign-Out
              </Link>
            ) : (
              <Link to="/sign-in">Sign-In</Link>
            )}
          </li>
          <li>
            <Link to="/add-meal">Add a Meal</Link>
          </li>
          <li>
            <Link to="/main">See Current Meal</Link>
          </li>
          <li>
            <Link to="/list">See All Meals</Link>
          </li>
        </ul>
      </nav>
    );
  }
}
