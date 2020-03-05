const verifySignUp = require("./verifySignUp");
const bookAuth = require("./verifyBook");
const authJwt = require("./verifyJwtToken");
const authController = require("../controller/authController.js");
const userController = require("../controller/userController.js");
const komentarController = require("../controller/komentarController.js");
const orderController = require("../controller/orderController.js");
const artikelController = require("../controller/artikelController.js");

module.exports = function(app) {
  // ARTIKEL

  app.get(
    "/artikel",
    // , [authJwt.verifyToken]
    artikelController.tampilsemuaartikelhide
  );
  app.get(
    "/artikelsem",
    // , [authJwt.verifyToken]
    artikelController.tampilsemuaartikel
  );
  app.get(
    "/artikelkomen/:id",
    // [authJwt.verifyToken],
    komentarController.tampilkomentarperartikel
  );
  app.get(
    "/artikelu",
    // , [authJwt.verifyToken]
    artikelController.tampilsemuaartikel
  );
  app.get(
    "/artikelg",
    // , [authJwt.verifyToken]
    artikelController.tampilsemuaartikelshow
  );

  /* Tampil book by ID. */
  app.get(
    "/artikel/:id",
    // [authJwt.verifyToken],
    artikelController.tampilartikelperIDartikel
  );
  app.get(
    "/artikels/:id",
    // [authJwt.verifyToken],
    artikelController.tampilartikelperIDuser
  );

  /* Tambah book. */
  app.post(
    "/artikel/:id",
    // [authJwt.verifyToken, bookAuth.checkDuplicate, authJwt.isAdmin],
    artikelController.tambahartikel
  );

  /* Ubah book. */
  app.put(
    "/artikeltampil/:id",
    // [authJwt.verifyToken, authJwt.isAdmin],
    artikelController.tampilkan
  );
  app.put(
    "/artikelsembunyi/:id",
    // [authJwt.verifyToken, authJwt.isAdmin],
    artikelController.sembunyikan
  );
  /* Hapus book. */
  app.delete(
    "/artikel/:id",
    // [authJwt.verifyToken, authJwt.isAdmin],
    artikelController.hapusartikel
  );

  // USER
  /* REGISTER user. */
  app.post("/register", authController.signup);
  /* LOGIN user. */
  app.post("/login", authController.signin);

  /* tampil semuausers. */
  app.get(
    "/users",
    // [authJwt.verifyToken],
    userController.users
  );
  app.put(
    "/users/:id",
    // [authJwt.verifyToken],
    userController.updatestatus
  );
  app.get(
    "/users/:id",
    // [authJwt.verifyToken],
    userController.userContent
  );

  //KOMENTAR
  app.post(
    "/komentar/:id_artikel/:id_user",
    // [authJwt.verifyToken, bookAuth.checkDuplicate, authJwt.isAdmin],
    komentarController.tambahkomentar
  );
  app.put(
    "/komentar/:id",
    // [authJwt.verifyToken],
    komentarController.updatestatuskomentar
  );
  app.get(
    "/komentar",
    // [authJwt.verifyToken],
    komentarController.tampilsemuakomentarhide
  );
  app.delete(
    "/komentar/:id",
    // [authJwt.verifyToken],
    komentarController.hapuskomentar
  );

  //tampilkomentarperartikel

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
