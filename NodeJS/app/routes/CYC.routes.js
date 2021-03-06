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
    playground_router.get("/:id", findPlaygrounds);
    playground_router.get("/:searchTerm", searchPlayground);
    playground_router.put("/:id", updatePlayground);
    playground_router.delete("/:id", deletePlayground);
    playground_router.post("/", createPlayground);
};