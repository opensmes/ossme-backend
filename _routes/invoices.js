const express = require("express");
// const checkAuth = require("../_middleware/check-auth");
// const uploadImage = require("../_middleware/image-upload");
const InvoicesController = require("../_controllers/invoices");
const router = express.Router();

// Create Invoice
router.post(
  "",
  // checkAuth,
  // uploadImage,
  // multer({ storage: storage }).single("image"),
  InvoicesController.createInvoice
);

// Create No-Image Invoice
// router.post("/noimage", checkAuth, InvoicesController.noImagePost);

// Update Invoice
router.put(
  "/:id",
  // checkAuth,
  // uploadImage,
  // multer({ storage: storage }).single("image"),
  InvoicesController.updateInvoice
);

// Fetch Invoices
router.get("", InvoicesController.getAllInvoices);

// Fetch a Single Invoice
router.get("/:id", InvoicesController.getSingleInvoice);

// Delete Invoice
router.delete(
  "/:id",
  // checkAuth,
  InvoicesController.deleteInvoice
);

module.exports = router;
