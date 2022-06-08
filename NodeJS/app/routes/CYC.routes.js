module.exports = app => {
    const user = require("../controllers/CYC.controllers.js");
    const {
        findAllPlaygrounds,
        findPlaygrounds,
        searchPlayground,
        updatePlayground,
        deletePlayground,
        createPlayground
    } = require("../controllers/playgrounds.controllers.js")
    var router = require("express").Router();
    var playground_router = require("express").Router();

    // Retrieve all users
    app.use('/api/users', router);
    router.get("/", user.findAll);

    // Playground routes
    app.use('/api/playgrounds', playground_router)
    playground_router.get("/", findAllPlaygrounds);
    playground_router.get("/index/:id", findPlaygrounds);
    playground_router.get("/search/:searchTerm", searchPlayground);
    playground_router.put("/index/:id", updatePlayground);
    playground_router.delete("/delete/:id", deletePlayground);
    playground_router.post("/", createPlayground);
};