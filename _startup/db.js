const mongoose = require("mongoose");
// const config = require('config');

module.exports = function () {
  //   const db = config.get('db');
  // const db =
  //   "mongodb://" +
  //   process.env.db_USER +
  //   ":" +
  //   process.env.db_PW +
  //   "@localhost/" +
  //   process.env.db_NAME;
  const db = "mongodb://localhost/" + process.env.db_NAME;

  mongoose.set("useCreateIndex", true);
  mongoose.set("useNewUrlParser", true);
  mongoose.set("useUnifiedTopology", true);
  //   mongoose.connect(db)
  //     .then(() => winston.info(`Connected to ${db}...`));
  mongoose
    .connect(db)
    .then(() => {
      console.log("Connected to database successfully");
    })
    .catch(() => {
      console.log("Database connection failed");
    });
};
