module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "feedings",
        {
            worker_id: {
                type: Sequelize.INTEGER,
                notNull: true
            },
            meal_id: {
                type: Sequelize.INTEGER
            },
            time: {
                type: Sequelize.TIME,
                notNull: true
            },
            animal_id: {
                type: Sequelize.INTEGER,
                notNull: true
            }
        },
        {
            timestamps: false
        });
};