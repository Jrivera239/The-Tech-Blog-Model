const express = require("express");
const sequelize = require("./config/connection");
const routes = require("./controllers");
const session = require("express-session");
const path = require("path");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();

const SequelizeStore = require("connect-session-sequelize")(session.Store);

//cookie setup

const sess = {
  secret: process.env.DB_COOK,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Express middleware //

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//Allows us to use handlebars //

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//Use all routes in controller folder //

app.use(routes);

// Start server after DB connection //

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
