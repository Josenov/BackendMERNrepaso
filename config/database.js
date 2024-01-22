import mongoose from 'mongoose'

mongoose.connect(process.env.MONGO)
    .then(()=>console.log('MONGODB connected'))
    .catch(err=>console.log(err))