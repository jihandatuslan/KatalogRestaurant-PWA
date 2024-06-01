import LikeButtonInitiator from "../../src/scripts/utils/LikeButtonPresenter";
const createLikeButtonPresenterWithrestaurant = async (restaurant) => {
  await LikeButtonInitiator.init({
    likeButtonContainer: document.querySelector("#likeButtonContainer"),
    restaurant,
  });
};
export { createLikeButtonPresenterWithrestaurant };
