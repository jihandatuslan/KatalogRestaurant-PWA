import UrlParser from "../../routes/url-parser";
import RestaurantList from "../../data/restaurantdb-source";
import {
  createLikeButtonTemplate,
  createRestaurantDetailTemplate,
} from "../templates/template-creator";
import LikeButtonInitiator from "../../utils/like-button-initiator";

const Detail = {
  async render() {
    return `
      <div id="restaurant" class="restaurant"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantList.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector("#restaurant");
    const likeButtonContainer = document.querySelector("#likeButtonContainer");

    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);
    likeButtonContainer.innerHTML = createLikeButtonTemplate();

    // eslint-disable-next-line no-undef
    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector("#likeButtonContainer"),
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        pictureId: restaurant.pictureId,
        city: restaurant.city,
        rating: restaurant.rating,
      },
    });
  },
  catch(error) {
    console.error("Error in rendering the detail page:", error);
  },
};

export default Detail;
