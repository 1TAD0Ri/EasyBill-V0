const {createUser,findOne,getAll,loginUser,findOneByToken} = require('../controllers/loginRegistration')
const FactureController= require ("../controllers/Client.controllers");
const {findAllInvoices,findAllInvoicesByUser,createNewInvoice,findOneInvoiceById,updateOneInvoice,deleteOneInvoice, findSalesInvoicesByUser ,findPurchaseInvoicesByUser}  = require('../controllers/invoice.controller')
module.exports = (app)=>{
    app.get('/api/getusertoken',findOneByToken)
    // this for the creation of the product
    app.post('/api/new',createUser);
    app.get('/api/dash',findOne);
    app.post('/api/login',loginUser);
    app.get("/api/clients", FactureController.findAllFactures);
    app.get('/api/getClientByUser',FactureController.findAllClientByUser);
    app.post("/api/clients",FactureController.createNewFacture);
    app.get("/api/clients/:id", FactureController.findOneFacture);
    app.patch("/api/clients/:id",FactureController.updateExisitingFacture);
    app.delete("/api/clients/:id",FactureController.deleteOneFacture);
    // 
    app.get("/api/clients/get/:name",FactureController.findOneFactureByName);
    // 
    // app.get('/api/Invoices', findAllInvoices);
    app.get('/api/sales', findSalesInvoicesByUser);
    app.get('/api/purchase', findPurchaseInvoicesByUser);
    app.get('/api/Invoices', findAllInvoicesByUser);

    app.post('/api/Invoices', createNewInvoice);
    app.get('/api/Invoices/:id', findOneInvoiceById);
    app.put('/api/Invoices/:id', updateOneInvoice);
    app.delete('/api/Invoices/:id', deleteOneInvoice);
}