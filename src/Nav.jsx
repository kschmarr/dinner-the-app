import React, { Component } from "react";
import { Link } from "react-router-dom";
import ApiContext from "./ApiContext";
import TokenService from "./token-service";

export default class Nav extends Component {
  static contextType = ApiContext;

  render() {
    return (
      <nav className="nav">
        <ul>
          <li>
            {TokenService.hasAuthToken() ? (
              <Link
                to="/sign-in"
                onClick={() => {
                  TokenService.clearAuthToken();
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
