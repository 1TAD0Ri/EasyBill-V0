const Invoice = require('../models/invoice.model');
// Create
const jwt = require("jsonwebtoken");
const Users = require('../models/user.model');
const secretKey = process.env.SECRET_KEY || 'fo9ma';
module.exports.createNewInvoice = (req, res) => {
    console.log(req.body);
    Invoice.create(req.body)
        .then(newCreatedInvoice => { res.status(201).json(newCreatedInvoice) })
        .catch(error => res.status(400).json(error))
}
// Read All
// findAllInvoicesbyuser
module.exports.findAllInvoicesByUser = async (req, res) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token.split(' ')[1], 'fo9ma');
        console.log(decoded);
        if (!decoded.id) {
            console.log('there is no decoded id');
            return res.status(401).json({ error: "User Id not Found in Token" });
        }
        console.log("Decoded", decoded);
        const user = await Users.findOne({ _id: decoded.id });
        console.log(user.name,"7894561230124568");
        const invoice = await Invoice.find({ creatorUser:user.name })
        console.log(invoice,"Invoice User");
        console.log(user.name,"sd qd qd");
        console.log(invoice[0].creatorUser,"dqsd qsdq d");
        let result=[];
        for(let i=0;i<invoice.length;i++){
            if (user.name === invoice[i].creatorUser){
            console.log("there is the user that had the same name");
            result.push(invoice[i]);
            }
        }
        console.log(result,"the result")
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({error:"Internal Server Error"})
    }
}
// findAllInvoices
module.exports.findAllInvoices = (req, res) => {
    Invoice.find({})
        .then(allInvoices => res.status(200).json(allInvoices))
        .catch(error => res.status(404).json(error))
}
// Read One
// findOneInvoice
module.exports.findOneInvoiceById = (req, res) => {
    Invoice.findById({ _id: req.params.id })
        .then(oneInvoice => res.status(200).json(oneInvoice))
        .catch(error => res.status(500).json(error))
}

// Update
// updateOneInvoice
module.exports.updateOneInvoice = (req, res) => {
    Invoice.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        .then(updatedInvoice => res.status(200).json(updatedInvoice))
        .catch(error => res.status(500).json(error))
}
// Delete
// deleteOneInvoice
module.exports.deleteOneInvoice = (req, res) => {
    Invoice.findByIdAndDelete({ _id: req.params.id })
        .then(deletedInvoice => res.status(200).json(deletedInvoice))
        .catch(error => res.status(500).json(error))
}
module.exports.findSalesInvoicesByUser = async (req, res) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], 'fo9ma');
        console.log(decoded);

        if (!decoded.id) {
            console.log('There is no decoded id');
            return res.status(401).json({ error: "User Id not Found in Token" });
        }

        console.log("Decoded", decoded);

        const user = await Users.findOne({ _id: decoded.id });
        console.log(user.name, "User Name");

        const salesInvoices = await Invoice.find({
            creatorUser: user.name,
            type: 'sales', // Specify the type you are looking for
        });

        console.log(salesInvoices, "Sales Invoices");

        return res.status(200).json(salesInvoices);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: "Internal Server Error" });
    }
}
module.exports.findPurchaseInvoicesByUser = async (req, res) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], 'fo9ma');
        console.log(decoded);

        if (!decoded.id) {
            console.log('There is no decoded id');
            return res.status(401).json({ error: "User Id not Found in Token" });
        }

        console.log("Decoded", decoded);

        const user = await Users.findOne({ _id: decoded.id });
        console.log(user.name, "User Name");

        const salesInvoices = await Invoice.find({
            creatorUser: user.name,
            type: 'purchase', // Specify the type you are looking for
        });

        console.log(salesInvoices, "Sales Invoices");

        return res.status(200).json(salesInvoices);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: "Internal Server Error" });
    }
}
