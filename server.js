const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 5000;
const app = express ();

dotenv.config();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));

// content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// built-in middlware for JSON
app.use(express.json());

app.use('/auth', require('./src/routes/auth'));
app.use('/logout', require('./src/routes/logout'));

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
