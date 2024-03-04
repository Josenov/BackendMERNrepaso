import { Schema, model, Types } from "mongoose";

let collection = 'users';

let schema = new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    image:{type:String},
    google:{type:Boolean, default:false},
    role:{type:String, required:true},
    online:{type:Boolean, default:false},
    verified:{type:Boolean, default:true},
    verified_code:{type:String}
    
}, {
    timestamps: true //con esto mongo asigna una fecha de carga y modificacion en la bd
})

//Modelo es el objeto pero con metodos que permitira manipular esta informacion CRUD
const User = model(collection,schema)

export default User;