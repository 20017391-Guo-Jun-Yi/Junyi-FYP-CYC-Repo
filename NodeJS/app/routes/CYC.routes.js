module.exports = app => {
    const user = require("../controllers/CYC.controllers.js");
    var router = require("express").Router();

    // Retrieve all users
    router.get("/", user.findAll);

    app.use('/api/users', router);

};