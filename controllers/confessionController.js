import confessions from "../models/confessions.js";

const confession_index = (req, res) => {
  confessions
    .find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const confession_create_post = (req, res) => {
  const confessionCard = req.body;
  confessions.create(confessionCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
};

const confession_delete = (req, res) => {
  const id = req.params.id;
  confessions
    .findByIdAndDelete(id)
    .then(() => {
      res.status(200).send("Confession deleted successfully");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export {
  confession_index,
  confession_create_post,
  confession_delete,
};
