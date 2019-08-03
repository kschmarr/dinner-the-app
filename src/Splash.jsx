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
            dinner rotation!
          </blockquote>
        </section>
        <section>
          <h2>How does it work?</h2>
          <p>
            Simple. You tell us what you like to eat (or where) and how often
            you want to eat each dish, and we tell you what's for dinner
            tonight! Let us know if you decided to enjoy our selection or not
            and we'll offer a new idea next time you ask.
          </p>
        </section>
        <section>
          <h2>Some meals just aren't a staple</h2>
          <p>
            If you decide you want to eat spaghetti and meatballs less often,
            more often, or never (or if you figure out that you spelled it
            wrong) you can easily update your meal name and preference or delete
            it from the rotation.
          </p>
        </section>
        <Link to="/sign-in">OKAY, I get it!</Link>
      </>
    );
  }
}
