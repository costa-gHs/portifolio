document.addEventListener("DOMContentLoaded", function() {
    const reposContainer = document.getElementById('repos-container');
    const loadingIndicator = document.getElementById('loading');

    fetch('https://api.github.com/users/costa-gHs/repos')
    .then(response => response.json())
    .then(data => {
        // Ordenar repositórios por data de criação, do mais recente para o mais antigo
        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        // Limpar o indicador de carregamento
        loadingIndicator.style.display = 'none';

        // Renderizar repositórios
        data.forEach(repo => {
            const repoDiv = document.createElement('div');
            repoDiv.classList.add('repo-item');
            repoDiv.innerHTML = `
                <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                <p>${repo.description ? repo.description : 'Sem descrição disponível.'}</p>
                <ul>
                    <li><strong>Linguagem:</strong> ${repo.language ? repo.language : 'N/A'}</li>
                    <li><strong>Última Atualização:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</li>
                </ul>
            `;
            reposContainer.appendChild(repoDiv);
        });
    })
    .catch(error => {
        loadingIndicator.innerText = 'Erro ao carregar repositórios.';
        console.error('Erro ao buscar repositórios:', error);
    });
});
