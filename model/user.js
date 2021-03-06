module.exports = (sequelize, Sequelize) => {
  const MdlUser = sequelize.define("user", {
    id_user: {
      allowNull: false,
      autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    admin: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    }
  });
  return MdlUser;
};
