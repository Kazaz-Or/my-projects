const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

const {loadPlanetData} = require('./models/planets.model')

const PORT = process.env.PORT || 8000;

const MONGO_URL = 'mongodb+srv://kaziadmin:gmNjcq17YzQj1xzy@cluster0.zxxxnbi.mongodb.net/nasadb?retryWrites=true&w=majority'

const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready.');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});

mongoose.set('strictQuery', true);

async function startServer() {
    await mongoose.connect(MONGO_URL);
    await loadPlanetData();
    server.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);   
    });
}

startServer();
