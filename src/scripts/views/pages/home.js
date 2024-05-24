import RestaurantList from "../../data/restaurantdb-source";
import { RestaurantItemTemplate } from "../templates/template-creator";

const home = {
  async render() {
    return `
    <section class="hero">
    <div class="kata">
      <h1>Selamat jelajahi tempat kulineran ternyaman anda!</h1>
      <p>
        Temukan keunggulan kuliner Indonesia di restoran terbaik dan rasakan
        pengalaman kuliner tak terlupa dengan berbagai menu lezat dan
        menikmati cita rasa dari berbagai daerah di indonesia.
      </p>
    </div>
  </section>
  <div class="content">
    <h2 class="content__heading">Explore Restaurant</h2>
    <div id="restaurants" class="restaurants">
    </div>
  </div>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantList.fetchRestaurantList();
    console.log("Fetched restaurants:", restaurants);

    const restaurantsContainer = document.getElementById("restaurants");
    if (restaurants && restaurants.length > 0) {
      restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML += RestaurantItemTemplate(restaurant);
      });
    } else {
      restaurantsContainer.innerHTML = "<p>No restaurants found</p>";
    }
  },
};

export default home;
