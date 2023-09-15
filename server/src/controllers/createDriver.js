const { Driver, Team } = require('../db');

async function createDriver(req, res) {
  try {
    const { forename, surname, description, image, nationality, dob, team } = req.body;
    if (!forename || !surname || !description || !image || !nationality || !dob || !team || !team.length) {
      return res.status(400).send("Faltan datos");
    }

    let driver = await Driver.create({ name: `${forename} ${surname}`, description, image, nationality, dob });

    team.map(async (e) => {
      foundTeam = await Team.findAll({ where: { name: e } });
      await driver.addTeam(foundTeam);
    });

    return res.status(200).json({ ...driver.dataValues, team: team });
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

module.exports = createDriver;
