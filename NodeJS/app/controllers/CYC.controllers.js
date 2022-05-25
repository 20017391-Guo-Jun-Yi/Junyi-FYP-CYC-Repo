const db = require("../models");
const user = db.users;
const Op = db.Sequelize.Op;

// Retrieve all Users Data from the database.
exports.findAll = (req, res) => {
  user.findAll({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};