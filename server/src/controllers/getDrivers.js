const axios = require('axios')
const { Team, Driver } = require('../db')

module.exports = async(req, res) => {
    try {
        const drivers = await Driver.findAll({
            include: [{
                model: Team,
                attributes: ['name'],
                through: {
                    attributes: [] 
                }
            }]
        });

        const getDriver = drivers.map(d => {
            return{
                id: d.dataValues.id,
                name: d.dataValues.name, 
                description: d.dataValues.description,
                image: d.dataValues.image,
                nationality: d.dataValues.nationality,
                dob: d.dataValues.dob,
                teams: d.dataValues.teams.map(t => t.name)
            }
        })
        const response = (await axios('http://localhost:5000/drivers')).data;

        const apiDrivers = response.map(b => {
            return{
                id: b.id,
                name: b.name,
                description: b.description,
                image: b.image,
                nationality: b.nationality,
                dob: b.dob,
                teams: b.teams ? b.teams.split(", ") : [],
            }
        })
        res.status(200).json([...getDriver, ...apiDrivers])
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}