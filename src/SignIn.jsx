import React, { Component } from "react";
import ApiContext from "./ApiContext";
import Title from "./Title";
import TokenService from "./token-service";
import ValidationError from "./ValidationError";
import config from "./config";

export default class SignIn extends Component {
  static contextType = ApiContext;
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      pass: "",
      nameValid: false,
      passValid: false,
      validationMessages: {
        name: "",
        pass: ""
      },
      signup: false
    };
  }
  handleFormSwitch = () => {
    this.setState({ signup: !this.state.signup });
  };
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
  handleSignup = ev => {
    ev.preventDefault();
    const username = ev.target.username.value.toLowerCase().trim();
    const password = ev.target.password.value.trim();
    const token = TokenService.makeBasicAuthToken(username, password);
    const newUser = {
      username: username,
      token: token
    };
    fetch(`${config.API_ENDPOINT}/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(newUser)
    })
      .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e));
        return res.json();
      })
      // .then(data => {
      //   this.context.addUser(username, token);
      // })
      .then(data => {
        TokenService.saveAuthToken(token);
        this.context.getUserId(token);
        this.context.getAllMeals();
        this.props.history.push("/main");
        return data;
      })

      .catch(error => {
        console.error({ error });
      });
  };
  validateName = fieldValue => {
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
  };
  validatePasswords = (pass2, fieldValue) => {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;
    fieldValue = fieldValue.trim();
    if (fieldValue.length === 0) {
      fieldErrors.pass = "Password is required";
      hasError = true;
    } else {
      if (fieldValue.length < 3) {
        fieldErrors.pass = "Password must be at least 3 characters long";
        hasError = true;
      } else {
        if (fieldValue !== pass2) {
          fieldErrors.pass = "Passwords must match";
          hasError = true;
        } else {
          fieldErrors.pass = "";
          hasError = false;
        }
      }

      this.setState({
        validationMessages: fieldErrors,
        passValid: !hasError,
        pass: fieldValue
      });
    }
  };

  render() {
    if (this.state.signup) {
      return (
        <>
          <Title />
          <div>
            <h1>Please sign up here to see, add, and edit your meals.</h1>
          </div>
          <form
            onSubmit={e => {
              this.handleSignup(e);
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
            <ValidationError
              hasError={!this.state.nameValid}
              message={this.state.validationMessages.name}
            />
            <div id="passwordDiv" className="label-container">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                ref="password"
                placeholder="Password"
                required
              />
              <br />
              <label htmlFor="password2">Confirm Password:</label>
              <input
                type="password"
                id="password2"
                placeholder="Confirm Password"
                onChange={e =>
                  this.validatePasswords(
                    e.target.value,
                    this.refs.password.value
                  )
                }
                required
              />
            </div>
            <ValidationError
              hasError={!this.state.passValid}
              message={this.state.validationMessages.pass}
            />
            <button
              type="submit"
              className="submitBtn"
              disabled={!this.state.nameValid && !this.state.passValid}
            >
              Sign-Up
            </button>
            <button
              type="button"
              className="submitBtn"
              onClick={this.handleFormSwitch}
            >
              I don't need to Sign-Up
            </button>
          </form>
        </>
      );
    } else {
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
            <ValidationError
              hasError={!this.state.nameValid}
              message={this.state.validationMessages.name}
            />
            <div id="passwordDiv" className="label-container">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
              />
            </div>
            <button
              type="submit"
              className="submitBtn"
              disabled={!this.state.nameValid}
            >
              Sign-In
            </button>
            <button
              type="button"
              className="submitBtn"
              onClick={this.handleFormSwitch}
            >
              I need to Sign-Up
            </button>
          </form>
        </>
      );
    }
  }
}
