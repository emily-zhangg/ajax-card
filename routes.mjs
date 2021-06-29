import db from "./models/index.mjs";

// import your controllers here
import initUserController from "./controllers/user.mjs";
import initGameController from "./controllers/game.mjs";
// import initGamesUserController from "./controllers/gamesUser.mjs";

export default function bindRoutes(app) {
  // initialize the controller functions here
  // pass in the db for all callbacks
  const UserController = initUserController(db);
  const GameController = initGameController(db);

  // define your route matchers here using app
  // index
  app.get("/", GameController.index);
  app.get("/match", GameController.create);
  app.get("/login", UserController.login);
  app.post("/login", UserController.loggedIn);
  app.post("/gameResult", GameController.game);
}
