import React, { Component } from "react";
import ApiContext from "./ApiContext";
import Title from "./Title";
import Nav from "./Nav";
import ValidationError from "./ValidationError";
import config from "./config";

export default class EditMeal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meal: {},
      name: "",
      nameValid: true,
      validationMessages: {
        name: ""
      }
    };
  }
  static contextType = ApiContext;

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
      name: fieldValue
    });
  }
  handleSubmitMeal = e => {
    let { mealid, rotation } = this.props.location.state.meal;
    e.preventDefault();
    let mealName = e.target.mealName.value;
    let newRotation = e.target.rotation.value;
    let mealIndex = this.context.findMeal(mealid, rotation);
    const userid = this.context.userid;
    const newMeal = {
      meal: mealName,
      rotation: newRotation,
      userid: userid
    };
    fetch(`${config.API_ENDPOINT}/edit-meal/${mealid}`, {
      method: "PATCH",
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
        console.log(data);
        this.context.editMeal(mealIndex, rotation, mealName, newRotation);
      })
      .then(data => {
        this.props.history.push("/list");
        return data;
      })

      .catch(error => {
        console.error({ error });
      });
  };

  handleDeleteMeal = (mealid, rotation) => {
    fetch(`${config.API_ENDPOINT}/edit-meal/${mealid}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e));
        return res.json();
      })
      .then(data => {
        this.context.deleteMeal(mealid, rotation);
      })
      .then(data => {
        this.props.history.push("/list");
        return data;
      })

      .catch(error => {
        console.error({ error });
      });
  };

  render() {
    const { meal, rotation, mealid } = this.props.location.state.meal;
    let selectLabel = "";
    let rotationLabel = "";
    if (rotation === "short") {
      selectLabel = "short";
      rotationLabel = "Short";
    } else if (rotation === "medium") {
      selectLabel = "medium";
      rotationLabel = "Medium";
    } else {
      selectLabel = "long";
      rotationLabel = "Long";
    }

    return (
      <>
        <Nav />
        <Title />
        <div>
          <h1>Please edit your meal here.</h1>
        </div>
        <div>
          <h3>
            Current Name:
            <span className="mealSpan">{meal}</span> --- Rotation:
            <span className="mealSpan">{rotationLabel}</span>
          </h3>
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
              defaultValue={meal}
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
            <select id="rotation" name="rotation" defaultValue={selectLabel}>
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

        <button
          type="delete"
          id="bigDeleteBtn"
          className="submitBtn"
          onClick={() => {
            this.handleDeleteMeal(mealid, rotation);
          }}
        >
          YUCK! (Delete forever)
        </button>
      </>
    );
  }
}
