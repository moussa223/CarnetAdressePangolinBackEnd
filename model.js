const mongoose = require('mongoose');
const db = require('./db');
const bcrypt = require('bcrypt');

const PangolinSchema = new mongoose.Schema({
    name: { type: String, default: null },
    role: { type: String, default: null },
    ami: { type: String, default: null },
    login: { type: String, default: null },
    password: { type: String, default: null }
})

const Pangolin = mongoose.model('Pangolin', PangolinSchema);

module.exports = Pangolin;