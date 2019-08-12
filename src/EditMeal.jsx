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
    e.preventDefault();
    let mealName = e.target.mealName.value;
    let newRegularity = e.target.regularity.value;
    let mealSource = this.findMeal(this.props.location.state.meal);
    const userid = this.context.userid;
    const newMeal = {
      meal: mealName,
      rotation: newRegularity,
      userid: userid
    };
    fetch(`${config.API_ENDPOINT}/meals`, {
      method: "UPDATE",
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
        this.context.editMeal(mealSource, mealName, newRegularity);
      })
      .then(data => {
        this.props.history.push("/list");
        return data;
      })

      .catch(error => {
        console.error({ error });
      });
  };
  //   const { meal } = this.state;
  // const regularity = e.target.regularity.value;
  // const userid = this.context.userid;
  // console.log(this.state.meal, regularity, userid);
  // const newMeal = {
  //   meal: meal,
  //   rotation: regularity,
  //   userid: userid
  // };
  // fetch(`${config.API_ENDPOINT}/meals`, {
  //   method: "POST",
  //   headers: {
  //     "content-type": "application/json"
  //   },
  //   body: JSON.stringify(newMeal)
  // })
  //   .then(res => {
  //     if (!res.ok) return res.json().then(e => Promise.reject(e));
  //     return res.json();
  //   })
  //   .then(data => {
  //     console.log(data);
  //     this.context.addMeal(meal, regularity);
  //   })
  //   .then(data => {
  //     this.props.history.push("/list");
  //     return data;
  //   })

  //   .catch(error => {
  //     console.error({ error });
  //   });
  handleDeleteMeal = (meal, regularity) => {
    this.context.deleteMeal(meal, regularity);
    this.props.history.push("/list");
  };
  findMeal = meal => {
    if (this.context.short.includes(meal)) {
      return ["short", this.context.short.findIndex(value => value === meal)];
    } else if (this.context.medium.includes(meal)) {
      return ["medium", this.context.medium.findIndex(value => value === meal)];
    } else {
      return ["long", this.context.long.findIndex(value => value === meal)];
    }
  };

  render() {
    const { meal } = this.props.location.state;
    let selectLabel = "";
    let regularityLabel = "";
    let value = this.findMeal(meal);
    if (value[0] === "short") {
      selectLabel = "short";
      regularityLabel = "Regularly";
    } else if (value[0] === "medium") {
      selectLabel = "medium";
      regularityLabel = "Sparingly";
    } else {
      selectLabel = "long";
      regularityLabel = "Rarely";
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
            <span className="mealSpan">{meal}</span> --- Regularity:
            <span className="mealSpan">{regularityLabel}</span>
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

          <div id="regularityDiv">
            <label htmlFor="regularity">Regularity:</label>
            <select
              id="regularity"
              name="regularity"
              defaultValue={selectLabel}
            >
              <option value="short">Regularly</option>
              <option value="medium">Sparingly</option>
              <option value="long">Rarely</option>
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
            this.handleDeleteMeal(meal, value[0]);
          }}
        >
          YUCK! (Delete forever)
        </button>
      </>
    );
  }
}
