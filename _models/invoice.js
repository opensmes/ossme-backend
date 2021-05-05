const mongoose = require("mongoose");

const invoiceSchema = mongoose.Schema({
  item: { type: String, required: true },
  qty: { type: Number, required: true },
  date: { type: Date, required: true },
  due: { type: Date, required: true },
  rate: { type: Number, required: true },
  tax: { type: Number, required: true }
  // createdBy: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Client",
  //   required: true
  // }
});

module.exports = mongoose.model("Invoice", invoiceSchema);
