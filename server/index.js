const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const TodoItemRoute = require('./routes/Todo');

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_CONNECT)
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err));

app.use('/todo', TodoItemRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
