import React, { Component } from "react";
import { Link } from "react-router-dom";
import ApiContext from "./ApiContext";
import TokenService from "./token-service";

export default class Nav extends Component {
  static contextType = ApiContext;

  showLink = (path, linkText) => {
    if (window.location.pathname !== path) {
      return (
        <li className="currentPage">
          <Link to={path}>{linkText}</Link>
        </li>
      );
    } else {
      return (
        <li>
          <Link to={path}>{linkText}</Link>
        </li>
      );
    }
  };
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
          {this.showLink("/add-meal", "Add a Meal")}
          {this.showLink("/main", "See Current Meal")}
          {this.showLink("/list", "See All Meals")}
        </ul>
      </nav>
    );
  }
}
