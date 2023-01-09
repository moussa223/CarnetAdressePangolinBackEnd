const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://moussa:wU6UBaFkzzZ7fs9i@cluster0.dgqzfra.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true});
mongoose.connection.on('connected', () => console.log('Connected'));
mongoose.connection.on('error', () => console.log('Connection failed with - ',err));
module.exports = mongoose.connection;