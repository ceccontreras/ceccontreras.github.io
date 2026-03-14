// ── EDIT THIS LIST to control which repos appear ──────────────────────────
const SHOW_REPOS = [
  'FitGame',
  'Sisifo',
  'MealTracker',
  'Simple-ChatBot',
  // Add more personal repo names here
];

// ── MANUAL CARDS for org/external repos not on your account ───────────────
const MANUAL_REPOS = [
  {
    name: 'ip-access-orlando',
    description: 'A full-stack web and mobile platform built in partnership with the City of Orlando to modernize their device loan program.',
    language: 'JavaScript',
    stargazers_count: 1,
    html_url: 'https://github.com/ipaccess-valencia-g2/ip-access-orlando',
  },
  // Add more manual entries here if needed
];

// ── SCREENSHOTS: map repo name → image filename in your project folder ─────
// Example: 'my-repo': 'images/my-repo-screenshot.png'
const REPO_IMAGES = {
  'ip-access-orlando': 'images/ip-access-orlando.png',
  'FitGame': 'Image1.png',
  'Sisifo': 'sisifo_image.png',
  'MealTracker': 'meal_tracker_image.png',
  'Simple-ChatBot': 'images/simple-chatbot.png',
  // 'repo-name-1': 'images/repo-name-1.png',
};
// ──────────────────────────────────────────────────────────────────────────

async function loadRepos() {
  const grid = document.getElementById('projects-grid');
  try {
    const res = await fetch('https://api.github.com/users/ceccontreras/repos?sort=updated&per_page=100');
    if (!res.ok) throw new Error('API error');
    const repos = await res.json();

    const fromGitHub = SHOW_REPOS
      .map(name => repos.find(r => r.name === name))
      .filter(Boolean);

    const filtered = [...fromGitHub, ...MANUAL_REPOS];

    if (filtered.length === 0) {
      grid.innerHTML = '<div class="status-msg">NO REPOSITORIES FOUND_</div>';
      return;
    }

    grid.innerHTML = filtered.map((repo, i) => {
      const img = REPO_IMAGES[repo.name];
      const imgHTML = img
        ? `<div class="card-img-wrap">
             <img class="card-img" src="${img}" alt="${repo.name} screenshot" />
           </div>`
        : '';

      return `
        <div class="project-card" style="animation-delay:${i * 0.06}s">
          ${imgHTML}
          <div class="card-body">
            <div class="card-index">[${String(i+1).padStart(2,'0')}]</div>
            <div class="card-name">${repo.name}</div>
            <div class="card-desc">${repo.description || 'No description provided.'}</div>
            <div class="card-meta">
              ${repo.language ? `<span class="card-lang">${repo.language}</span>` : ''}
              <span class="card-stars">★ ${repo.stargazers_count}</span>
              <a class="card-link" href="${repo.html_url}" target="_blank">VIEW →</a>
            </div>
          </div>
        </div>
      `;
    }).join('');

  } catch (err) {
    grid.innerHTML = `<div class="status-msg">ERROR: COULD NOT FETCH REPOS. CHECK NETWORK<span>_</span></div>`;
  }
}

loadRepos();