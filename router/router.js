const verifySignUp = require("./verifySignUp");
const bookAuth = require("./verifyBook");
const authJwt = require("./verifyJwtToken");
const authController = require("../controller/authController.js");
const userController = require("../controller/userController.js");
const orderController = require("../controller/orderController.js");
const bookController = require("../controller/bookController.js");

module.exports = function(app) {
  /* Tampil book. */
  app.get(
    "/books",
    // , [authJwt.verifyToken]
    bookController.tampilsemuabuku
  );

  /* Tampil book by ID. */
  app.get(
    "/books/:id",
    // [authJwt.verifyToken],
    bookController.caribuku
  );

  /* Tambah book. */
  app.post(
    "/books",
    // [authJwt.verifyToken, bookAuth.checkDuplicate, authJwt.isAdmin],
    bookController.tambahbuku
  );

  /* Ubah book. */
  app.put(
    "/books/:id",
    // [authJwt.verifyToken, authJwt.isAdmin],
    bookController.updatebuku
  );

  /* Hapus book. */
  app.delete(
    "/books/:id",
    // [authJwt.verifyToken, authJwt.isAdmin],
    bookController.hapusbuku
  );

  /* REGISTER user. */
  app.post(
    "/register",
    // [verifySignUp.checkRolesExisted],
    authController.signup
  );
  /* LOGIN user. */
  app.post("/login", authController.signin);

  /* tampil semuausers. */
  app.get(
    "/users",
    // [authJwt.verifyToken],
    userController.users
  );
  app.get(
    "/users/:id",
    // [authJwt.verifyToken],
    userController.userContent
  );

  //ini bagian user
  //tampil semua order
  app.get("/orders", orderController.tampilorder);

  //tampil order
  app.get(
    "/orders/:id",
    // [authJwt.verifyToken],
    orderController.AmbilOrder
  );

  //input order
  app.post(
    "/orders/:id_buku/:id_user",
    // [authJwt.verifyToken]
    orderController.tambahorder
  );

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
