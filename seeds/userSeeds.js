const { User } = require("../models");

const seededUsers = () => User.bulkCreate(userSeeds, { individualHooks: true });

module.exports = seededUsers;
