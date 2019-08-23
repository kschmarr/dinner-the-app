import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ApiContext from "./ApiContext";
import TokenService from "./token-service";
import "./App.css";
import Main from "./Main";
import Splash from "./Splash";
import SignIn from "./SignIn";
import MealList from "./MealList";
import AddMeal from "./AddMeal";
import EditMeal from "./EditMeal";
import config from "./config";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      short: [],
      medium: [],
      long: [],
      currentMealIndex: 0,
      currentMeal: {
        meal: "",
        mealid: "",
        userid: "",
        rotation: "",
        date_last_eaten: ""
      },
      shortIndex: 0,
      mediumIndex: 0,
      longIndex: 0,
      userid: 0
    };
  }

  getAllMeals = () => {
    this.setState({ short: [], medium: [], long: [] });
    fetch(`${config.API_ENDPOINT}/meals`, {
      headers: { authorization: `basic ${TokenService.getAuthToken()}` }
    })
      .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e));
        return res.json();
      })
      .then(meals => {
        meals.forEach(meal => {
          if (meal.userid === this.state.userid) {
            this.handleAddMeal(meal);
          }
        });
      })
      .catch(error => {
        console.error({ error });
      });
  };

  handleGetMeal = () => {
    let {
      currentMealIndex,
      shortIndex,
      mediumIndex,
      longIndex,
      short,
      medium,
      long
    } = this.state;

    if (
      currentMealIndex % 6 === 1 ||
      currentMealIndex % 6 === 3 ||
      currentMealIndex % 6 === 5
    ) {
      this.setState({ currentMeal: short[shortIndex - 1] });
    } else if (currentMealIndex % 6 === 2 || currentMealIndex % 6 === 4) {
      this.setState({ currentMeal: medium[mediumIndex - 1] });
    } else if (currentMealIndex % 6 === 0) {
      this.setState({ currentMeal: long[longIndex - 1] });
    }
  };

  handleNextMeal = () => {
    this.handleUpdateDateLastEaten();

    this.handleUpdateDatabaseIndeces();
  };

  handleUpdateDateLastEaten = () => {
    let { mealid, rotation, userid } = this.state.currentMeal;
    let mealIndex = this.handleFindMeal(mealid, rotation);

    const newDate = new Date();
    const newMeal = {
      date_last_eaten: newDate,
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
      .then(meal => {
        this.state[rotation].splice(mealIndex, 1, meal);
      })
      .catch(error => {
        console.error({ error });
      });
  };

  handleUpdateStateIndeces = newIndeces => {
    this.setState({
      currentMealIndex: newIndeces.meal_index,
      shortIndex: newIndeces.short_index,
      mediumIndex: newIndeces.medium_index,
      longIndex: newIndeces.long_index
    });
    this.handleGetMeal();
  };

  handleSetUser = user => {
    this.setState({
      currentMealIndex: user.meal_index,
      shortIndex: user.short_index,
      mediumIndex: user.medium_index,
      longIndex: user.long_index,
      userid: user.userid.toString()
    });
    this.handleGetMeal();
  };

  handleUpdateDatabaseIndeces = () => {
    let {
      userid,
      currentMealIndex,
      shortIndex,
      mediumIndex,
      longIndex,
      short,
      medium,
      long
    } = this.state;

    currentMealIndex = currentMealIndex + 1;

    if (
      currentMealIndex % 6 === 1 ||
      currentMealIndex % 6 === 3 ||
      currentMealIndex % 6 === 5
    ) {
      shortIndex = shortIndex + 1;
    } else if (currentMealIndex % 6 === 2 || currentMealIndex % 6 === 4) {
      mediumIndex = mediumIndex + 1;
    } else if (currentMealIndex % 6 === 0) {
      longIndex = longIndex + 1;
    }

    if (shortIndex > short.length) {
      shortIndex = 1;
    }
    if (mediumIndex > medium.length) {
      mediumIndex = 1;
    }
    if (longIndex > long.length) {
      longIndex = 1;
    }

    const updatedUser = {
      meal_index: currentMealIndex,
      short_index: shortIndex,
      medium_index: mediumIndex,
      long_index: longIndex
    };

    fetch(`${config.API_ENDPOINT}/users/${userid}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(updatedUser)
    })
      .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e));
        return res.json();
      })
      .then(newIndeces => {
        this.handleUpdateStateIndeces(newIndeces);
      })
      .catch(error => {
        console.error({ error });
      });
  };

  handleAddMeal = meal => {
    let { rotation } = meal;

    if (rotation === "short") {
      this.setState({ short: [...this.state.short, meal] });
    } else if (rotation === "medium") {
      this.setState({ medium: [...this.state.medium, meal] });
    } else if (rotation === "long") {
      this.setState({ long: [...this.state.long, meal] });
    }
  };

  handleEditMeal = (oldIndex, oldRotation, newMeal, newRotation) => {
    if (oldRotation === newRotation) {
      this.state[oldRotation].splice(oldIndex, 1, newMeal);
    } else {
      this.state[oldRotation].splice(oldIndex, 1);
      this.handleAddMeal(newMeal);
    }
  };
  handleFindMeal = (mealid, rotation) => {
    let location;
    const { short, medium, long } = this.state;
    if (rotation === "short") {
      short.forEach((item, index) => {
        if (item.mealid === mealid) {
          location = index;
        }
      });
    }
    if (rotation === "medium") {
      medium.forEach((item, index) => {
        if (item.mealid === mealid) {
          location = index;
        }
      });
    }
    if (rotation === "long") {
      long.forEach((item, index) => {
        if (item.mealid === mealid) {
          location = index;
        }
      });
    }
    return location;
  };

  handleDeleteMeal = (mealid, rotation) => {
    if (rotation === "short") {
      this.setState({
        short: [...this.state.short.filter(e => e.mealid !== mealid)]
      });
    } else if (rotation === "medium") {
      this.setState({
        medium: [...this.state.medium.filter(e => e.mealid !== mealid)]
      });
    } else if (rotation === "long") {
      this.setState({
        long: [...this.state.long.filter(e => e.mealid !== mealid)]
      });
    }
  };
  handleLogIn = () => {
    this.setState({ loggedIn: this.state.loggedIn === true ? false : true });
  };

  render() {
    const value = {
      currentMealIndex: this.state.currentMealIndex,
      currentMeal: this.state.currentMeal,
      short: this.state.short,
      medium: this.state.medium,
      long: this.state.long,
      userid: this.state.userid,
      nextMeal: this.handleNextMeal,
      getMeal: this.handleGetMeal,
      deleteMeal: this.handleDeleteMeal,
      findMeal: this.handleFindMeal,
      addMeal: this.handleAddMeal,
      editMeal: this.handleEditMeal,
      setUser: this.handleSetUser,
      getAllMeals: this.getAllMeals,
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
