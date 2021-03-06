import React from "react";

export default React.createContext({
  loggedIn: false,
  currentMealIndex: 0,
  currentMeal: {
    meal: "",
    mealid: "",
    userid: "",
    rotation: "",
    date_last_eaten: ""
  },
  userid: 0,
  short: [],
  medium: [],
  long: [],
  nextMeal: () => {},
  getMeal: () => {},
  findMeal: () => {},
  deleteMeal: () => {},
  addMeal: () => {},
  setUser: () => {},
  editMeal: () => {},
  logIn: () => {}
});
