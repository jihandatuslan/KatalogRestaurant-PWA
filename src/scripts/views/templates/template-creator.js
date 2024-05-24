/* eslint-disable comma-dangle */
/* eslint-disable indent */
import CONFIG from "../../globals/config";

const createRestaurantDetailTemplate = (restaurant) => `
  <h2 class="restaurant__name">${restaurant.name}</h2>
  <div class="restaurant__description">
    <img class="restaurant__poster" crossorigin="anonymous"  src="${
      CONFIG.BASE_IMAGE_URL + restaurant.pictureId
    }" alt="${restaurant.name}" />
    <div class="restaurant__info">
      <h4>Address</h4>
      <p>${restaurant.address}</p>
      <h4>City</h4>
      <p>${restaurant.city}</p>
      <h4>Description</h4>
      <p>${restaurant.description}</p>
      <button id="favoriteButton" class="favorite-button">Add to Favorite</button>
    </div>
  </div>
  <div class="restaurant__descriptionkedua">
  <div class="restaurant__menus">
    <h3>Menus</h3>
    <div class="restaurant__menu">
      <div class="food">
        <h4>Foods</h4>
        <ul>
          ${restaurant.menus.foods
            .map((food) => `<li>${food.name}</li>`)
            .join("")}
        </ul>
      </div>
      <div class="drink">
        <h4>Drinks</h4>
        <ul>
          ${restaurant.menus.drinks
            .map((drink) => `<li>${drink.name}</li>`)
            .join("")}
        </ul>
      </div>
    </div>
  </div>
  <div class="restaurant__reviews">
    <h3>Customer Reviews</h3>
    <div class="reviews__item">
      ${restaurant.customerReviews
        .map(
          (review) => `
        <div class="review">
          <p><strong>${review.name}</strong></p>
          <p>${review.review}</p>
          <p>${review.date}</p>
        </div>
      `
        )
        .join("")}
    </div>
  </div>
  </div>
`;

const RestaurantItemTemplate = (restaurant) => `
  <div class="restaurant-item">
  <div class="restaurant-item__content">
    <img class="restaurant-item__image" crossorigin="anonymous"  src="${
      CONFIG.BASE_IMAGE_URL + restaurant.pictureId
    }" alt="${restaurant.name}">
    <div class="restaurant-item__content">
      <h3 class="restaurant-item__name"><a href="#/detail/${restaurant.id}">${
  restaurant.name
}</a></h3>
      <p class="restaurant-item__city">City: ${restaurant.city}</p>
      <p class="restaurant-item__rating">⭐️ Rating: ${restaurant.rating}</p>
      <p class="restaurant-item__description">${restaurant.description}</p>
    </div>
  </div>
`;

export { RestaurantItemTemplate, createRestaurantDetailTemplate };
