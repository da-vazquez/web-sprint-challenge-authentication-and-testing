// do not make changes to this file
const knex = require('knex');
const knexConfig = require('../knexfile.js');
const environment = 'development';

module.exports = knex(knexConfig[environment]);
