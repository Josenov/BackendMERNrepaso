import City from '../models/City.js'

const controller = {
    //como es asincrono necesitaremos usar Async
    getCities: async (req, res)=>{

        let queries = {};

        if(req.query.name){
            //usamos RegExp (mas el operador regular ^ para matchear con el comienzo del string )
            //+ i (ignore case sensitive para que no tenga en cuenta mayusculas o minusculas)
            queries.name = new RegExp(`^${req.query.name}`,'i')
        }

        if(req.query.country){
    
            queries.country = req.query.country
        }

        
        try {
            
            const cities = await City.find(queries).populate('user')

            if(cities.length > 0){
                return res.status(200).json({
                    success:true,
                    cities:cities
                })
            }

            //Error de cliente
            return res.status(404).json({
                success:false,
                message:'No se encontro los buscado!'
            })


            //Error de servidor
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:'Error al traer ciudades!'
        })
        }
    },
    
    getCityById: async (req, res) =>{
        try {
            const oneCity = await City.findById(req.params.id)

            if(oneCity){
                return res.status(200).json({
                    success:true,
                    oneCity:oneCity
                })
            }

            return res.status(404).json({
                success:false,
                message: "No se encontro la ciudad solicitada por ID" 
            })

            
            
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:'Error al traer ciudades!'
        })
        }
    },


    
    createCity: async (req, res)=>{
        try {
            const newCity = City.create(req.body);

        //Devolvemos una respuesta mediante un return y un codigo de status, en este caso
        // usaremos el 201 (created)
            return res.status(201).json({
                success:true,
                message:'Ciudad cargada correctamente!'
        })
            
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:'Error al cargar ciudad!'
        })
            
        }
        
    },
    

};

export default controller;