import React, { Component } from "react";
import ApiContext from "./ApiContext";
import Title from "./Title";
import TokenService from "./token-service";

export default class SignIn extends Component {
  static contextType = ApiContext;
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameValid: false,
      validationMessages: {
        name: ""
      }
    };
  }
  handleSubmit = ev => {
    ev.preventDefault();
    const username = ev.target.username.value.toLowerCase().trim();
    const password = ev.target.password.value;
    TokenService.saveAuthToken(
      TokenService.makeBasicAuthToken(username, password)
    );
    this.context.getUserId(TokenService.getAuthToken());
    this.context.getAllMeals();
    this.props.history.push("/main");
  };
  validateName(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;
    fieldValue = fieldValue.trim();
    if (fieldValue.length === 0) {
      fieldErrors.name = "UserName is required";
      hasError = true;
    } else {
      if (fieldValue.length < 3) {
        fieldErrors.name = "UserName must be at least 3 characters long";
        hasError = true;
      } else {
        fieldErrors.name = "";
        hasError = false;
      }
    }

    this.setState({
      validationMessages: fieldErrors,
      nameValid: !hasError,
      name: fieldValue
    });
  }

  render() {
    return (
      <>
        <Title />
        <div>
          <h1>Please sign in here to see, add, and edit your meals.</h1>
        </div>
        <form
          onSubmit={e => {
            this.handleSubmit(e);
          }}
        >
          <div id="usernameDiv" className="label-container">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              onChange={e => this.validateName(e.target.value)}
              required
            />
          </div>

          <div id="passwordDiv" className="label-container">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="submitBtn">
            Sign-In
          </button>
        </form>
      </>
    );
  }
}
