const express = require('express');
const session = require ('express-session');
const routes = require('./controllers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(routes);

sequelize.sync({force:False}).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT}`))
});