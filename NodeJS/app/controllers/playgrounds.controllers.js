const db = require("../models");
const playgrounds = db.tables[1];
const Op = db.Sequelize.Op;

// Retrieve all Playgrounds Data from the database.
const findAllPlaygrounds = (req, res) => {
    playgrounds.findAll({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
};

// Retrieve Single Playground Data from the database
const findPlaygrounds = (req, res) => {
    const id = Number(req.params.id)
    playgrounds.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving user."
            });
        })
};

const searchPlayground = (req, res) => {
    // Get search term and filter data for titles with the search term
    const term = req.params.searchTerm;
    playgrounds.findAll({
            where: {
                playground_title: {
                    [Op.like]: '%' + term + '%'
                }
            }
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
};

const updatePlayground = (req, res, next) => {
    // Update playground details using playground id
    const id = Number(req.params.id);
    playgrounds.findByPk(id)
        .then(data => {
            data.set({
                playground_description: req.body.playground_description
            })
            console.log(data);
            data.save();
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving user."
            });
        })
};

const deletePlayground = (req, res) => {
    // Delete playground from table
    const id = Number(req.params.id);
    playgrounds.destroy({
            where: { playground_id: id }
        })
        .then(data => {
            res.sendStatus(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
};

const createPlayground = (req, res) => {
    // Create new playground and insert into table
    const newInstance = playgrounds.build({
        playground_title: req.body.playground_title,
        playground_description: req.body.playground_description,
        playground_etc: req.body.playground_etc,
    });

    newInstance.save();

    // .then(data => {
    //     data.save();
    //     console.log(data);
    // })
    // .catch(err => {
    //     res.status(500).send({
    //         message: err.message || "Some error occurred while retrieving users."
    //     });
    // });
}

module.exports = {
    findAllPlaygrounds,
    findPlaygrounds,
    searchPlayground,
    updatePlayground,
    deletePlayground,
    createPlayground
}