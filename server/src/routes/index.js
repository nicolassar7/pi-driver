const { Router } = require("express");

const driverRouter = require('./routeDriver')
const teamRouter = require('./teamRouter')

const router = Router();

router.use('/drivers', driverRouter)
router.use('/teams', teamRouter)

module.exports = router;
