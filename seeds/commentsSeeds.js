const { Comment } = require("../models");
const commentSeeds = [];

const seededComments = () => Comment.bulkCreate(commentSeeds);

module.exports = seededComments;