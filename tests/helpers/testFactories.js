import LikeButtonInitiator from "../../src/scripts/utils/LikeButtonPresenter";

const createLikeButtonPresenterWithrestaurant = async (restaurant) => {
  await LikeButtonInitiator.init({
    likeButtonContainer: document.querySelector("#likeButtonContainer"),
    restaurant,
  });
};
// eslint-disable-next-line import/prefer-default-export
export { createLikeButtonPresenterWithrestaurant };
