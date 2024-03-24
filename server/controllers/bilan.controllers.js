const Invoice = require('../models/bilan.model');

module.exports.createFacture = (req,res)=>{
    Invoice.create(req.body).then(response=>{
        console.log(response);
        res.status(200).json(response);
    }).catch(error=>{
        console.log(error);
        res.status(400).json(error);
    })
};


module.exports.edit = (req,res)=>{
    const {id} = req.params;
    Invoice.findOneAndUpdate({_id:id}).then(response=>{
        console.log(response);
        res.status(200).json(response);
    }).catch(error=>{
        console.log(error);
        res.status(500).json(error);
    })
};


module.exports.showOne = (req,res)=>{
    Invoice.findById({_id:req.params}).then(response=>{
        console.log(response);
        res.status(200).json(response);
    }).catch(error=>{
        console.log(error);
        res.status(500).json(error);
    })
};


module.exports.showAll = (req,res)=>{
    Invoice.find().then(response=>{
        console.log(response);
        res.status(200).json(response);
    }).catch(error=>{
        console.log(error);
        res.status(500).json(error);
    })
};