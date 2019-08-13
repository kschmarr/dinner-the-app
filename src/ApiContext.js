import React from "react";

export default React.createContext({
  loggedIn: false,
  currentMealIndex: 0,
  currentMeal: {},
  userid: 0,
  short: [],
  medium: [],
  long: [],
  nextMeal: () => {},
  getMeal: () => {},
  deleteMeal: () => {},
  addMeal: () => {},
  editMeal: () => {},
  getUserId: () => {},
  logIn: () => {}
});
