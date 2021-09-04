module.exports = app => {
    const meals = require("../controllers/meals_controller.js");

    let router = require("express").Router();

    router.post("/", meals.create); //+

    router.put("/:id", meals.update); //+

    router.get("/:id", meals.find);  //+
    router.get("/", meals.findAll);  //+

    router.delete("/:id", meals.delete); //+
    router.delete("/", meals.deleteAll); //+

    app.use("/api/meals", router);

};