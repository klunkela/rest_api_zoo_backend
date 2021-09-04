const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

let corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}

app.use(cors(corsOptions));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const db = require("./app");
db.sequelize.sync();

app.get("/", (req, res) => {
    res.json({message: "Welcome to CourseWork application."});
});

require("./app/routes/visits_route")(app);
require("./app/routes/animals_route")(app);
require("./app/routes/users_route")(app);
require("./app/routes/login_route")(app);
require("./app/routes/cages_route")(app);
require("./app/routes/workers_route")(app);
require("./app/routes/meals_route")(app);
require("./app/routes/feedings_route")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});