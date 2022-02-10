const express = require('express');
const session = require ('express-session');
const routes = require('./controllers');
const path = require('path');
const exphbs = require('express-handlebars');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//Set up Handlevars with helpers
const hbs = exphbs.create();

//Set up express port
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars for express
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({force: true}).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT}`))
});