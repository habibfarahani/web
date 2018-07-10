//import express from 'express';
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!!');
})

app.listen(4000, () => console.log('Express Server runnig on port 4000'));