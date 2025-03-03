document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const mot_de_passe = document.getElementById('mot_de_passe').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, mot_de_passe })
    });

    const data = await response.json();
    if (data.message === "Connexion réussie.") {
        window.location.href = '/index'; 
    } else {
        alert(data.message); 
    }
});

document.getElementById('createAccountButton').addEventListener('click', () => {
    window.location.href = '/register.html'; 
});
