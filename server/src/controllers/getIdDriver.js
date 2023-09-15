const axios = require('axios');
const { Team, Driver } = require('../db');
const isUUID = require('../utils/isUUID');

module.exports = async (req, res) => {
    const { id } = req.params;

    try {
        let driverDetails;

        if (isUUID(id)) {
            // Driver en la base de datos
            const driverById = await Driver.findByPk(id, {
                include: [{
                    model: Team,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }]
            });

            if (!driverById) {
                throw new Error('Driver not found!');
            }

            driverDetails = {
                ...driverById.dataValues,
                teams: driverById.dataValues.teams.map(t => t.name)
            };
        } else {
            // Driver en la API externa
            const response = await axios.get(`http://localhost:5000/drivers/${id}`);
            const apiFind = response.data;

            driverDetails = {
                id: apiFind.id,
                name: apiFind.name,
                description: apiFind.description,
                image: apiFind.image ? apiFind.image.url : "https://1000marcas.net/wp-content/uploads/2020/01/logo-F1-500x281.png",
                nationality: apiFind.nationality,
                dob: apiFind.dob,
                teams: apiFind.teams ? apiFind.teams.split(', ') : []
            };
        }

        res.status(200).json(driverDetails);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
