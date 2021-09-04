
const authMiddleware = require('../middleware/auth_middleware')
module.exports = app => {
    const login = require("../controllers/login_controller.js");

    let router = require("express").Router();

    router.get('/auth', authMiddleware, login.auth)
    router.post("/", login.create);
    router.delete("/", login.delete);
    app.use("/api/login", router);
};