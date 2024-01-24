import User from '../models/User.js'

const controller = {
    getUsers: (req, res)=>{
        res.json({
            users:[
                {user:'Jose',
                password:'Contraseña123', },
                {user:'Apolo',
                password:'polo123', }

            ]
        });       
    },    
    createUser: async (req, res)=>{
        try {

            const newUser = User.create(req.body);

        
            return res.status(201).json({
                success:true,
                message:'User creado correctamente!'
        })
            
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:'Error al crear user!'
            })
        }
    },
    

};

export default controller;