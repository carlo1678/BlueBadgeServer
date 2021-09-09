const Express = require("express");
const router = Express.Router();
const validateJWT = require("../middleware/validate-jwt");
const { GameModel } = require("../models");
const Game = require("../models/games");

router.post("/add", validateJWT, async (req, res) => {
  const { image, name } = req.body.game;
  const { id } = req.user;
  const gameFavorite = {
    image,
    name,
    owner: id,
  };
  try {
    const newGame = await GameModel.create(gameFavorite);
    res.status(200).json(newGame);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/mine", validateJWT, async (req, res) => {
  let { id } = req.user;
  try {
    const entries = await GameModel.findAll({
      where: {
        owner: id,
      },
    });
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.put("/update/:gameId", validateJWT, async (req, res) => {
  const { image, name } = req.body.game;
  const gameId = req.params.gameId;
  const userId = req.user.id;

  const query = {
    where: {
      id: gameId,
      owner: userId,
    },
  };

  const updatedGame = {
    image: image,
    name: name,
  };

  try {
    const update = await GameModel.update(updatedGame, query);
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.delete("/delete/:id", validateJWT, async (req, res) => {
  const ownerId = req.user.id;
  const gameId = req.params.id;

  try {
    const query = {
      where: {
        id: gameId,
        owner: ownerId,
      },
    };

    const deleteGame = await GameModel.destroy(query);
    res.status(200).json(deleteGame);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
