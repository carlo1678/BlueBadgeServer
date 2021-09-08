const Express = require("express");
const validateJWT = require("../middleware/validate-jwt");
const router = Express.Router();
const { MovieModel } = require("../models");
const Movie = require("../models/movies");

router.post("/add", validateJWT, async (req, res) => {
  const { title, date } = req.body.movie;
  const { id } = req.user;
  const movieFavorite = {
    title,
    date,
    owner: id,
  };
  try {
    const newMovie = await MovieModel.create(movieFavorite);
    res.status(200).json(newMovie);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/mine", validateJWT, async (req, res) => {
  let { id } = req.user;
  try {
    const entries = await MovieModel.findAll({
      where: {
        owner: id,
      },
    });
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.put("/update/:movieId", validateJWT, async (req, res) => {
  const { title, date } = req.body.movie;
  const movieId = req.params.entryId;
  const userId = req.user.id;

  const query = {
    where: {
      id: movieId,
      owner: userId,
    },
  };

  const updatedMovie = {
    title: title,
    date: date,
  };

  try {
    const update = await MovieModel.update(updatedMovie, query);
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json({ error: err });
  }

  router.delete("/delete/:id", async (req, res) => {
    const ownerId = req.user.id;
    const movieId = req.params.id;

    try {
      const query = {
        where: {
          id: movieId,
          owner: ownerId,
        },
      };

      await MovieModel.destroy(query);
      res.status(200).json({ message: "Movie Entry Removed" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });
});

module.exports = router;
