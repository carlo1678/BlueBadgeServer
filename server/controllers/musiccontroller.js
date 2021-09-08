const Express = require("express");
const validateJWT = require("../middleware/validate-jwt");
const router = Express.Router();
const { MusicModel } = require("../models");
const Music = require("../models/music");

router.post("/add", validateJWT, async (req, res) => {
  const { image, name } = req.body.music;
  const { id } = req.user;
  const musicFavorite = {
    image,
    name,
    owner: id,
  };
  try {
    const newSong = await MusicModel.create(musicFavorite);
    res.status(200).json(newSong);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/mine", validateJWT, async (req, res) => {
  let { id } = req.user;
  try {
    const entries = await MusicModel.findAll({
      where: {
        owner: id,
      },
    });
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.put("/update/:musicId", validateJWT, async (req, res) => {
  const { image, name } = req.body.music;
  const musicId = req.params.musicId;
  const userId = req.user.id;

  const query = {
    where: {
      id: musicId,
      owner: userId,
    },
  };

  const updatedSong = {
    image: image,
    name: name,
  };

  try {
    const update = await MusicModel.update(updatedSong, query);
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json({ error: err });
  }

  router.delete("/delete/:id", async (req, res) => {
    const ownerId = req.user.id;
    const musicId = req.params.id;

    try {
      const query = {
        where: {
          id: musicId,
          owner: ownerId,
        },
      };

      await MusicModel.destroy(query);
      res.status(200).json({ message: "Song Entry Removed" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });
});

module.exports = router;
