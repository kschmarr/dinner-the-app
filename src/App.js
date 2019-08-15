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
      // mealCount: 0
    };
  }

  // The pattern for choosing Meals is SMSMSL (currentMealIndex%6 = 0 - 5)
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
  getUserId = token => {
    fetch(`${config.API_ENDPOINT}/users`, {
      headers: { authorization: `basic ${token}` }
    })
      .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e));
        return res.json();
      })
      .then(users => {
        let user = users.filter(
          user => user.token === `${TokenService.getAuthToken()}`
        )[0];
        this.setState({
          userid: user.userid,
          currentMealIndex: parseInt(user.meal_index),
          shortIndex: parseInt(user.short_index),
          mediumIndex: parseInt(user.medium_index),
          longIndex: parseInt(user.long_index)
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

    if (shortIndex > short.length) {
      this.setState({ shortIndex: 1 });
    }
    if (mediumIndex > medium.length) {
      this.setState({ mediumIndex: 1 });
    }
    if (longIndex > long.length) {
      this.setState({ longIndex: 1 });
    }
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
  // handleNextMeal = () => {
  //   console.log(this.state.currentMealIndex);

  //   this.setState({ currentMealIndex: this.state.currentMealIndex + 1 });
  //   setTimeout(function() {
  //     this.handleUpdates();
  //   }, 1000);
  // };
  handleNextMeal = () => {
    const { currentMealIndex, shortIndex, mediumIndex, longIndex } = this.state;
    this.setState({ currentMealIndex: currentMealIndex + 1 });

    this.handleUpdateDatabaseIndeces(
      currentMealIndex,
      shortIndex,
      mediumIndex,
      longIndex
    );
    this.handleUpdateStateIndeces(
      currentMealIndex,
      shortIndex,
      mediumIndex,
      longIndex
    );

    this.handleUpdateDateLastEaten();
    this.handleGetMeal();
    console.log(currentMealIndex);
  };

  handleUpdateDateLastEaten = () => {
    let mealid;
    if (this.state.currentMeal === undefined) {
      mealid = "1";
    } else {
      mealid = this.state.currentMeal.mealid;
    }
    const newDate = new Date();
    const newMeal = {
      date_last_eaten: newDate
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
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.error({ error });
      });
  };

  handleUpdateStateIndeces = (
    currentMealIndex,
    shortIndex,
    mediumIndex,
    longIndex
  ) => {
    if (
      currentMealIndex % 6 === 1 ||
      currentMealIndex % 6 === 3 ||
      currentMealIndex % 6 === 5
    ) {
      this.setState({ shortIndex: shortIndex + 1 });
    } else if (currentMealIndex % 6 === 2 || currentMealIndex % 6 === 4) {
      this.setState({ mediumIndex: mediumIndex + 1 });
    } else if (currentMealIndex % 6 === 0) {
      this.setState({ longIndex: longIndex + 1 });
    }
  };

  handleUpdateDatabaseIndeces = (
    currentMealIndex,
    shortIndex,
    mediumIndex,
    longIndex
  ) => {
    const { userid } = this.state;
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
      .then(data => {})
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
    // this.setState({ mealCount: this.state.mealCount + 1 });
  };

  handleEditMeal = (mealIndex, rotation, newMealName, newRotation) => {
    let oldRotation = rotation;
    let oldIndex = mealIndex;
    if (oldRotation === newRotation) {
      this.state[oldRotation].splice(oldIndex, 1, newMealName);
    } else {
      this.state[oldRotation].splice(oldIndex, 1);
      this.handleAddMeal(newMealName, newRotation);
    }
  };

  handleFindMeal = (mealid, rotation) => {
    //is there a way to use rotation as a variable to choose the array to search?
    let location;
    const { short, medium, long } = this.context;
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
        short: [...this.state.short.filter(e => e !== mealid)]
      });
    } else if (rotation === "medium") {
      this.setState({
        medium: [...this.state.medium.filter(e => e !== mealid)]
      });
    } else if (rotation === "long") {
      this.setState({
        long: [...this.state.long.filter(e => e !== mealid)]
      });
    }
  };
  handleLogIn = () => {
    this.setState({ loggedIn: this.state.loggedIn === true ? false : true });
  };
  componentDidMount() {
    this.getAllMeals();
  }

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
      getAllMeals: this.getAllMeals,
      getUserId: this.getUserId,
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
