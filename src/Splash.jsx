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
            tonight! 'How often' means you pick if each meal goes in the Short,
            Medium, or Long rotation. The pattern for choosing meals is based on
            the rotation you select for each one. It goes "Short => Medium =>
            Short => Medium => Short => Long. Let us know once you decide to
            enjoy that meal by clicking the "NEXT MEAL" button and the app will
            display the next meal in your sequence. This sequence works best if
            each rotation has a similar number of meals in its list.
          </p>
        </section>
        <section>
          <h2>Some meals just aren't a staple...</h2>
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
