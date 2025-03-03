require("dotenv").config();
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const profileRoutes = require('./routes/profileRoutes');

const app = express();
const db = new sqlite3.Database("./database.db", (err) => {
    if (err) console.error(" Erreur de connexion à la base de données :", err.message);
    else console.log(" ");
});

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const SECRET_KEY = "votre_cle_secrete";

// Importer et utiliser les routes
const routes = require("./routes/routes")(db, SECRET_KEY);
app.use("/", routes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`));
