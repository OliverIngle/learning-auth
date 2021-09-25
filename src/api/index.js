//requirements
const express = require('express');
const path = require('path');
const PORT = 8080;

//app
const app = express();

//settings
app.use(express.json());

//routers
const index = require('./routes/index');
const userRoute = require('./routes/userRoute');

//routes
app.use('/', index);
app.use('/users', userRoute)

//listener
app.listen(PORT, _ => console.log(`App running on http://localhost:${PORT}`));