const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
    origin: "http://localhost:5000"
};

app.use(cors(corsOptions));

// Parse (String of commands) to the application / URL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

// Sync with mySQL Server
db.sequelize.sync();

//Sync drop and resync with mySQL server
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//   });

// simple respond
app.get("/", (req, res) => {
    res.json({ message: "Welcome to CYC application." });
});

require("./app/routes/CYC.routes")(app);

// Run on server port 9080
app.listen(9080, () => {
    console.log("Server is running on port 9080");
});


