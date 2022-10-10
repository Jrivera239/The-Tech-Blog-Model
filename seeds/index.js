const seededUsers = require("./userSeeds");
const seededPosts = require("./postSeeds");
const seededComments = require("./commentSeeds");
const sequelize = require("../config/connection");

const seedData = async () => {
  await sequelize.sync({ force: true });
  await seededUsers();

  await seededPosts();

  await seededComments();

  process.exit(0);
};

seedData();