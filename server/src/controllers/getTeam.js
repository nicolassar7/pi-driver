const { Team } = require('../db');
const axios = require('axios');

const getTeam = async (req, res) => {
  try {
    // Realiza una solicitud a la API externa para obtener todos los conductores
    const response = await axios.get('http://localhost:5000/drivers');
    const drivers = response.data;

    // Inicializa un conjunto para almacenar los nombres de los equipos únicos
    const uniqueTeams = new Set();

    // Itera a través de los conductores y verifica si la propiedad "teams" está definida
    drivers.forEach((driver) => {
      if (driver.teams) {
        const teams = driver.teams.split(',').map((team) => team.trim());
        teams.forEach((team) => {
          if (team) {
            uniqueTeams.add(team);
          }
        });
      }
    });

    // Convierte el conjunto único en un array
    const allTeam = Array.from(uniqueTeams);

    // Almacena los equipos únicos en la base de datos (si es necesario)
    allTeam.forEach(async (teamName) => {
      await Team.findOrCreate({ where: { name: teamName } });
    });

    // Recupera todos los equipos desde la base de datos
    const teamsFromDB = await Team.findAll();

    res.status(200).json(teamsFromDB);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = getTeam;

