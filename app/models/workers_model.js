module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "workers",
        {
            name: {
                type: Sequelize.STRING,
                notNull: true
            },
            lastname: {
                type: Sequelize.STRING,
            },
            speciality: {
                type: Sequelize.STRING,
            },
            address: {
                type: Sequelize.STRING,
            },
            date_of_birth: {
                type: Sequelize.DATE,
            },
            phone_number: {
                type: Sequelize.STRING,
            },
            is_working: {
                type: Sequelize.BOOLEAN
            }
        },
        {
            timestamps: false
        });
};