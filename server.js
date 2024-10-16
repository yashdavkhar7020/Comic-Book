// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet'); 

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use(helmet());


const comicBookRoutes = require('./routes/comicBookRoutes');
app.use('/api/comics', comicBookRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});


const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch(err => {
    console.error('Failed to connect to MongoDB', err);
});
