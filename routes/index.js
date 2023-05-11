const express = require('express');

// Import our modular routers for /tips and /feedback
const notesRouter = require('./notes');

const app = express();

app.use('/notes', notesRouter);
console.log('Hit app.use router in routes folder');

module.exports = app;
