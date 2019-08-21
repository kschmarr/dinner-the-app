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

  handleSignIn = ev => {
    ev.preventDefault();
    const username = this.state.name.toLowerCase();
    const password = this.state.pass;
    const token = TokenService.makeBasicAuthToken(username, password);
    fetch(`${config.API_ENDPOINT}/users`, {
      headers: { authorization: `basic ${token}` }
    })
      .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e));
        return res.json();
      })
      .then(users => {
        let user = users.filter(user => user.token === token)[0];
        if (!user) {
          alert("NONE SHALL PASS!! (Bad credentials)");
        }
        this.context.setUser(user);
        return user;
      })
      .then(user => {
        TokenService.saveAuthToken(token);
        return user;
      })
      .then(user => {
        this.context.getAllMeals();
        return user;
      })
      .then(user => {
        this.props.history.push("/main");
        return user;
      })
      .catch(error => {
        console.error({ error });
      });
  };

  handleSignup = ev => {
    ev.preventDefault();
    const username = this.state.name.toLowerCase();
    const password = this.state.pass;
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

      .then(data => {
        this.context.setUser(data);
        TokenService.saveAuthToken(token);
        this.props.history.push("/main");
        return data;
      })

      .catch(error => {
        console.error({ error });
      });
  };

  handleSignInPass = e => {
    this.setState({ pass: e });
  };

  handleSignUpPass = e => {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = true;

    if (e.length !== e.trim().length) {
      fieldErrors.pass = "Password cannot contain spaces";
      hasError = true;
    } else {
      if (e.length === 0) {
        fieldErrors.pass = "Password is required";
        hasError = true;
      } else {
        if (e.length < 3) {
          hasError = true;
          fieldErrors.pass = "Password must be at least 3 characters long";
        } else {
          fieldErrors.name = "";
        }
      }
    }
    this.setState({
      validationMessages: fieldErrors,
      pass: e.trim(),
      passValid: !hasError
    });
  };

  validateName = fieldValue => {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;
    fieldValue = fieldValue.trim();
    if (fieldValue.length === 0) {
      fieldErrors.name = "Username is required";
      hasError = true;
    } else {
      if (fieldValue.length < 3) {
        fieldErrors.name = "Username must be at least 3 characters long";
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

  validatePasswords = pass2 => {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = true;
    let pass1 = this.state.pass;
    // if (pass2.length !== pass2.trim().length) {
    //   fieldErrors.pass = "Password cannot contain spaces";
    //   hasError = true;
    // } else {
    //   if (pass2.length === 0) {
    //     fieldErrors.pass = "Password is required";
    //     hasError = true;
    //   } else {
    //     if (pass2.length < 3) {
    //       fieldErrors.pass = "Password must be at least 3 characters long";
    //       hasError = true;
    //     } else {
    if (pass1 !== pass2) {
      fieldErrors.pass = "Passwords must match";
      hasError = true;
    } else {
      fieldErrors.pass = "";
      hasError = false;
    }
    // }
    // }
    // }

    this.setState({
      validationMessages: fieldErrors,
      passValid: !hasError
    });
  };

  render() {
    if (this.state.signup) {
      return (
        <>
          <Title />
          <div className="page-message">
            <h1 className="page-message">
              Please sign up here to see, add, and edit your meals.
            </h1>
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
                onChange={e => this.handleSignUpPass(e.target.value)}
                value={this.state.pass}
                required
              />
              <br />
              <label htmlFor="password2">Confirm Password:</label>
              <input
                type="password"
                id="password2"
                placeholder="Confirm Password"
                onChange={e => this.validatePasswords(e.target.value)}
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
              disabled={!this.state.nameValid || !this.state.passValid}
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
          <div className="page-message">
            <h1 className="page-message">
              Please sign in here to see, add, and edit your meals.
            </h1>
          </div>
          <form
            onSubmit={e => {
              this.handleSignIn(e);
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
                onChange={e => this.handleSignInPass(e.target.value)}
                value={this.state.pass}
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
