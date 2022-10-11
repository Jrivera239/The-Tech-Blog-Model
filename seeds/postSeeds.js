const { post, Post } = require("../models");
const postSeeds = [];

const seededPosts = () => Post.bulkCreate(postSeeds);

module.exports = seededPosts;
