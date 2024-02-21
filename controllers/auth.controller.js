import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import User from '../models/User.js'

const controller = {

    signUp: async (req, res, next)=>{

        try {
            req.body.verified_code = crypto.randomBytes(10).toString('hex');
            req.body.password = bcrypt.hashSync(req.body.password, 10)

            const user = await User.create(req.body)

            return res.status(201).json({
                success:true,
                message:'User registrado correctamente!'
        })

        } catch (error) {
            return res.status(500).json({
                success:false,
                message:'Error al registrar user!'
            })
        }
        

    }

}

export default controller;