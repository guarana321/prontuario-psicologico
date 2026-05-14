const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

// Allow all origins - necessary for frontend hosted on Vercel
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(routes);

module.exports = app;
