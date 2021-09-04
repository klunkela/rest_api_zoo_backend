module.exports = app => {
    const workers = require("../controllers/workers_controller.js");

    let router = require("express").Router();

    router.post("/", workers.create); //+

    router.put("/:id", workers.update); //+

    router.get("/:id", workers.find);  //+
    router.get("/", workers.findAll);  //+

    router.delete("/:id", workers.delete); //+

    app.use("/api/workers", router);

};