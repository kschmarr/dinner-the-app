import React, { Component } from "react";
import ApiContext from "./ApiContext";
import Title from "./Title";
import Nav from "./Nav";
import ValidationError from "./ValidationError";
import config from "./config";

export default class AddMeal extends Component {
  static contextType = ApiContext;
  constructor(props) {
    super(props);
    this.state = {
      meal: "",
      nameValid: false,
      validationMessages: {
        name: ""
      }
    };
  }
  handleSubmitMeal = e => {
    e.preventDefault();
    const { meal } = this.state;
    const rotation = e.target.rotation.value;
    const userid = this.context.userid;
    const newMeal = {
      meal: meal,
      rotation: rotation,
      userid: userid
    };
    fetch(`${config.API_ENDPOINT}/meals`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(newMeal)
    })
      .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e));
        return res.json();
      })
      .then(data => {
        this.context.addMeal(meal, rotation);
      })
      .then(data => {
        this.props.history.push("/list");
        return data;
      })

      .catch(error => {
        console.error({ error });
      });
  };

  validateName(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;
    fieldValue = fieldValue.trim();
    if (fieldValue.length === 0) {
      fieldErrors.name = "Name is required";
      hasError = true;
    } else {
      if (fieldValue.length < 3) {
        fieldErrors.name = "Name must be at least 3 characters long";
        hasError = true;
      } else {
        fieldErrors.name = "";
        hasError = false;
      }
    }

    this.setState({
      validationMessages: fieldErrors,
      nameValid: !hasError,
      meal: fieldValue
    });
  }

  render() {
    return (
      <>
        <Nav />
        <Title />
        <div>
          <h1>Please add your meals here.</h1>
        </div>
        <form
          onSubmit={e => {
            this.handleSubmitMeal(e);
          }}
        >
          <div id="mealNameDiv" className="label-container">
            <label htmlFor="mealName">Meal Name:</label>
            <input
              type="text"
              id="mealName"
              name="mealName"
              placeholder="Meal Name"
              onChange={e => this.validateName(e.target.value)}
              required
            />
            <ValidationError
              hasError={!this.state.nameValid}
              message={this.state.validationMessages.name}
            />
          </div>

          <div id="rotationDiv">
            <label htmlFor="rotation">Rotation:</label>
            <select id="rotation" name="rotation">
              <option value="short">Short</option>
              <option value="medium">Medium</option>
              <option value="long">Long</option>
            </select>
          </div>
          <button
            type="submit"
            className="submitBtn"
            disabled={!this.state.nameValid}
          >
            Submit Meal
          </button>
        </form>
      </>
    );
  }
}
