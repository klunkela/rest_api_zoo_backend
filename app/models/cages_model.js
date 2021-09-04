module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "cages",
        {
            worker_id: {
                type: Sequelize.INTEGER
            },
            size_x: {
                type: Sequelize.INTEGER
            },
            size_y: {
                type: Sequelize.INTEGER
            },
            size_z: {
                type: Sequelize.INTEGER
            },
            is_warm: {
                type: Sequelize.BOOLEAN
            }
        },
        {
            timestamps: false
        });
};
