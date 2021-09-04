module.exports = app => {
    const cages = require("../controllers/cages_controller.js");

    let router = require("express").Router();

    router.post("/", cages.create); //+

    router.put("/:id", cages.update); //+

    router.get("/:id", cages.find);  //+
    router.get("/", cages.findAll);  //+

    router.delete("/:id", cages.delete); //+

    app.use("/api/cages", router);

};
