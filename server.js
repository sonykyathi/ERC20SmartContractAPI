require('dotenv').config()

const express = require('express')
const app = express()

app.use(express.json())

const contractsRouter = require('./routes/contracts');
const contractsetRouter = require('./routes/contractSet');

app.use('/contracts', contractsRouter)
app.use('/contractset', contractsetRouter)
app.listen(3000, () => console.log('Server Started'))