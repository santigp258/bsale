const express = require("express");
const app = express();
const path = require('path');
//configure
app.set("port", process.env.PORT || 3000);

//middlewares
app.use(express.json())

//routes
app.use("/api", require('./routes/liqueur'));

//static
app.use(express.static(path.join(__dirname, 'public')))

//starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
