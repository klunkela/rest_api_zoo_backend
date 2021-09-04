const db = require("../index");
const Users = db.users;
const bcrypt = require("bcrypt")
const base_controller = require("./base_controller")
const client = require("./../config/cache");
const cache_key = "users"

let access_levels = {
    create: [],
    update: [100],
    find: [100],
    findAll: [100],
    findAllPublished: [100],
    delete: [100],
    deleteAll: [100],
}

exports.create = async (req, res) => {
    const login = req.body.login;
    const password = req.body.password;
    const candidate = await Users.findOne({where: {login}});
    if (candidate) {
        return res.status(400).json({message: `User with login ${login} already exist`})
    }
    const hashPassword = await bcrypt.hash(password, 8)

    const user = {
        login: req.body.login,
        password: hashPassword,
        access_level: 1
    };

    base_controller.create(req, res,client, Users, cache_key, user)
};

exports.findAll = async (req, res) => {
    if (access_levels.findAll.indexOf(db.access_level) !== -1) {
        await base_controller.findAll(req, res, client, Users, cache_key)
    } else {
        res.status(403).json({message: "you don't have permissions for it"})
    }
};

exports.find = (req, res) => {
    if (access_levels.find.indexOf(db.access_level) !== -1) {
        base_controller.find(req, res, Users)
    } else {
        res.status(403).json({message: "you don't have permissions for it"})
    }
};

exports.update = async (req, res) => {
    if (access_levels.update.indexOf(db.access_level) !== -1) {
        client.del(cache_key)

        const login = req.body.login;
        const password = req.body.password;
        const candidate = await Users.findOne({where: {login}});
        if (candidate) {
            return res.status(400).json({message: `User with login ${login} already exist`})
        }
        const hashPassword = await bcrypt.hash(password, 8)

        const user = {
            login: req.body.login,
            password: hashPassword,
            access_level: 1
        };

        const id = req.params.id;

        Users.update(user, {
            where: {id: id}
        })
            .then(num => {
                if (num == 1) {
                    res.json({
                        message: `Users was updated successfully.`
                    });
                } else {
                    res.json({
                        message: `Cannot update Users with id=${id}. 
                        Maybe Users was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message || `Error updating Users with id=${id}`
                });
            });
    } else {
        res.status(403).json({message: "you don't have permissions for it"})
    }
};

exports.delete = (req, res) => {
    if (access_levels.delete.indexOf(db.access_level) !== -1) {
        base_controller.delete(req, res, client, Users, cache_key)
    } else {
        res.status(403).json({message: "you don't have permissions for it"})
    }
};

exports.deleteAll = (req, res) => {
    if (access_levels.deleteAll.indexOf(db.access_level) !== -1) {
        base_controller.deleteAll(req, res, client, Users, cache_key)
    } else {
        res.status(403).json({message: "you don't have permissions for it"})
    }
};
