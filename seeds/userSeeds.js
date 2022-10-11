const { User } = require("../models");
const userSeeds = [];

const seededUsers = () => User.bulkCreate(userSeeds, { individualHooks: true });

module.exports = seededUsers;
