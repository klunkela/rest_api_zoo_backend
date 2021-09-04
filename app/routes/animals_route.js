module.exports = app => {
    const animals = require("../controllers/animals_controller.js");

    let router = require("express").Router();

    router.post("/", animals.create); //+

    router.get("/access_levels", animals.access_levels);  //+
    router.get("/count", animals.count);  //+
    router.put("/:id", animals.update); //+

    router.get("/:id", animals.find);  //+
    router.get("/page/:page&limit=:limit", animals.findPage);  //+
    router.get("/page/:page", animals.findPage);  //+
    router.get("/", animals.findAll);  //+

    router.delete("/:id", animals.delete); //+
    router.delete("/", animals.deleteAll); //+

    app.use("/api/animals", router);

};