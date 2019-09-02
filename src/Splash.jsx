import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Splash extends Component {
  render() {
    return (
      <>
        <section>
          <h2>What's the purpose of this wonderful app?</h2>
          <blockquote>
            To improve your everyday life by telling you what's up next in your
            dinner rotation! This is a meal list, weighted by preference.
          </blockquote>
        </section>
        <section>
          <h2>How does it work?</h2>
          <p>
            Simple. You tell us the name of a meal and pick if it goes in the
            Short, Medium, or Long rotation. Do this for all the meals on your
            family's menu. The pattern for choosing meals is based on the
            rotation you select for each one. <br />
            It goes: Short => Medium => Short => Medium => Short => Long. <br />
            Let us know once you decide to enjoy the current meal by clicking
            the "NEXT MEAL" button and the app will display the next meal in
            your sequence. This program works best if each rotation list has a
            similar number of meals.
          </p>
        </section>
        <section>
          <h2>Some meals need a tweak...</h2>
          <p>
            If you decide you want to edit a meal, you can easily update the
            meal's name, which rotation list it belongs to, or even delete it
            entirely.
          </p>
        </section>
        <section>
          <h2>Just want to have a peek? Use these demo credentials:</h2>
          <p>
            Username: Kris Password: lucky Please be respectful in how you
            utilize this public user. Thanks -Management.
          </p>
        </section>
        <Link to="/sign-in">
          <button>OKAY, I get it!</button>
        </Link>
      </>
    );
  }
}
