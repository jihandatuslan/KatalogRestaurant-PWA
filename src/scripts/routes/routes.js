import home from "../views/pages/home";
import favorite from "../views/pages/favorite";
import Detail from "../views/pages/detail";

const routes = {
  "/": home, // default page
  "/favorite": favorite,
  "/home": home,
  "/detail/:id": Detail,
};

export default routes;
