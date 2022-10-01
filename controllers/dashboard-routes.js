const { Accounts, Posts, Comments } = require('../models');
const router = require('express').Router();
const sequelize = require('../config/connection');
const uAuthenticate = require('../utils/auth');