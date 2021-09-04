const db = require("../index");
const base_controller = require("./base_controller")
const Workers = db.workers;
const client = require("./../config/cache");
const cache_key = "workers"

let access_levels = {
    create: [6, 100],
    update: [6, 100],
    find: [6, 100],
    findAll: [6, 100],
    findAllPublished: [6, 100],
    delete: [6, 100],
    deleteAll: [6, 100],
}

exports.create = (req, res) => {
    if (access_levels.create.indexOf(db.access_level) !== -1) {
        if (!req.body.name) {
            res.status(400).json({message: "name can not be empty"});
            return;
        }
        const worker = {
            name: req.body.name,
            lastname: req.body.lastname,
            speciality: req.body.speciality,
            address: req.body.address,
            date_of_birth: req.body.date_of_birth,
            phone_number: req.body.phone_number,
            is_working: req.body.is_working
        };
        base_controller.create(req, res, client, Workers, cache_key, worker)
    } else {
        res.status(403).json({message: "you don't have permissions for it"})
    }
};

exports.findAll = async (req, res) => {
    if (access_levels.findAll.indexOf(db.access_level) !== -1) {
        await base_controller.findAll(req, res, client, Workers, cache_key)
    } else {
        res.status(403).json({message: `you don't have permissions for it`})
    }
}


exports.find = (req, res) => {
    if (access_levels.find.indexOf(db.access_level) !== -1) {
        base_controller.find(req, res, Workers)
    } else {
        res.status(403).json({message: `you don't have permissions for it`})
    }
};

exports.update = (req, res) => {
    if (access_levels.update.indexOf(db.access_level) !== -1) {
        base_controller.update(req, res, client, Workers, cache_key)
    } else {
        res.status(403).json({message: `you don't have permissions for it`})
    }
};

exports.delete = (req, res) => {
    if (access_levels.delete.indexOf(db.access_level) !== -1) {
        client.del(cache_key)
        const id = req.params.id;
        let body = req.body
        body.is_working = false
        Workers.update(body, {
            where: {id: id}
        })
            .then(num => {
                if (num == 1) {
                    res.json({
                        message: `Worker was deleted successfully.`
                    });
                } else {
                    res.json({
                        message: `Cannot delete Worker with id=${id}. 
                        Maybe Worker was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message || `Error deleting Worker with id=${id}`
                });
            });
    } else {
        res.status(403).json({message: "you don't have permissions for it"})
    }
};

