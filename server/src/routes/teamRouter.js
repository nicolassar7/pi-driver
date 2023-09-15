const { Router } = require("express");

const getTeam = require('../controllers/getTeam')

const teamRouter = Router();

teamRouter.get('/', getTeam )

module.exports = teamRouter;
