const { Router } = require("express");

const getDriver = require('../controllers/getDrivers')
const getNameDriver =require('../controllers/getNameDriver')
const getIdDriver = require('../controllers/getIdDriver')
const createDriver = require('../controllers/createDriver')

const driverRouter = Router();

driverRouter.get('/', getDriver);
driverRouter.get ('/name', getNameDriver)
driverRouter.get('/:id', getIdDriver);



driverRouter.post('/', createDriver)

module.exports = driverRouter;
