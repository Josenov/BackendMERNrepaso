import { Schema, model, Types } from "mongoose";


//nombre de lo que almacenaremos
let collection = 'cities'

//Esquema es la estructura y atributos, una plantilla
let schema = new Schema({
    name:{type:String, required:true},
    country:{type:String, required:true},
    image:{type:String, required:true},
    description:{type:String, required:true},
    user:{type:Types.ObjectId, ref:'users'}
}, {
    timestamps: true //con esto mongo asigna una fecha de carga y modificacion en la bd
})

//Modelo es el objeto pero con metodos que permitira manipular esta informacion CRUD
const City = model(collection,schema)

export default City;