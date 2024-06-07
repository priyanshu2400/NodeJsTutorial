const express = require('express')
const app = express()
const db = require('./db');
const Menu = require('./models/Menu');
const bodyParser = require('body-parser');
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
app.use(bodyParser.json());

app.get("/",(req,res) => {
  res.send("welcome to the website");
})

app.use("/person",personRoutes);
app.use("/menu",menuItemRoutes);

app.listen(3000,() => {
  console.log("listening on port 3000")
})

