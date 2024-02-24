import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

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
        

    },

    signIn: async (req, res, next)=>{
        try {
            let user = await User.findOneAndUpdate(
                {email:req.user.email},
                {online:true},
                {new:true}
            )

            const token = jwt.sign(
                {
                    id: user._id,
                    email:user.email,
                    name:user.name,
                    image:user.image
                },
                process.env.SECRET,
                {expiresIn:'10h'}
            )

            user.password = null 
            return res.status(200).json({
                success:true,
                message:'User logueado correctamente!',
                response:{
                    token,
                    user:{
                        name:user.name,
                        email:user.email,
                        image:user.image
                    }
                }
            })


        } catch (error) {
            return res.status(500).json({
                success:false,
                message:'Error al autenticar usuario!',
                
            })
        }

    },

}

export default controller;