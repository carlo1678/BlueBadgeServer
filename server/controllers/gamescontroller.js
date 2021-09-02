const Express = require("express");
const router = Express.Router();
// const validateJWT = require("../middleware/validate-jwt");
const { GameModel } = require("../models");
const Game = require("../models/games");

router.post("/add", async (req, res) => {
  const { title, date } = req.body.game;
  const { id } = req.user;
  const gameFavorite = {
    title,
    date,
    owner: id,
  };
  try {
    const newGame = await GameModel.create(gameFavorite);
    res.status(200).json(newGame);
  } catch (err) {
    res.status(500).json({ error: err });
  }
  GameModel.create(gameFavorite);
});

router.put("/update/:gameId", async (req, res) => {
  const { title, date } = req.body.game;
  const gameId = req.params.gameId;
  const userId = req.user.id;

  const query = {
    where: {
      id: gameId,
      owner: userId,
    },
  };

  const updatedGame = {
    title: title,
    date: date,
  };

  try {
    const update = await GameModel.update(updatedGame, query);
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
