document.addEventListener('DOMContentLoaded', function () {
    const loadReposButton = document.getElementById('loadRepos');
    const searchInput = document.getElementById('searchInput');

    loadReposButton.addEventListener('click', function () {
        const username = document.getElementById('username').value.trim();

        if (username !== '') {
            const loader = document.getElementById('loader');
            const repositoriesContainer = document.getElementById('repositories');
            const paginationContainer = document.getElementById('pagination');
            const userProfileContainer = document.getElementById('userProfile');
            
            loader.classList.remove('d-none');
            repositoriesContainer.innerHTML = '';
            paginationContainer.innerHTML = '';
            userProfileContainer.innerHTML = '';

            const apiUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
            const userProfileUrl = `https://api.github.com/users/${username}`;

            fetchRepos(apiUrl);
            fetchUserProfile(userProfileUrl);
        }
    });

    // Add event listener for the search input
    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.trim().toLowerCase();
        const repositoriesContainer = document.getElementById('repositories');
        const allRepositories = repositoriesContainer.querySelectorAll('.repository');

        allRepositories.forEach(repository => {
            const repoName = repository.querySelector('h4 a').textContent.toLowerCase();
            const repoDescription = repository.querySelector('p').textContent.toLowerCase();

            if (repoName.includes(searchTerm) || repoDescription.includes(searchTerm)) {
                repository.style.display = 'block';
            } else {
                repository.style.display = 'none';
            }
        });
    });
});

// ... (remaining code)


function fetchRepos(apiUrl) {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load repositories. Please try again.');
            }
            return response.json();
        })
        .then(data => {
            const loader = document.getElementById('loader');
            loader.classList.add('d-none');

            const repositories = data;
            const perPage = 10;

            function paginate(data, currentPage, perPage) {
                const start = (currentPage - 1) * perPage;
                const end = start + perPage;
                return data.slice(start, end);
            }

            function renderPagination(data) {
                const totalPages = Math.ceil(data.length / perPage);
                let paginationHtml = '';

                for (let i = 1; i <= totalPages; i++) {
                    paginationHtml += `<button class="btn btn-link page-link">${i}</button>`;
                }

                document.getElementById('pagination').innerHTML = paginationHtml;

                const pageLinks = document.querySelectorAll('.page-link');
                pageLinks.forEach(link => {
                    link.addEventListener('click', function () {
                        const currentPage = parseInt(link.textContent);
                        const paginatedData = paginate(repositories, currentPage, perPage);
                        renderRepositories(paginatedData);
                    });
                });
            }

            function renderRepositories(repoData) {
                const repositoriesContainer = document.getElementById('repositories');
                repositoriesContainer.innerHTML = '';
            
                // Split repositories into two columns
                const halfLength = Math.ceil(repoData.length / 2);
                const firstColumn = repoData.slice(0, halfLength);
                const secondColumn = repoData.slice(halfLength);
            
                // Create two columns
                const columnContainer = document.createElement('div');
                columnContainer.classList.add('row');
                
            
                // Render repositories in the first column
                const firstColumnHtml = firstColumn.map(repo => {
                    const topicsHtml = repo.topics.map(topic => `<span class="badge badge-primary">${topic}</span>`).join(' ');
                    return `
                        <div class="col-md-6">
                            <div class="repository">
                                <h4><a href="${repo.html_url}" target="_blank">${repo.name}</a></h4>
                                <p>${repo.description}</p>
                                <p>Topics: ${topicsHtml}</p>
                            </div>
                        </div>
                    `;
                }).join('');
            
                // Render repositories in the second column
                const secondColumnHtml = secondColumn.map(repo => {
                    const topicsHtml = repo.topics.map(topic => `<span class="badge badge-primary">${topic}</span>`).join(' ');
                    return `
                        <div class="col-md-6">
                            <div class="repository">
                                <h4><a href="${repo.html_url}" target="_blank">${repo.name}</a></h4>
                                <p>${repo.description}</p>
                                <p>Topics: ${topicsHtml}</p>
                            </div>
                        </div>
                    `;
                }).join('');
            
                // Append columns to the container
                columnContainer.innerHTML = firstColumnHtml + secondColumnHtml;
                repositoriesContainer.appendChild(columnContainer);
            }

            renderPagination(repositories);
            const paginatedData = paginate(repositories, 1, perPage); // Initially display the first page
            renderRepositories(paginatedData);
        })
        .catch(error => {
            const loader = document.getElementById('loader');
            loader.classList.add('d-none');

            const repositoriesContainer = document.getElementById('repositories');
            repositoriesContainer.innerHTML = `<p class="text-danger">${error.message}</p>`;
        });
}


function fetchUserProfile(userProfileUrl) {
    fetch(userProfileUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load user profile. Please try again.');
            }
            return response.json();
        })
        .then(user => {
            const loader = document.getElementById('loader');
            loader.classList.add('d-none');

            const userProfileContainer = document.getElementById('userProfile');
            const userAvatar = document.createElement('img');
            userAvatar.src = user.avatar_url;
            userAvatar.alt = 'User Avatar';
            userAvatar.classList.add('rounded-circle', 'mb-3');
            userAvatar.style.width = '100px';
            userAvatar.style.height = '100px';
            userProfileContainer.appendChild(userAvatar);

            const userName = document.createElement('h2');
            userName.textContent = user.login;
            userProfileContainer.appendChild(userName);

            const userInfo = document.createElement('p');
            userInfo.textContent = `Name: ${user.name || 'N/A'} | Followers: ${user.followers || 0} | Following: ${user.following || 0}`;
            userProfileContainer.appendChild(userInfo);

            // User Bio
            const userBio = document.createElement('p');
            userBio.textContent = `Bio: ${user.bio || 'N/A'}`;
            userProfileContainer.appendChild(userBio);
        })
        .catch(error => {
            console.error(error);
            const loader = document.getElementById('loader');
            loader.classList.add('d-none');
        });
}