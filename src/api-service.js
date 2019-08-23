import TokenService from "./token-service";
import config from "./config";

const DinnerApiService = {
  getMeals() {
    return fetch(`${config.API_ENDPOINT}/meals`, {
      headers: { authorization: `basic ${TokenService.getAuthToken()}` }
    })
      .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e));
        return res.json();
      })
      .then(meals => {
        meals.forEach(meal => {
          this.handleAddMeal(meal.meal, meal.rotation);
        });
      })
      .catch(error => {
        console.error({ error });
      });
  },

  postMeal(meal, rotation) {
    return fetch(`${config.API_ENDPOINT}/meals`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `basic ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        meal,
        rotation
      })
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  }
};

export default DinnerApiService;
