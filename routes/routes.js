const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

module.exports = (db, SECRET_KEY) => {
    // Middleware d'authentification
    const verifyToken = (req, res, next) => {
        const token = req.cookies.token;
        if (!token) return res.redirect("/login.html"); 

        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) return res.redirect("/login.html");
            req.user = decoded;
            next();
        });
    };

    // redirige vers login si user non connecté
    router.get("/", (req, res) => {
        const token = req.cookies.token;
        if (!token) return res.redirect("/login.html");
        res.redirect("/index.html");
    });

    // route page d'accueil
    router.get("/index", verifyToken, (req, res) => {
        res.redirect("/index.html");
    });

    // Route sans authentification
    router.get("/login.html", (req, res) => {
        res.sendFile(path.join(__dirname, "../public", "login.html"));
    });

    // Route pour vérifier le token.
    router.get("/verify-token", verifyToken, (req, res) => {
        res.json({ email: req.user.email, message: "Token valide." });
    });

    // Route de connexion
    router.post("/login", (req, res) => {
        const { email, mot_de_passe } = req.body;

        db.get("SELECT * FROM utilisateurs WHERE email = ?", [email], async (err, user) => {
            if (!user) return res.status(400).json({ message: "Utilisateur non trouvé." });

            const validPassword = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
            if (!validPassword) return res.status(400).json({ message: "Mot de passe incorrect." });

            const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: "1h" });

            res.cookie("token", token, { httpOnly: true, secure: false, maxAge: 3600000 });
            res.json({ message: "Connexion réussie." });
        });
    });

    // Route d'inscription
    router.post("/register", async (req, res) => {
        const { prenom, nom, email, mot_de_passe } = req.body;
        if (!prenom || !nom || !email || !mot_de_passe) {
            return res.status(400).json({ message: "Tous les champs sont requis." });
        }

        db.get("SELECT * FROM utilisateurs WHERE email = ?", [email], async (err, user) => {
            if (user) return res.status(400).json({ message: "Cet email est déjà utilisé." });

            const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
            db.run(
                "INSERT INTO utilisateurs (prenom, nom, email, mot_de_passe, role) VALUES (?, ?, ?, ?, ?)",
                [prenom, nom, email, hashedPassword, "utilisateur"],
                function (err) {
                    if (err) return res.status(500).json({ message: "Erreur lors de l'inscription." });
                    res.status(201).json({ message: "Utilisateur inscrit avec succès." });
                }
            );
        });
    });

    // Route de déconnexion
    router.post("/logout", (req, res) => {
        res.clearCookie("token");
        res.json({ message: "Déconnexion réussie." });
    });

    return router;
};
