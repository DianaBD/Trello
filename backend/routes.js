const Router = require('express')();

const CardsController = require('./Cards/controllers.js');
const ListsController = require('./Lists/controllers.js');
const BoardsController = require('./Boards/controllers.js');

Router.use('/cards', CardsController);
Router.use('/lists',ListsController);
Router.use('/boards',BoardsController);

module.exports = Router;
