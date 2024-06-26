import FavoriterestaurantIdb from "../src/scripts/data/favoritedb-source";
import * as TestFactories from "./helpers/testFactories";

describe("Unliking A restaurant", () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriterestaurantIdb.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavoriterestaurantIdb.deleteRestaurant(1);
  });

  it("should display unlike widget when the restaurant has been liked", async () => {
    await TestFactories.createLikeButtonPresenterWithrestaurant({ id: 1 });

    expect(
      document.querySelector('[aria-label="unlike this restaurant"]')
    ).toBeTruthy();
  });

  it("should not display like widget when the restaurant has been liked", async () => {
    await TestFactories.createLikeButtonPresenterWithrestaurant({ id: 1 });

    expect(
      document.querySelector('[aria-label="like this restaurant"]')
    ).toBeFalsy();
  });
  it("should be able to remove liked restaurant from the list", async () => {
    await TestFactories.createLikeButtonPresenterWithrestaurant({ id: 1 });
    document
      .querySelector('[aria-label="unlike this restaurant"]')
      .dispatchEvent(new Event("click"));
    expect(await FavoriterestaurantIdb.getAllRestaurants()).toEqual([]);
  });
  it("should not throw error when user click unlike widget if the unliked restaurant is not in the list", async () => {
    await TestFactories.createLikeButtonPresenterWithrestaurant({ id: 1 });
    // Hapus dulu film dari daftar film yang disukai
    await FavoriterestaurantIdb.deleteRestaurant(1);
    // Kemudian, simulasikan pengguna menekan widget batal menyukai film
    document
      .querySelector('[aria-label="unlike this restaurant"]')
      .dispatchEvent(new Event("click"));
    expect(await FavoriterestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
