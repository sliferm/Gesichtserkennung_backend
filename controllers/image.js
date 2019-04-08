const Clarifai = require("clarifai");
const app = new Clarifai.App({
  apiKey: "c8574f0a9f724f1c875e3ec2ce48fb9c"
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json("kann nicht mit api arbeiten"))};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json("unmöglich entries zu bekommen"));
};

module.exports = {
  handleImage,
  handleApiCall
};
