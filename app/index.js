const dbConfig = require("./config/db_config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.visits = require("./models/visits_model.js")(sequelize, Sequelize);
db.animals = require("./models/animals_model.js")(sequelize, Sequelize);
db.users = require("./models/users_model.js")(sequelize, Sequelize);
db.cages = require("./models/cages_model.js")(sequelize, Sequelize);
db.workers = require("./models/workers_model.js")(sequelize, Sequelize);
db.meals = require("./models/meals_model.js")(sequelize, Sequelize);
db.feedings = require("./models/feedings_model.js")(sequelize, Sequelize);

db.access_level = 1

module.exports = db;