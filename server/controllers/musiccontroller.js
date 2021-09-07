const Express = require("express");
const router = Express.Router();
const { MusicModel } = require("../models");
const Music = require("../models/music");

router.post("/add", async (req, res) => {
  const { title, date } = req.body.music;
  const { id } = req.user;
  const musicFavorite = {
    title,
    date,
    owner: id,
  };
  try {
    const newSong = await MusicModel.create(musicFavorite);
    res.status(200).json(newSong);
  } catch (err) {
    res.status(500).json({ error: err });
  }
  MusicModel.create(musicFavorite);
});

router.get("/", async (req, res) => {
  try{
    const entries = await MusicModel.findAll();
    res.status(200).json(entries);
  } catch(err){
    res.status(500).json({error: err});
  }
});

router.put("/update/:musicId", async (req, res) => {
  const { title, date } = req.body.music;
  const musicId = req.params.musicId;
  const userId = req.user.id;

  const query = {
    where: {
      id: musicId,
      owner: userId,
    },
  };

  const updatedSong = {
    title: title,
    date: date,
  };

  try {
    const update = await MusicModel.update(updatedSong, query);
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json({ error: err });
  }

  router.delete("/delete/:id", async(req, res) => {
    const ownerId = req.user.id;
    const musicId = req.params.id; 

    try{
      const query = {
        where: {
          id: musicId,
          owner: ownerId,
        },
      };

      await MusicModel.destroy(query);
      res.status(200).json({message: "Song Entry Removed"});
    } catch (err) {
      res.status(500).json({ error: err});
    }
  });

});
