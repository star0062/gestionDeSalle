document.addEventListener('DOMContentLoaded', () => {
    fetch('/verify-token', {
        method: 'GET', 
        credentials: 'same-origin' 
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Accès interdit.") {
            window.location.href = '/login.html'; 
        } else {
            document.getElementById('welcomeMessage').innerText = `Bienvenue, ${data.email}`;
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        window.location.href = '/login.html';
    });
});

function logout() {
    fetch('/logout', {
        method: 'POST',
    })
    .then(() => {
        window.location.href = '/login.html';
    })
    .catch((error) => {
        console.error('Erreur de déconnexion:', error);
    });
}
