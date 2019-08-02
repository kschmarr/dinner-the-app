import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ApiContext from "./ApiContext";

import "./App.css";
import Main from "./Main";
import Splash from "./Splash";
import SignIn from "./SignIn";
import DinnerList from "./DinnerList";
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
      currentDinnerIndex: 0,
      currentDinner: "",
      shortIndex: 0,
      mediumIndex: 0,
      longIndex: 0,
      loggedIn: false
    };
  }

  // The pattern for choosing dinners is SMSLSM (currentDinnerIndex 0 - 5)
  // Keep track of which dinnerIndex, when I go to next meal I add one to dinnerIndex and the specific rotation index
  // Reset cDI at 6, reset rotation indeces after their length is exceeded

  // componentDidMount() {
  //   fetch(`${config.API_ENDPOINT}/dinners`)
  //     .then(data => {
  //       if (!data.ok) return data.json().then(e => Promise.reject(e));
  //       return Promise.all(data.json());
  //     })
  //     .then(json => {
  //       console.log(json);
  //       this.setState({ dinners: json.title });
  //     })
  // .then(res => {
  //   console.log(res[0].json());
  //   if (!res.ok) return res.json().then(e => Promise.reject(e));
  //   return Promise.all(res.json());
  // })
  // .then(dinners => {
  //   this.setState({ dinners });
  // })
  //     .catch(error => {
  //       console.error({ error });
  //     });
  // }

  handleNextDinner = () => {
    let {
      currentDinnerIndex,
      shortIndex,
      mediumIndex,
      longIndex,
      short,
      medium,
      long
    } = this.state;
    // if (currentDinnerIndex > 5) {
    //   currentDinnerIndex = 0;
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
      currentDinnerIndex % 6 === 0 ||
      currentDinnerIndex % 6 === 2 ||
      (currentDinnerIndex % 6) % 6 === 4
    ) {
      this.setState({ currentDinner: short[shortIndex] });
      this.setState({ shortIndex: shortIndex + 1 });
    } else if (currentDinnerIndex % 6 === 1 || currentDinnerIndex % 6 === 5) {
      this.setState({ currentDinner: medium[mediumIndex] });
      this.setState({ mediumIndex: mediumIndex + 1 });
    } else {
      this.setState({ currentDinner: long[longIndex] });
      this.setState({ longIndex: longIndex + 1 });
    }
    this.setState({ currentDinnerIndex: currentDinnerIndex + 1 });
  };
  handleAddDinner = (mealName, regularity) => {
    if (regularity === "short") {
      this.setState({ short: [...this.state.short, mealName] });
    } else if (regularity === "medium") {
      this.setState({ medium: [...this.state.medium, mealName] });
    } else if (regularity === "long") {
      this.setState({ long: [...this.state.long, mealName] });
    }
  };
  // handleDeleteDinner = dinner => {
  //   const newDinners = this.state.dinners.filter(each => each !== dinner);
  //   this.setState({ dinners: newDinners });
  // };
  handleLogIn = () => {
    this.setState({ loggedIn: this.state.loggedIn === true ? false : true });
  };
  render() {
    const value = {
      loggedIn: this.state.loggedIn,
      currentDinnerIndex: this.state.currentDinnerIndex,
      currentDinner: this.state.currentDinner,
      short: this.state.short,
      medium: this.state.medium,
      long: this.state.long,
      nextDinner: this.handleNextDinner,
      deleteDinner: this.handleDeleteDinner,
      addDinner: this.handleAddDinner,
      editDinner: this.handleEditDinner,
      logIn: this.handleLogIn
    };
    return (
      <ApiContext.Provider value={value}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Splash} />
            <Route exact path="/main" component={Main} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/addmeal" component={AddMeal} />
            <Route exact path="/editmeal/:mealid" component={EditMeal} />
            <Route exact path="/list" component={DinnerList} />
          </div>
        </Router>
      </ApiContext.Provider>
    );
  }
}

export default App;
