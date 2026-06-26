document.getElementById("buscar").addEventListener("click", () => {

    const user = document.getElementById("usuario").value.trim();


    if (!user) {
        return alert("Ingrese un usuario");
    }

    document.getElementById("resultado").innerHTML =
        "🔄 Buscando...";

    fetch(`https://api.github.com/users/${user}`)
        .then((res) => {

            if (!res.ok) {
                throw new Error("Usuario no encontrado");
            }

            return res.json();
        })
        .then((data) => {

            document.getElementById("resultado").innerHTML = `
                <img src="${data.avatar_url}" alt="Avatar">

                <h2>${data.login}</h2>

                <p>👥 Seguidores: ${data.followers}</p>

                <p>📦 Repos públicos: ${data.public_repos}</p>
                
                <a href="${data.html_url}" target="_blank">
                    Ver perfil
                </a>
            `;
            fetch(`https://api.github.com/users/${user}/repos?sort=updated`)
            .then((resRepos) => resRepos.json())
            .then((repos) => {
             document.getElementById("lista-repos").innerHTML = `
               <p>📦 Último Repo público: <strong>${repos[0].name}</strong></p>
                <a href="${repos[0].html_url}" target="_blank">
                    Ver Repositorio
                </a> 
            `;                
                console.log("Último repo:", repos[0].name);
            });
        })
        .catch((error) => {

            document.getElementById("resultado").innerHTML =
                `❌ ${error.message}`;
        })
        .finally(() => {

            console.log("🔵 Búsqueda finalizada");
        });

});