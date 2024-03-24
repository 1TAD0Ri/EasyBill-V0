const mongoose = require('mongoose')

const InvoiceSchema = new mongoose.Schema({
    creator:String,
    client:String,
    invoiceNumber: String,
    dueDate: Date,
    items: [ { title: String, price: Number, quantity: Number } ],
    total: Number,
    notes: String,
    tax:Number,
    type: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    creatorUser:String,
})

const Invoice = mongoose.model("Invoice",InvoiceSchema)
module.exports = Invoice;