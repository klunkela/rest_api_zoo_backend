exports.create = (req, res, client, model, cache_key, model_obj) => {
    client.del(cache_key)
    model.create(model_obj)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while creating"
            });
        });
};

exports.findAll = async (req, res, client, model, cache_key) => {
    try {
        client.get(cache_key, async (err, jobs) => {
            if (err) throw err;

            if (jobs) {
                res.status(200).send(JSON.parse(jobs))

            } else {
                await model.findAll()
                    .then(data => {
                        res.json(data);
                        jobs = data
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: err.message || `Some error occurred while finding ${model.name}`
                        });
                    });
                client.setex(cache_key, 600, JSON.stringify(jobs))
            }
        });
    } catch (err) {
        res.status(500).send({message: err.message})
    }
};

exports.find = (req, res, model) => {
    const id = req.params.id;

    model.findByPk(id)
        .then(data => {
            if (data) {
                res.json(data);
            } else {
                res.status(400).json({message: `no ${model.name} with id=${id}`});
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || `Error finding ${model.name} with id=${id}`
            });
        });
};


exports.update = (req, res, client, model, cache_key) => {
    client.del(cache_key)
    const id = req.params.id;
    model.update(req.body, {where: {id: id}})
        .then(num => {
            if (num == 1) {
                res.json({message: `${model.name} was updated successfully.`});
            } else {
                res.json({
                    message: `Cannot update ${model.name} with id=${id}. 
                        Maybe ${model.name} was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || `Error updating ${model.name} with id=${id}`
            });
        });
};

exports.delete = (req, res, client, model, cache_key) => {
    client.del(cache_key)
    const id = req.params.id;
    model.destroy({where: {id: id}})
        .then(num => {
            if (num == 1) {
                res.json({message: `${model.name} was deleted successfully!`});
            } else {
                res.json({
                    message: `Cannot delete visit with id=${id}. Maybe ${model.name} was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || `Could not delete ${model.name} with id=${id}`
            });
        });
};


exports.deleteAll = (req, res, client, model, cache_key) => {
    client.del(cache_key)
    model.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.json({message: `${nums} ${model.name} were deleted successfully!`});
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || `Some error occurred while removing all ${model.name}.`
            });
        });
};
