document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const prenom = document.getElementById('prenom').value;
    const nom = document.getElementById('nom').value;
    const email = document.getElementById('email').value;
    const mot_de_passe = document.getElementById('mot_de_passe').value;

    const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prenom, nom, email, mot_de_passe })
    });

    const data = await response.json();
    if (data.message === "Utilisateur inscrit avec succès.") {
        window.location.href = '/login.html'; 
    } else {
        alert(data.message); 
    }
});

document.getElementById('backToLoginButton').addEventListener('click', () => {
    window.location.href = '/login.html'; 
});
