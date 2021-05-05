const { db } = require("../_models/invoice");
const Invoice = require("../_models/invoice");

// CREATE NEW INVOICE
exports.createInvoice = (req, res, next) => {
  const _url = req.protocol + "://" + req.get("host");
  const { item, qty, date, due, tax, rate } = req.body;
  const invoice = new Invoice({
    item: req.body.item,
    qty: req.body.qty,
    date: req.body.date,
    due: req.body.due,
    tax: req.body.tax,
    rate: req.body.rate
    // createdBy: req.userData.userId
  });

  // Check for user data available
  // console.log(req.userData);
  // return res.status(200).json({});
  // Check for user data available

  invoice
    .save()
    .then((createdInvoice) => {
      // console.log(createdPost);
      res.status(201).json({
        message: "Invoice added successfully",
        invoice: {
          ...createdInvoice,
          id: createdInvoice._id
          // title: createdPost.title,
          // content: createdPost.content,
          // imagePath: createdPost.imagePath
        }
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Invoice creation failed!"
      });
      // console.log(post);
    });
};

// // CREATE NO-IMAGE INVOICE
// exports.noImagePost = (req, res, next) => {
//   // const post = req.body;
//   const post = new Invoice({
//     title: req.body.title,
//     content: req.body.content,
//     imagePath: "",
//     createdBy: req.userData.userId,
//   });
//   post
//     .save()
//     .then((createdPost) => {
//       // console.log(createdPost);
//       res.status(201).json({
//         message: "Invoice added successfully",
//         postId: createdPost._id,
//       });
//     })
//     .catch((error) => {
//       res.status(500).json({
//         message: "Invoice creation failed!",
//       });
//       // console.log(post);
//     });
// };

// UPDATE INVOICE
exports.updateInvoice = (req, res, next) => {
  // console.log(req.file);
  // let imagePath = req.body.imagePath;
  // if (req.file) {
  //   const _url = req.protocol + "://" + req.get("host");
  //   imagePath = _url + "/images/" + req.file.filename;
  // }
  const invoice = new Invoice({
    _id: req.body.id,
    item: req.body.item,
    qty: req.body.qty,
    date: req.body.date,
    due: req.body.due,
    tax: req.body.tax,
    rate: req.body.rate
    // createdBy: req.userData.userId
  });
  // console.log(post);
  Invoice.updateOne(
    {
      _id: req.params.id
      // createdBy: req.userData.userId
    },
    invoice
  )
    .then((result) => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful" });
      } else {
        res.status(401).json({ message: "Update failed! - Unathorized" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Invoice update failed!"
      });
      // console.log(post);
    });
};

// FETCH ALL INVOICES
exports.getAllInvoices = (req, res, next) => {
  const pageSize = +req.query.pagesize; // + convert string to number
  const currentPage = +req.query.page; // + convert string to number
  const invoiceQuery = Invoice.find();
  let fetchedInvoices;

  if (pageSize && currentPage) {
    invoiceQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  invoiceQuery
    .then((documents) => {
      // Invoice.find().then((documents) => {
      fetchedInvoices = documents;
      return Invoice.countDocuments();
    })
    .then((count) => {
      res.status(200).json({
        message: "Invoices fetched successfully!",
        invoices: fetchedInvoices,
        totalInvoices: count
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Invoices fetch failed!"
      });
      // console.log(post);
    });
};

// FETCH A SINGLE INVOICE
exports.getSingleInvoice = (req, res, next) => {
  Invoice.findById(req.params.id)
    .then((invoice) => {
      // invoice.aggregate([
      //   {
      //     $invoice: {
      //       date: { $dateToString: { format: "%Z", date: "$date" } }
      //     }
      //   }
      // ]);
      if (invoice) {
        res.status(200).json(invoice);
      } else {
        res.status(404).json({
          message: "Invoices not found"
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Invoice fetch failed!"
      });
      // console.log(post);
    });
};

// DELETE INVOICE
exports.deleteInvoice = (req, res, next) => {
  // console.log(req.params.id);
  Invoice.deleteOne({
    _id: req.params.id
    // createdBy: req.userData.userId
  })
    .then((result) => {
      console.log(result);
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Invoice deleted" });
      } else {
        res.status(401).json({ message: "Delete failed" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Invoice deletion failed!"
      });
    });
};
