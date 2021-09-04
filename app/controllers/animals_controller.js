const db = require("../index");
const Animals = db.animals;
const Cages = db.cages;
const base_controller = require("./base_controller")
const client = require("./../config/cache");
const cache_key = "animals"

let access_levels = {
    create: [6, 100],
    update: [6, 100],
    find: [1, 2, 3, 4, 5, 6, 100],
    findAll: [1, 2, 3, 4, 5, 6, 100],
    findAllPublished: [1, 2, 3, 4, 5, 6, 100],
    delete: [6, 100],
    deleteAll: [6, 100],
}

exports.create = async (req, res) => {
    if (access_levels.create.indexOf(db.access_level) !== -1) {
        if (!req.body.cage_id) {
            res.status(400).json({message: "cage_id can not be empty"});
            return;
        }
        const animal = {
            cage_id: req.body.cage_id,
            type: req.body.type,
            name: req.body.name,
            cold_resistant: req.body.cold_resistant
        };
        let x = await Cages.findByPk(animal.cage_id);
        if (!x) {
            return res.status(400).json({message: `cage_id doesn't exist`})
        }
        base_controller.create(req, res, client, Animals, cache_key, animal)
    } else {
        res.status(403).json({message: "you don't have permissions for it"})
    }
};

exports.findAll = async (req, res) => {
    if (access_levels.findAll.indexOf(db.access_level) !== -1) {
        await base_controller.findAll(req, res, client, Animals, cache_key)
    } else {
        res.status(403).json({message: `you don't have permissions for it`})
    }
}

exports.findPage = async (req, res) => {
    let limit = req.params.limit ? req.params.limit : 100
    if (access_levels.findAll.indexOf(db.access_level) !== -1) {
        Animals.findAll({offset: (req.params.page - 1) * limit, limit: limit})
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message || `Some error occurred while finding `
                });
            });

    } else {
        res.status(403).json({message: `you don't have permissions for it`})
    }
}

exports.access_levels = async (req, res) => {
    if (access_levels.findAll.indexOf(db.access_level) !== -1) {
        res.json(access_levels);
    } else {
        res.status(403).json({message: `you don't have permissions for it`})
    }
}
exports.count = async (req, res) => {
    if (access_levels.findAll.indexOf(db.access_level) !== -1) {
        await Animals.count()
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                });
            });
    } else {
        res.status(403).json({message: `you don't have permissions for it`})
    }
}


exports.find = (req, res) => {
    if (access_levels.find.indexOf(db.access_level) !== -1) {
        base_controller.find(req, res, Animals)
    } else {
        res.status(403).json({message: `you don't have permissions for it`})
    }
};

exports.update = async (req, res) => {
    if (access_levels.update.indexOf(db.access_level) !== -1) {
        let x = await Cages.findByPk(req.body.cage_id);
        if (!x) {
            return res.status(400).json({message: `cage_id doesn't exist`})
        }
        base_controller.update(req, res, client, Animals, cache_key)
    } else {
        res.status(403).json({message: `you don't have permissions for it`})
    }
};

exports.delete = (req, res) => {
    if (access_levels.delete.indexOf(db.access_level) !== -1) {
        base_controller.delete(req, res, client, Animals, cache_key)
    } else {
        res.status(403).json({message: "you don't have permissions for it"})
    }
};

exports.deleteAll = (req, res) => {
    if (access_levels.deleteAll.indexOf(db.access_level) !== -1) {
        base_controller.deleteAll(req, res, client, Animals, cache_key)
    } else {
        res.status(403).json({message: "you don't have permissions for it"})
    }
};
