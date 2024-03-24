import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
    title: String,
    description: String,
    barcode: String,
    quantity: Number,
    price: Number,
    discount: Number,//remise
    reference: String,
    taxRate: Number
});

const InvoiceSchema = new mongoose.Schema({
    client: String,
    date: String,
    invoiceNumber: {
        type:String,
        unique:true,
        required:true,
    },
    dueDate: String,
    zeroTax: Boolean,
    articles: [ArticleSchema]
});

const Invoice = mongoose.model('Invoice', InvoiceSchema);

module.exports = Invoice;