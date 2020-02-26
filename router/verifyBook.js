const db = require("../app/db.js");
const Book = db.book;
checkDuplicate = (req, res, next) => {
  // -> Check Title
  Book.findOne({
    where: {
      title: req.body.title
    }
  }).then(book => {
    if (book) {
      res.status(400).send("Fail -> Title buku sudah ada!");
      return;
    }
    next();
  });
};

const bookAuth = {};
bookAuth.checkDuplicate = checkDuplicate;

module.exports = bookAuth;
