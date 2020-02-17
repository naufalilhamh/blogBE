const verifySignUp = require("./verifySignUp");
const authJwt = require("./verifyJwtToken");
const authController = require("../controller/authController.js");
const userController = require("../controller/userController.js");
const orderController = require("../controller/orderController.js");
const bookController = require("../controller/bookController.js");

module.exports = function(app) {
  //ini bagian book
  /* Tampil book. */
  app.get("/books", [authJwt.verifyToken], bookController.showAll);

  /* Tampil book by ID. */
  app.get("/books/:id", [authJwt.verifyToken], bookController.showBook);

  /* Tambah book. */
  app.post(
    "/books",
    [authJwt.verifyToken, authJwt.isAdmin],
    bookController.addbook
  );

  /* Ubah book. */
  app.put(
    "/books/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    bookController.updateBook
  );

  /* Hapus book. */
  app.delete(
    "/books/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    bookController.deleteBook
  );

  //ini bagian user
  /* REGISTER user. */
  app.post(
    "/register",
    [
      verifySignUp.checkDuplicateUserNameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    authController.signup
  );
  /* LOGIN user. */
  app.post("/login", authController.signin);

  /* SHOW all users. */
  app.get("/users", [authJwt.verifyToken], userController.users);

  //ini bagian user
  /* Tampil all orders. */
  app.get("/orders", [authJwt.verifyToken], orderController.orders);

  /* Tampil order by user ID. */
  app.get("/orders/:id", [authJwt.verifyToken], orderController.getOrder);

  /* Input order. */
  app.post("/orders", [authJwt.verifyToken], orderController.ordering);

  // error handler 404
  app.use(function(req, res, next) {
    return res.status(404).send({
      status: 404,
      message: "Not Found"
    });
  });
  // error handler 500
  app.use(function(err, req, res, next) {
    return res.status(500).send({
      error: err
    });
  });
};
