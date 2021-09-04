const db = require("../index");
const Feedings = db.feedings;
const Workers = db.workers;
const Animals = db.animals;
const base_controller = require("./base_controller")
const client = require("./../config/cache");
const cache_key = "feedings"

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
        if (!req.body.worker_id) {
            res.status(400).json({message: "worker_id can not be empty"});
            return;
        }
        if (!req.body.animal_id) {
            res.status(400).json({message: "animal_id can not be empty"});
            return;
        }
        if (!req.body.time) {
            res.status(400).json({message: "time can not be empty"});
            return;
        }
        const feeding = {
            worker_id: req.body.worker_id,
            meal_id: req.body.meal_id,
            time: req.body.time,
            animal_id: req.body.animal_id
        };
        let x = await Workers.findByPk(feeding.worker_id);
        if (!x) {
            return res.status(400).json({message: `worker_id doesn't exist`})
        }
        if (x.dataValues.speciality != "cook") {
            return res.status(400).json({message: `worker must has speciality='cook'`})
        }
        let y = await Animals.findByPk(feeding.animal_id);
        if (!y) {
            return res.status(400).json({message: `animal_id doesn't exist`})
        }
        base_controller.create(req, res,client, Feedings, cache_key, feeding)
    } else {
        res.status(403).json({message: "you don't have permissions for it"})
    }
};

exports.findAll = async (req, res) => {
    if (access_levels.findAll.indexOf(db.access_level) !== -1) {
        await base_controller.findAll(req, res, client, Feedings, cache_key)
    } else {
        res.status(403).json({message: `you don't have permissions for it`})
    }
}


exports.find = (req, res) => {
    if (access_levels.find.indexOf(db.access_level) !== -1) {
        base_controller.find(req, res, Feedings)
    } else {
        res.status(403).json({message: `you don't have permissions for it`})
    }
};

exports.update = async (req, res) => {
    if (access_levels.update.indexOf(db.access_level) !== -1) {
        let x = await Workers.findByPk(req.body.worker_id);
        if (!x) {
            return res.status(400).json({message: `worker_id doesn't exist`})
        }
        let y = await Animals.findByPk(req.body.animal_id);
        if (!y) {
            return res.status(400).json({message: `animal_id doesn't exist`})
        }
        base_controller.update(req, res, client, Feedings, cache_key)
    } else {
        res.status(403).json({message: `you don't have permissions for it`})
    }
};

exports.delete = (req, res) => {
    if (access_levels.delete.indexOf(db.access_level) !== -1) {
        base_controller.delete(req, res, client, Feedings, cache_key)
    } else {
        res.status(403).json({message: "you don't have permissions for it"})
    }
};

exports.deleteAll = (req, res) => {
    if (access_levels.deleteAll.indexOf(db.access_level) !== -1) {
        base_controller.deleteAll(req, res, client, Feedings, cache_key)
    } else {
        res.status(403).json({message: "you don't have permissions for it"})
    }
};
