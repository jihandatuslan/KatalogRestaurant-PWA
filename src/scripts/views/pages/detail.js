import UrlParser from "../../routes/url-parser";
import RestaurantList from "../../data/restaurantdb-source";
import { createRestaurantDetailTemplate } from "../templates/template-creator";

const Detail = {
  async render() {
    return `
      <div id="restaurant" class="restaurant"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantList.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector("#restaurant");

    if (restaurant) {
      // eslint-disable-next-line operator-linebreak
      restaurantContainer.innerHTML =
        createRestaurantDetailTemplate(restaurant);

      const favoriteButton = document.querySelector("#favoriteButton");

      const isFavorite = await RestaurantList.isRestaurantFavorite(
        // eslint-disable-next-line comma-dangle
        restaurant.id
      );
      favoriteButton.textContent = isFavorite
        ? "Remove from Favorite"
        : "Add to Favorite";

      favoriteButton.addEventListener("click", async () => {
        if (isFavorite) {
          await RestaurantList.removeFavoriteRestaurant(restaurant.id);
          favoriteButton.textContent = "Add to Favorite";
        } else {
          await RestaurantList.addFavoriteRestaurant(restaurant);
          favoriteButton.textContent = "Remove from Favorite";
        }
      });
    } else {
      // eslint-disable-next-line operator-linebreak
      restaurantContainer.innerHTML =
        "<p>Restaurant data is not available.</p>";
    }
  },
};

export default Detail;
