module.exports = app => {
    const users = require("../controllers/users_controller.js");

    let router = require("express").Router();

    router.post("/", users.create);

    router.put("/:id", users.update);

    router.get("/:id", users.find);
    router.get("/", users.findAll);

    router.delete("/:id", users.delete);
    router.delete("/", users.deleteAll);

    app.use("/api/users", router);

};