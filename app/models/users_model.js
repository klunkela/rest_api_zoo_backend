module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "zoouser",
        {
            login: {
                type: Sequelize.STRING,
                notNull: true
            },
            password: {
                type: Sequelize.STRING,
                notNull: true
            },
            access_level: {
                type: Sequelize.INTEGER,
                notNull: true
            }
        },
        {
            timestamps: false
        });
};