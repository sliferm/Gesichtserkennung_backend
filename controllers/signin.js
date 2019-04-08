const handleSignin = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('Falsche daten')
  }
  db.select("email", "hash").from("login")
    .where("email", "=",email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.select("*").from("users")
          .where("email", "=", email)
          .then(user => {
            res.json(user[0]);
          })
          .catch(err =>
            res.status(400).json("nicht möglich einen user zu bekommen"));
      } else {
        res.status(400).json("Falsche Anmeldedatenn");
      }
    })
    .catch(err => res.status(400).json("falsche Anmeldeinformation"));
};

module.exports = {
  handleSignin: handleSignin
};
