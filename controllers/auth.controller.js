import crypto from 'crypto';
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import {verify} from '../helpers/google-verify.js'
import bcryptjs from 'bcryptjs';

const controller = {

    signUp: async (req, res, next) => {

        try {
            req.body.verified_code = crypto.randomBytes(10).toString('hex');
            req.body.password = bcryptjs.hashSync(req.body.password, 10)

            const user = await User.create(req.body)

            return res.status(201).json({
                success: true,
                message: 'User registrado correctamente!'
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error al registrar user!'
            })
        }


    },

    signIn: async (req, res, next) => {
        try {
            let user = await User.findOneAndUpdate(
                { email: req.user.email },
                { online: true },
                { new: true }
            )

            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    image: user.image
                },
                process.env.SECRET,
                { expiresIn: '10h' }
            )

            user.password = null
            return res.status(200).json({
                success: true,
                message: 'User logueado correctamente!',
                response: {
                    token,
                    user: {
                        name: user.name,
                        email: user.email,
                        image: user.image
                    }
                }
            })


        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error al autenticar usuario!',

            })
        }

    },

    googleSignIn: async (req, res, next) => {
        const { token_id } = req.body;

        try {

            const {name, email, image} = await verify(token_id)

            let user = await User.findOne({email}); //Puede ser user o null

            if(!user){
                const data = {
                    name,
                    email,
                    image,
                    password:bcryptjs.hashSync(process.env.DEFAULT_PASSWORD, 10),
                    google:true,
                    role:'user'
                    //verified_code:crypto.randomBytes(10).toString('hex')
                }

                user = await User.create(data)
            }

            user.online=true;

            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    image: user.image
                },
                process.env.SECRET,
                { expiresIn: '10h' }
            )

            res.status(200).json({
                success: true,
                message: 'User logueado con Google correctamente!',
                response: {
                    token,
                    user: {
                        name: user.name,
                        email: user.email,
                        image: user.image
                    }
                }
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error al verificar token Google!',

            })
            
        }
    },

    signOut: async (req, res, next) => {
        try {
            const user = await User.findOneAndUpdate(
                { email: req.user.email },
                { online: false },
                { new: true }
            )

            return res.status(200).json({
                success: true,
                message: 'User deslogueado correctamente!',

            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error al autenticar usuario!',

            })
        }
    },

    token: async (req, res, next) => {
        const { user } = req

        try {
            return res.status(200).json({

                user: {
                    name: user.name,
                    email: user.email,
                    image: user.image
                },

            })
        } catch (error) {
            next(error)
        }
    }

}

export default controller;