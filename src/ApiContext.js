import React from "react";

export default React.createContext({
  loggedIn: false,
  currentMealIndex: 0,
  currentMeal: "",
  short: [],
  medium: [],
  long: [],
  nextMeal: () => {},
  deleteMeal: () => {},
  addMeal: () => {},
  editMeal: () => {},
  logIn: () => {}
});
