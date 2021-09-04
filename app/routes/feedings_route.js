module.exports = app => {
    const feedings = require("../controllers/feedings_controller.js");

    let router = require("express").Router();

    router.post("/", feedings.create); //+

    router.put("/:id", feedings.update); //+

    router.get("/:id", feedings.find);  //+
    router.get("/", feedings.findAll);  //+

    router.delete("/:id", feedings.delete); //+
    router.delete("/", feedings.deleteAll); //+

    app.use("/api/feedings", router);

};