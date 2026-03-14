async function loadRepos() {
  const grid = document.getElementById('projects-grid');
  try {
    const res = await fetch('https://api.github.com/users/ceccontreras/repos?sort=updated&per_page=30');
    if (!res.ok) throw new Error('API error');
    const repos = await res.json();

    // filter out forks, sort by stars then updated
    const filtered = repos
      .filter(r => !r.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at));

    if (filtered.length === 0) {
      grid.innerHTML = '<div class="status-msg">NO REPOSITORIES FOUND_</div>';
      return;
    }

    grid.innerHTML = filtered.map((repo, i) => `
      <div class="project-card" style="animation-delay:${i * 0.06}s">
        <div class="card-index">[${String(i+1).padStart(2,'0')}]</div>
        <div class="card-name">${repo.name}</div>
        <div class="card-desc">${repo.description || 'No description provided.'}</div>
        <div class="card-meta">
          ${repo.language ? `<span class="card-lang">${repo.language}</span>` : ''}
          <span class="card-stars">★ ${repo.stargazers_count}</span>
          <a class="card-link" href="${repo.html_url}" target="_blank">VIEW →</a>
        </div>
      </div>
    `).join('');

  } catch (err) {
    grid.innerHTML = `<div class="status-msg">ERROR: COULD NOT FETCH REPOS. CHECK NETWORK<span>_</span></div>`;
  }
}

loadRepos();
