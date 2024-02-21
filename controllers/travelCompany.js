import travelCompany from '../models/TravelCompany.js'

const controller = {
    getTravelCompanies: async (req, res) => {

        try {
            const travelCompanies = await travelCompany.find().populate('cities', 'name description');
            return res.status(200).json({
                success: true,
                travelCompanies: travelCompanies
        })

        } catch(error) {
        return res.status(500).json({
            success: false,
            message: 'Error al crear agencia de viaje!'
        });
    }
},
    createTravelCompanies: async (req, res) => {
        try {

            const newTravelCompany = await travelCompany.create(req.body);


            return res.status(201).json({
                success: true,
                message: 'agencia de viaje creada correctamente!'
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error al crear agencia de viaje!'
            })
        }
    },
    

};

export default controller;