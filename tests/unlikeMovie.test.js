/* eslint-disable no-undef */
import LikeButtonInitiator from "../src/scripts/utils/like-button-initiator";
import FavoriterestaurantIdb from "../src/scripts/data/favoritedb-source";
import "fake-indexeddb/auto";

// eslint-disable-next-line no-undef
describe("Liking A restaurant", () => {
  it("should show the like button when the restaurant has not been liked before", async () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';

    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector("#likeButtonContainer"),
      restaurant: {
        id: 1,
      },
    });
    expect(
      // eslint-disable-next-line comma-dangle
      document.querySelector('[aria-label="like this restaurant"]')
    ).toBeTruthy();
  });
  it("should not show the unlike button when the restaurant has not been liked before", async () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector("#likeButtonContainer"),
      restaurant: {
        id: 1,
      },
    });
    expect(
      document.querySelector('[aria-label="unlike this restaurant"]')
    ).toBeFalsy();
  });
  it("should be able to like the restaurant", async () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector("#likeButtonContainer"),
      restaurant: {
        id: 1,
      },
    });
    document.querySelector("#likeButton").dispatchEvent(new Event("click"));

    // Memastikan film berhasil disukai
    const restaurant = await FavoriterestaurantIdb.getrestaurant(1);
    expect(restaurant).toEqual({ id: 1 });

    await FavoriterestaurantIdb.deleteRestaurant(1);
  });
});
