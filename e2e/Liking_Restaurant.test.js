/* eslint-disable no-undef */
Feature("Liking Restaurant");

Before(({ I }) => {
  I.amOnPage("/#/favorite");
});

Scenario("showing empty liked movies", ({ I }) => {
  I.seeElement("#restaurants");
  I.see("No favorite restaurants to display", "p");
});

Scenario("liking one restaurant", ({ I }) => {
  I.see("No favorite restaurants to display", "p");

  I.amOnPage("/");

  I.seeElement(".restaurant-item__name a");
  I.click(locate(".restaurant-item__name a").first());

  I.seeElement("#likeButton");
  I.click("#likeButton");

  I.amOnPage("/#/favorite");
  I.seeElement(".restaurant-item");
});

Scenario("unliking one restaurant", ({ I }) => {
  I.see("No favorite restaurants to display", "p");

  I.amOnPage("/#/favorite");

  I.see("No favorite restaurants to display", "p");

  I.amOnPage("/");

  I.seeElement(".restaurant-item__name a");
  I.click(locate(".restaurant-item__name a").first());

  I.seeElement("#likeButton");
  I.click("#likeButton");

  I.amOnPage("/#/favorite");
  I.seeElement(".restaurant-item");

  I.click(locate(".restaurant-item__name a").first());

  I.seeElement("#likeButton");
  I.click("#likeButton");

  I.amOnPage("/#/favorite");
  I.see("No favorite restaurants to display", "p");
});
