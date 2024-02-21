import { Schema, model, Types } from "mongoose";

const collection = "travelCompanies"

const schema = new Schema({
    name: { type: String, required: true },
    logo: { type: String },
    website: { type: String, required: true },
    description: { type: String, required: true },
    contact_info: {
        phone_number: { type: String, required: true },
        email: { type: String, required: true },
        social_media: {
            facebook: { type: String  },
            instagram: { type: String },
            xtwitter: { type: String}
            }
        },
    cities:[{type:Types.ObjectId, ref:'cities'}]

    }) 

const travelCompanies = model(collection,schema)

export default travelCompanies;