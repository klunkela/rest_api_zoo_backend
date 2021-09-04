/*const { Model } = require('sequelize');
class Animals extends Model {}
module.exports = (sequelize) => Animals.init({

}, { sequelize });
*/
module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "animals",
        {
            cage_id: {
                type: Sequelize.INTEGER,
                notNull: true
            },
            type: {
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING
            },
            cold_resistant: {
                type: Sequelize.BOOLEAN
            }
        },
        {
            timestamps: false
        });
};