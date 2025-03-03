const sqlite3 = require('sqlite3').verbose(); // Importer sqlite3
const path = require('path');

// Créer une instance de la base de données (si elle n'existe pas, elle sera créée)
const db = new sqlite3.Database(path.join(__dirname, 'database.db'), (err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err.message);
    } else {
        console.log('Connexion à la base de données réussie.');
    }
});

// Exposer la base de données pour utilisation dans d'autres fichiers
module.exports = db;
