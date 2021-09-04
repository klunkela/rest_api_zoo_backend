/*const { Model } = require('sequelize');
class Animals extends Model {}
module.exports = (sequelize) => Animals.init({

}, { sequelize });
*/
module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "meals",
        {
            calories: {
                type: Sequelize.INTEGER,
                notNull: true
            },
            food_name: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.INTEGER
            }
        },
        {
            timestamps: false
        });
};