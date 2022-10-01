const path = require('path');
const express = require('express');
const session = require('express-session');
const expressHandlebars = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const SequelizeStore = require ("connect-session-sequelize")(session.Store);

const section = {
    secret: 'super secret secret', 
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore
    ({db: sequelize})
};
app.use (session(section));
const formatDate = require("utils/helpers");
const handlebars = expressHandlebars.create({formatDate}
);

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.json()
);
app.use(express.urlencoded({ extended: false })
);
app.use(express.static(path.join(__dirname, 'public'))
);
app.use(require('./controllers/')
);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Hello and welcome!'));
}
);