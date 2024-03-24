const mongoose = require("mongoose");


// ArticleSchema

const ArticleSchema = new mongoose.Schema({
    titre:{
        type:String,
        trim: true,
        required: [true, "{PATH} is required"],
        minLength: [3, "{PATH} must be at least 3 characters"],


    } ,
    prenom:{
        type:String,
        trim: true,
        required: [true, "{PATH} is required"],
        minLength: [3, "{PATH} must be at least 3 characters"],


    } ,

    telephone:{
        type:Number,
        trim: true,
        required: [true, "{PATH} is required"],
        
    } ,
    numérofiscale :{
        type: Number,
        trim:true,
        required: [true, "{PATH} is required"],
        // min:0,

    },
    adresse:{
        type:String,
        trim: true,
        required: [true, "{PATH} is required"],
        minLength: [3, "{PATH} must be at least 3 characters"],
    } ,

    reference:{
        type:String,
        trim: true,
        required: [true, "{PATH} is required"],
        minLength: [3, "{PATH} must be at least 3 characters"],
    },
    creatorUser:String
    },{ timestamps: true }
);
const Facture=mongoose.model("Facture",ArticleSchema);
module.exports=Facture;