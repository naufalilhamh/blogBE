const env = require("./env.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  logging: false,
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../model/user.js")(sequelize, Sequelize);
db.artikel = require("../model/artikel.js")(sequelize, Sequelize);
db.komentar = require("../model/komentar.js")(sequelize, Sequelize);

//relasi antar table
db.user.hasMany(db.artikel, {
  foreignKey: "id_user"
});
db.user.hasMany(db.komentar, {
  foreignKey: "id_user"
});
db.artikel.hasMany(db.komentar, {
  foreignKey: "id_artikel"
});
//belongsto
db.artikel.belongsTo(db.user, {
  foreignKey: "id_user"
});
db.komentar.belongsTo(db.user, {
  foreignKey: "id_user"
});
db.komentar.belongsTo(db.artikel, {
  foreignKey: "id_artikel"
});

module.exports = db;
