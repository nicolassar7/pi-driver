const { Op } = require('sequelize');
const axios = require('axios');
const { Driver, Team } = require('../db');

module.exports = async (req, res) => {
  if (req.query.name) {
    const name = req.query.name.toLowerCase();
    console.log("Buscando conductor con nombre:", name);
    try {
      // Borrar los datos del conductor anterior
      dispatch({ type: 'CLEAR_DRIVER_DATA' });

      const dbSearchByName = await Driver.findAll({
        attributes: ['id', 'image', 'name'],
        include: [{
          model: Team,
          attributes: ['name'],
          through: {
            attributes: []
          }
        }],
        where: {
          name: {
            [Op.like]: name
          }
        }
      });
      
      if (dbSearchByName.length) {
        console.log("Conductor encontrado en la base de datos:", dbSearchByName[0]);
        return res.status(200).json(dbSearchByName[0]);
      }

      console.log("No se encontró el conductor en la base de datos. Buscando en la API externa...");
      const response = (await axios(`http://localhost:5000/drivers?name.forename=${name}`)).data;

      // Verifica si la respuesta de la API externa tiene la estructura esperada
      if (response && typeof response === 'object' && response.id) {
        console.log("Conductor encontrado en la API externa:", response);

        // Devuelve solo la estructura relacionada con el conductor encontrado
        const apiSearchByName = {
          id: response.id,
          name: response.name,
          image: response.image,
          teams: response.teams
        };
        
        res.status(200).json(apiSearchByName);
      } else {
        console.log("La respuesta de la API externa no tiene el formato esperado");
        // La respuesta de la API externa no tiene el formato esperado
        res.status(404).json({ error: 'API response format is invalid' });
      }
    } catch (error) {
      console.log("Error al buscar el conductor:", error.message);
      res.status(404).json({ error: error.message });
    }
  }
};
