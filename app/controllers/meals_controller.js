const db = require("../index");
const Meals = db.meals;
const base_controller = require("./base_controller")
const client = require("./../config/cache");
const cache_key = "meals"

let access_levels = {
    create: [5, 6, 100],
    update: [5, 6, 100],
    find: [5, 6, 100],
    findAll: [5, 6, 100],
    findAllPublished: [5, 6, 100],
    delete: [5, 6, 100],
    deleteAll: [5, 6, 100],
}

exports.create = async (req, res) => {
    if (access_levels.create.indexOf(db.access_level) !== -1) {
        const meals = {
            calories: req.body.calories,
            food_name: req.body.food_name,
            price: req.body.price
        };
        base_controller.create(req, res,client, Meals, cache_key, meals)
    } else {
        res.status(403).json({message: "you don't have permissions for it"})
    }
};

exports.findAll = async (req, res) => {
    if (access_levels.findAll.indexOf(db.access_level) !== -1) {
        await base_controller.findAll(req, res, client, Meals, cache_key)
    } else {
        res.status(403).json({message: `you don't have permissions for it`})
    }
}


exports.find = (req, res) => {
    if (access_levels.find.indexOf(db.access_level) !== -1) {
        base_controller.find(req, res, Meals)
    } else {
        res.status(403).json({message: `you don't have permissions for it`})
    }
};

exports.update = async (req, res) => {
    if (access_levels.update.indexOf(db.access_level) !== -1) {
        base_controller.update(req, res, client, Meals, cache_key)
    } else {
        res.status(403).json({message: `you don't have permissions for it`})
    }
};

exports.delete = (req, res) => {
    if (access_levels.delete.indexOf(db.access_level) !== -1) {
        base_controller.delete(req, res, client, Meals, cache_key)
    } else {
        res.status(403).json({message: "you don't have permissions for it"})
    }
};

exports.deleteAll = (req, res) => {
    if (access_levels.deleteAll.indexOf(db.access_level) !== -1) {
        base_controller.deleteAll(req, res, client, Meals, cache_key)
    } else {
        res.status(403).json({message: "you don't have permissions for it"})
    }
};
