const db = require("../index");
const base_controller = require("./base_controller")
const Cages = db.cages;
const Workers = db.workers;
const Animals = db.animals;
const client = require("./../config/cache");
const cache_key = "cages"

let access_levels = {
    create: [6, 100],
    update: [6, 100],
    find: [4, 6, 100],
    findAll: [4, 6, 100],
    findAllPublished: [4, 6, 100],
    delete: [6, 100],
    deleteAll: [6, 100],
}

exports.create = async (req, res) => {
    if (access_levels.create.indexOf(db.access_level) !== -1) {
        const cage = {
            worker_id: req.body.worker_id,
            size_x: req.body.size_x,
            size_y: req.body.size_y,
            size_z: req.body.size_z,
            is_warm: req.body.is_warm
        };

        let x = await Workers.findByPk(cage.worker_id);
        if (x.dataValues.speciality != "cleaner") {
            return res.status(400).json({message: `worker must has speciality='cleaner'`})
        }
        base_controller.create(req, res, client, Cages, cache_key, cage)
    } else {
        res.status(403).json({message: "you don't have permissions for it"})
    }
};

exports.findAll = async (req, res) => {
    if (access_levels.findAll.indexOf(db.access_level) !== -1) {
        await base_controller.findAll(req, res, client, Cages, cache_key)
    } else {
        res.status(403).json({message: `you don't have permissions for it`})
    }
};

exports.find = (req, res) => {
    if (access_levels.find.indexOf(db.access_level) !== -1) {
        base_controller.find(req, res, Cages)
    } else {
        res.status(403).json({message: `you don't have permissions for it`})
    }
};

exports.update = async (req, res) => {
    if (access_levels.update.indexOf(db.access_level) !== -1) {
        let x = await Workers.findByPk(req.body.worker_id);
        if (x.dataValues.speciality != "cleaner") {
            return res.status(400).json({message: `worker must has speciality='cleaner'`})
        }
        base_controller.update(req, res, client, Cages, cache_key)
    } else {
        res.status(403).json({message: `you don't have permissions for it`})
    }
};

exports.delete = async (req, res) => {
    if (access_levels.delete.indexOf(db.access_level) !== -1) {
        Cages.belongsTo(Animals, {foreignKey: 'id', targetKey: 'cage_id'});
        let x = await Cages.findAll({
            where: {
                id: req.params.id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: {
                model: Animals
            }
        })
        if (x[0].dataValues.animal) {
            return res.status(400).json({message: `cage has animal inside it!`})
        }
        else {
            base_controller.delete(req, res, client, Cages, cache_key)
        }
    } else {
        res.status(403).json({message: "you don't have permissions for it"})
    }
}
