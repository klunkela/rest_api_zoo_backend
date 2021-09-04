module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "visits",
        {
            worker_id: {
                type: Sequelize.INTEGER,
                notNull: true
            },
            ticket_price: {
                type: Sequelize.INTEGER,
                notNull: true
            }
        },
        {
            timestamps: false
        });
};