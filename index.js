const express = require('express');
const cors = require('cors');
require('dotenv').config()

const { connection } = require('./configs/db');
const { noticeRouter } = require('./routes/notice.router')
const app = express();

app.use(express.json())
app.use(cors({
    origin: '*'
}))

app.use('/notice', noticeRouter)

app.get('/', (req, res) => {
    res.send('Base API Endpoint');
})

app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log('Connected to DB');
    } catch (error) {
        console.log(error);
        console.log('Cannot Connect to DB');
    }
    console.log(`Server running on port ${process.env.PORT}`);
})