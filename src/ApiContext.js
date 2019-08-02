import React from "react";

export default React.createContext({
  loggedIn: false,
  currentDinnerIndex: 0,
  currentDinner: "",
  short: [],
  medium: [],
  long: [],
  nextDinner: () => {},
  deleteDinner: () => {},
  addDinner: () => {},
  editDinner: () => {},
  logIn: () => {}
});
