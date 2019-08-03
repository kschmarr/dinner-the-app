import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ApiContext from "./ApiContext";

import "./App.css";
import Main from "./Main";
import Splash from "./Splash";
import SignIn from "./SignIn";
import MealList from "./MealList";
import AddMeal from "./AddMeal";
import EditMeal from "./EditMeal";
// import config from "./config";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      short: ["Thai Curry", "Chili", "Chicken Pot Pie", "Tacos"],
      medium: ["Pasta", "Pizza", "Tikka Masala"],
      long: ["Meatloaf", "Steak"],
      restaurants: {},
      currentMealIndex: 0,
      currentMeal: "",
      shortIndex: 0,
      mediumIndex: 0,
      longIndex: 0,
      loggedIn: false
    };
  }

  // The pattern for choosing Meals is SMSLSM (currentMealIndex 0 - 5)
  // Keep track of which MealIndex, when I go to next meal I add one to MealIndex and the specific rotation index
  // Reset cDI at 6, reset rotation indeces after their length is exceeded

  // componentDidMount() {
  //   fetch(`${config.API_ENDPOINT}/meals`)
  //     .then(data => {
  //       if (!data.ok) return data.json().then(e => Promise.reject(e));
  //       return Promise.all(data.json());
  //     })
  //     .then(json => {
  //       console.log(json);
  //       this.setState({ Meals: json.title });
  //     })
  // .then(res => {
  //   console.log(res[0].json());
  //   if (!res.ok) return res.json().then(e => Promise.reject(e));
  //   return Promise.all(res.json());
  // })
  // .then(meals => {
  //   this.setState({ meals });
  // })
  //     .catch(error => {
  //       console.error({ error });
  //     });
  // }

  handleNextMeal = () => {
    let {
      currentMealIndex,
      shortIndex,
      mediumIndex,
      longIndex,
      short,
      medium,
      long
    } = this.state;
    // if (currentMealIndex > 5) {
    //   currentMealIndex = 0;
    // }
    if (shortIndex > short.length - 1) {
      this.setState({ shortIndex: 0 });
    }
    if (mediumIndex > medium.length - 1) {
      this.setState({ mediumIndex: 0 });
    }
    if (longIndex > long.length - 1) {
      this.setState({ longIndex: 0 });
    }
    if (
      currentMealIndex % 6 === 0 ||
      currentMealIndex % 6 === 2 ||
      currentMealIndex % 6 === 4
    ) {
      this.setState({ currentMeal: short[shortIndex] });
      this.setState({ shortIndex: shortIndex + 1 });
    } else if (currentMealIndex % 6 === 1 || currentMealIndex % 6 === 5) {
      this.setState({ currentMeal: medium[mediumIndex] });
      this.setState({ mediumIndex: mediumIndex + 1 });
    } else {
      this.setState({ currentMeal: long[longIndex] });
      this.setState({ longIndex: longIndex + 1 });
    }
    this.setState({ currentMealIndex: currentMealIndex + 1 });
  };
  handleAddMeal = (meal, regularity) => {
    if (regularity === "short") {
      this.setState({ short: [...this.state.short, meal] });
    } else if (regularity === "medium") {
      this.setState({ medium: [...this.state.medium, meal] });
    } else if (regularity === "long") {
      this.setState({ long: [...this.state.long, meal] });
    }
  };
  handleEditMeal = (mealSource, newMealName, newRegularity) => {
    let oldRegularity = mealSource[0];
    let oldIndex = mealSource[0];
    if (oldRegularity === newRegularity) {
      this.state[oldRegularity].splice(oldIndex, 1, newMealName);
    } else {
      this.state[oldRegularity].splice(oldIndex, 1);
      this.handleAddMeal(newMealName, newRegularity);
    }
  };
  handleDeleteMeal = (meal, regularity) => {
    if (regularity === "short") {
      this.setState({
        short: [...this.state.short.filter(e => e !== meal)]
      });
    } else if (regularity === "medium") {
      this.setState({
        medium: [...this.state.medium.filter(e => e !== meal)]
      });
    } else if (regularity === "long") {
      this.setState({
        long: [...this.state.long.filter(e => e !== meal)]
      });
    }
  };
  handleLogIn = () => {
    this.setState({ loggedIn: this.state.loggedIn === true ? false : true });
  };
  render() {
    const value = {
      loggedIn: this.state.loggedIn,
      currentMealIndex: this.state.currentMealIndex,
      currentMeal: this.state.currentMeal,
      short: this.state.short,
      medium: this.state.medium,
      long: this.state.long,
      nextMeal: this.handleNextMeal,
      deleteMeal: this.handleDeleteMeal,
      addMeal: this.handleAddMeal,
      editMeal: this.handleEditMeal,
      logIn: this.handleLogIn
    };
    return (
      <ApiContext.Provider value={value}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Splash} />
            <Route exact path="/main" component={Main} />
            <Route exact path="/sign-in" component={SignIn} />
            <Route exact path="/add-meal" component={AddMeal} />
            <Route exact path="/edit-meal/:meal" component={EditMeal} />
            <Route exact path="/list" component={MealList} />
          </div>
        </Router>
      </ApiContext.Provider>
    );
  }
}

export default App;
