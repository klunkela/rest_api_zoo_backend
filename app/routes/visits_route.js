module.exports = app => {
    const visits = require("../controllers/visits_controller.js");

    let router = require("express").Router();

    router.post("/", visits.create); //+

    router.get("/access_levels", visits.access_levels);  //+

    router.get("/count", visits.count);  //+
    router.put("/:id", visits.update); //+

    router.get("/:id", visits.find);  //+
    router.get("/page/:page&limit=:limit", visits.findPage);  //+
    router.get("/", visits.findAll);  //+
    router.get("/ticket100", visits.findAllPublished);

    router.delete("/:id", visits.delete); //+
    router.delete("/", visits.deleteAll); //+

    app.use("/api/visits", router);

};