document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    // Connexion d'utilisateur 
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const mot_de_passe = document.getElementById("mot_de_passe").value;

            try {
                const response = await fetch("http://localhost:3000/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, mot_de_passe }),
                    credentials: "include"
                });

                const data = await response.json();
                if (response.ok) {
                    window.location.href = "/index.html";
                } else {
                    alert(data.message);
                }
            } catch (err) {
                alert("Erreur lors de la connexion.");
            }
        });
    }

    fetch("http://localhost:3000/verify-token", { credentials: "include" })
    .then(res => res.json())
    .then(data => {
        if (!data.email) {
            window.location.href = "/login.html";
        }
    })
    .catch(() => window.location.href = "/login.html");
}); 


// Déconnexion
function logout() {
    fetch("http://localhost:3000/logout", { method: "POST", credentials: "include" })
    .then(() => {
        // alert("Déconnexion réussie !");
        window.location.href = "/login.html";
    })
    .catch(() => alert("Erreur lors de la déconnexion."));
}
