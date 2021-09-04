const db = require("../index");
const base_controller = require("./base_controller")
const Visits = db.visits;
const client = require("./../config/cache");
const cache_key = "visits"

let access_levels = {
    create: [3, 6, 100],
    update: [3, 6, 100],
    find: [3, 6, 100],
    findAll: [3, 6, 100],
    findAllPublished: [3, 6, 100],
    delete: [3, 6, 100],
    deleteAll: [3, 6, 100],
}

exports.create = (req, res) => {
    if (access_levels.create.indexOf(db.access_level) !== -1) {
        if (!req.body.worker_id) {
            res.status(400).json({message: "worker_id can not be empty"});
            return;
        }
        if (!req.body.ticket_price) {
            res.status(400).json({message: "ticket_price can not be empty"});
            return;
        }

        const visit = {
            worker_id: req.body.worker_id,
            ticket_price: req.body.ticket_price
        };

        base_controller.create(req, res, client, Visits, cache_key, visit)

    } else {
        res.status(403).json({message: "you don't have permissions for it"})
    }
};

exports.findAll = async (req, res) => {
    if (access_levels.findAll.indexOf(db.access_level) !== -1) {
        await base_controller.findAll(req, res, client, Visits, cache_key)
    } else {
        res.status(403).json({message: `you don't have permissions for it`})
    }
};


exports.findPage = async (req, res) => {
    let limit = req.params.limit ? req.params.limit : 100
    if (access_levels.findAll.indexOf(db.access_level) !== -1) {
        Visits.findAll({offset: (req.params.page-1)*limit, limit: limit})
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
        await Visits.count()
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
        base_controller.find(req, res, Visits)
    } else {
        res.status(403).json({message: `you don't have permissions for it`})
    }
};

exports.update = (req, res) => {
    if (access_levels.update.indexOf(db.access_level) !== -1) {
        base_controller.update(req, res, client, Visits, cache_key)
    } else {
        res.status(403).json({message: `you don't have permissions for it`})
    }
};

exports.delete = (req, res) => {
    if (access_levels.delete.indexOf(db.access_level) !== -1) {
        base_controller.delete(req, res, client, Visits, cache_key)
    } else {
        res.status(403).json({message: "you don't have permissions for it"})
    }
};

exports.deleteAll = (req, res) => {
    if (access_levels.deleteAll.indexOf(db.access_level) !== -1) {
        base_controller.deleteAll(req, res, client, Visits, cache_key)
    } else {
        res.status(403).json({message: "you don't have permissions for it"})
    }
};

exports.findAllPublished = (req, res) => {
    if (access_levels.findAllPublished.indexOf(db.access_level) !== -1) {
        Visits.findAll({where: {ticket_price: 100}})
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message || "Some error occurred while retrieving visits."
                });
            });
    } else {
        res.status(403).json({message: "you don't have permissions for it"})
    }
};