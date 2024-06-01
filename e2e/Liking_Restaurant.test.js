const assert = require("assert");

Feature("Liking Restaurant");

Before(({ I }) => {
  I.amOnPage("/#/favorite");
});

Scenario("showing empty liked restaurants", ({ I }) => {
  I.seeElement("#restaurants");
  I.see("No favorite restaurants to display", "p");
});

Scenario("liking one restaurant", async ({ I }) => {
  I.see("No favorite restaurants to display", "p");
  I.amOnPage("/");

  I.seeElement(".restaurant-item__name");
  I.click(locate(".restaurant-item__name").first());
  const firstRestaurantName = await I.grabTextFrom(
    locate(".restaurant-item__name").first()
  );

  I.waitForElement("#likeButton", 10); // Tunggu elemen #likeButton muncul dengan timeout 10 detik
  I.seeElement("#likeButton");
  I.click("#likeButton");

  I.amOnPage("/#/favorite");
  I.seeElement(".restaurant-item");

  const likedRestaurantName = await I.grabTextFrom(".restaurant-item__name");
  assert.strictEqual(firstRestaurantName, likedRestaurantName);
});

Scenario("searching restaurant", async ({ I }) => {
  I.see("No favorite restaurants to display", "p");

  I.amOnPage("/");

  I.seeElement(".restaurant-item__name");

  const name = [];
  for (let i = 1; i <= 2; i++) {
    I.click(locate(".restaurant-item__name").at(i));

    I.waitForElement("#likeButton", 10); // Tunggu elemen #likeButton muncul dengan timeout 10 detik
    I.seeElement("#likeButton");
    I.click("#likeButton");
    // eslint-disable-next-line no-await-in-loop
    name.push(await I.grabTextFrom(".restaurant-item__name"));
    I.amOnPage("/");
  }

  I.amOnPage("/#/favorite");
  I.seeElement(".restaurant-item");

  // Memeriksa apakah elemen dapat diisi sebelum mengisi nilainya
  const isEditableElement = await I.executeScript(function () {
    const element = document.querySelector(".restaurant-item");
    return ["TEXTAREA", "DIV"].includes(element.tagName);
  });

  if (isEditableElement) {
    I.fillField(".restaurant-item", "e");
  } else {
    console.log("Element is not editable, skipping fillField action.");
  }

  const visibleLikedrestaurant = await I.grabNumberOfVisibleElements(
    ".restaurant-item"
  );
  assert.strictEqual(name.length, visibleLikedrestaurant);

  const searchQuery = name[1].substring(1, 2);
  I.fillField(".restaurant-item", searchQuery);
  I.pressKey("Enter");
  // mendapatkan daftar film yang sesuai dengan searchQuery
  const matchingRestaurants = name.filter(
    (title) => title.indexOf(searchQuery) !== -1
  );
  const visibleSearchedLikedRestaurants = await I.grabNumberOfVisibleElements(
    ".restaurant-item"
  );
  assert.strictEqual(
    matchingRestaurants.length,
    visibleSearchedLikedRestaurants
  );
  for (let i = 0; i < matchingRestaurants.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    const visibleTitle = await I.grabTextFrom(
      locate(".restaurant-item__name").at(i + 1)
    );
    assert.strictEqual(matchingRestaurants[i], visibleTitle);
  }
});

// Scenario("liking one restaurant", async ({ I }) => {
//   I.amOnPage("/#/favorite");
//   I.waitForElement("p");
//   I.see("No favorite restaurants to display", "p");

//   I.amOnPage("/");
//   I.waitForElement(".restaurant-item__name");
//   I.seeElement(".restaurant-item__name");

//   const firstRestaurantName = await I.grabTextFrom(
//     locate(".restaurant-item__name").first()
//   );

//   I.click(locate(".restaurant-item__name").first());

//   I.waitForElement("#likeButton", 10); // Tunggu elemen #likeButton muncul dengan timeout 10 detik
//   I.seeElement("#likeButton");
//   I.click("#likeButton");

//   I.amOnPage("/#/favorite");
//   I.waitForElement(".restaurant-item");
//   I.seeElement(".restaurant-item");

//   const likedRestaurantName = await I.grabTextFrom(".restaurant-item__name");
//   assert.strictEqual(likedRestaurantName, firstRestaurantName);
// });
