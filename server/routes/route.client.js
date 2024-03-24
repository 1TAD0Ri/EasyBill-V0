const FactureController= require ("../controllers/Client.controllers");

module.exports=app =>{
    app.get("/api/clients", FactureController.findAllFactures);
    app.post("/api/clients",FactureController.createNewFacture);
    app.get("/api/clients/:id", FactureController.findOneFacture);
    app.patch("/api/clients/:id",FactureController.updateExisitingFacture);
    app.delete("/api/clients/:id",FactureController.deleteOneFacture);
}