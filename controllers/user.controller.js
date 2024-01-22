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
    postUsers: ()=>{},
    deleteUsers: ()=>{},

};

export default controller;