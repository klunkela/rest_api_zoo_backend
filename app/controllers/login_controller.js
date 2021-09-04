const db = require("../index");
const Users = db.users;
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const config = require("./../config/db_config")

exports.create = async (req, res) => {
    try {
        const {login, password} = req.body;
        const user = await Users.findOne({where: {login}});
        if (!user) {
            return res.status(400).json({message: `User with login ${login} doesn't exist`})
        }
        const isPassValid = bcrypt.compareSync(password, user.password)
        if (!isPassValid) {
            return res.status(400).json({message: "Invalid password"})
        }
        const token = jwt.sign({id: user.id}, config.secretKey, {expiresIn: "1h"})
        db.access_level = user.dataValues.access_level
        res.json({
            token, user: {
                id: user.id,
                login: user.login,
                access_level: user.access_level
            }
        })
    } catch (err) {
        res.status(500).json({
            message:
                err.message || "Some error occurred while creating the Tutorial."
        });
    }
};

exports.delete = (req, res) => {
    db.access_level = 1
    res.json({
        access_level: db.access_level
    })
};

exports.auth = async (req, res) => {
    try {
        const user = await Users.findByPk(req.user.id)
        const token = jwt.sign({id: user.id}, config.secretKey, {expiresIn: "1h"})
        db.access_level = user.access_level
        return res.json({
            token, user: {
                id: user.id,
                login: user.login,
                access_level: user.access_level
            }
        })
    } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
}

