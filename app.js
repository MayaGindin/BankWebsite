const express = require('express');
const dotenv = require("dotenv");
const cors = require('cors');
const mongoose = require('mongoose');
var path = require('path');

dotenv.config();

// Connect Database
mongoose.connect(
    process.env.MONGODB_URI,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }
)
.then(() => console.log('💾 Connected to DB'))
.catch((err) => {
    console.error(err);
});

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./routes/dashboard'));
app.use(require('./routes/signin'));
app.use(require('./routes/signout'));
app.use(require('./routes/signup'));
app.use(require('./routes/deposit'));
app.use(require('./routes/transfer'));
app.use(require('./routes/transaction'));
app.use(require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🏎  Bank Server up and running at ${PORT}`));