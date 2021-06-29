export default function initGameController(db) {
  const index = (req, res) => {
    res.render("root", {});
  };
  const create = async (req, res) => {
    const users = await db.User.findAll();
    res.send({ users, userCookie: req.cookies.userId });
  };
  const game = async (req, res) => {
    const gameResult = await db.Game.create({
      game_state: { drawPile: req.body[1], discardPile: req.body[0] },
    });
    console.log(gameResult);
    const gameUserEntry = await db.GamesUser.create({
      userId: req.body[2],
      gameId: gameResult.dataValues.id,
    });
    console.log(req.body);
    console.log(gameUserEntry);
    res.send("done");
  };
  return { index, create, game };
}
