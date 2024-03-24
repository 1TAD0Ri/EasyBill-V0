const Facture = require('../models/Client.models');
const mongoose = require('mongoose');
const Users = require('../models/user.model');
const jwt = require("jsonwebtoken");
// READ ALL
module.exports.findAllFactures = async (req, res) => {
    try {
        const factures = await Facture.find();
        res.status(200).json(factures);
    } catch (err) {
        res.json(err);

    };
}
module.exports.findOneFactureByName = async (req, res) => {
    try {
        const { name } = req.params;

        // Convert the string to ObjectId

        const oneClient = await Facture.findOne({ reference:name});

        if (oneClient) {
            console.log(oneClient);
            res.status(200).json(oneClient );
        } else {
            res.status(404).json({ error: "Client not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
// READ ONE BY ID
module.exports.findOneFacture = async (req, res) => {
    try {
        const oneFacture = await Facture.findOne({ _id: req.params.id });
        res.json(oneFacture);
    } catch (err) {
        res.json(err);
    }
};

// CREATE
module.exports.createNewFacture = async (req, res) => {
    try {
        const newlyCreatedFacture = await Facture.create(req.body);
        res.json(newlyCreatedFacture);
    } catch (err) {
        res.status(400).json(err);
    }
};

// UPDATE
module.exports.updateExisitingFacture = async (req, res) => {
    try {
        const updatedFacture = await Facture.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        res.json(updatedFacture);
    } catch (err) {
        res.status(400).json(err);
    }
};

// DELETE
module.exports.deleteOneFacture = async (req, res) => {
    try {
        const result = await Facture.deleteOne({ _id: req.params.id });
        res.json(result);
    } catch (err) {
        res.json(err);
    }
};


module.exports.findAllClientByUser = async(req,res)=>{
    const token = req.header("Authorization");
    if(!token){
        return res.status(401).json({error:"Unauthorized"});
    }
    try{
        const decoded = jwt.verify(token.split(' ')[1],"fo9ma");
        console.log(decoded);
        if(!decoded.id){
            console.log("there is no user whith that token");
            return res.status(401).json({error:"User Id Not Found With That Token"});
        }
        console.log("Decoded",decoded);
        const user = await Users.findOne({_id:decoded.id})
        console.log(user);
        const result=await Facture.find({creatorUser:user.name});
        console.log(result);
        let resm = [];
        for(let i =0;i<result.length;i++){
            if(user.name === result[i].creatorUser){
                console.log('there is the user that have the same creator ');
                resm.push(result[i]);
            }
        }
        console.log(resm,"this is the result");
        return res.status(200).json(resm);
    }catch(error){
        console.log(error);
        return res.status(401).json({error:"Internal Server Error"});
    }
};
