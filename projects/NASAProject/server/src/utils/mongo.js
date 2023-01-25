const mongoose = require('mongoose');

const MONGO_URL = 'mongodb+srv://kaziadmin:gmNjcq17YzQj1xzy@cluster0.zxxxnbi.mongodb.net/nasadb?retryWrites=true&w=majority'

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready.');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});

mongoose.set('strictQuery', true);

async function mongoConnect() {
    await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
    await mongoose.disconnect();
};


module.exports = {
    mongoConnect,
    mongoDisconnect,
};