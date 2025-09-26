
// Simple state management with localStorage
const appState = {
  user: JSON.parse(localStorage.getItem('eco_user') || 'null'),
  listings: JSON.parse(localStorage.getItem('eco_listings') || '[]'),
  messages: JSON.parse(localStorage.getItem('eco_messages') || '[]')
};

function saveState() {
  localStorage.setItem('eco_user', JSON.stringify(appState.user));
  localStorage.setItem('eco_listings', JSON.stringify(appState.listings));
  localStorage.setItem('eco_messages', JSON.stringify(appState.messages));
}

// Auth
function handleAuth() {
  const form = document.getElementById('auth-form');
  if(!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.username.value.trim();
    if(name){
      appState.user = { name };
      saveState();
      alert('Bienvenue ' + name + ' !');
      window.location.href = 'index.html';
    }
  });
}

// Create listing
function handleCreateListing() {
  const form = document.getElementById('create-form');
  if(!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const title = form.title.value.trim();
    const desc = form.description.value.trim();
    const img = form.image.value.trim();
    if(title){
      appState.listings.push({ title, desc, img: img || 'https://source.unsplash.com/400x300/?eco' });
      saveState();
      alert('Annonce ajoutée !');
      window.location.href = 'search.html';
    }
  });
}

// Display listings
function showListings() {
  const container = document.getElementById('listing-container');
  if(!container) return;
  const searchInput = document.getElementById('search-input');
  const render = () => {
    const q = (searchInput?.value || '').toLowerCase();
    container.innerHTML = '';
    appState.listings.filter(l => l.title.toLowerCase().includes(q)).forEach(l => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `<img src="${l.img}" alt=""><h3>${l.title}</h3><p>${l.desc}</p>`;
      container.appendChild(card);
    });
  };
  if(searchInput) searchInput.addEventListener('input', render);
  render();
}

// Profile
function showProfile() {
  const container = document.getElementById('profile-info');
  if(!container) return;
  if(!appState.user){
    container.innerHTML = '<p>Vous n\'êtes pas connecté.</p>';
    return;
  }
  container.innerHTML = `<h2>${appState.user.name}</h2>`;
  const myListings = appState.listings.map(l=>`<li>${l.title}</li>`).join('');
  container.innerHTML += `<h3>Mes annonces :</h3><ul>${myListings||'<li>Aucune annonce</li>'}</ul>`;
}

// Messages
function handleMessages() {
  const form = document.getElementById('msg-form');
  const box = document.getElementById('msg-box');
  if(!form || !box) return;
  const render = () => {
    box.innerHTML = appState.messages.map(m=>`<p><strong>${m.user}:</strong> ${m.text}</p>`).join('');
  };
  render();
  form.addEventListener('submit', e => {
    e.preventDefault();
    if(!appState.user){ alert('Connectez-vous'); return; }
    const text = form.message.value.trim();
    if(text){
      appState.messages.push({ user: appState.user.name, text });
      saveState();
      form.reset();
      render();
    }
  });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  handleAuth();
  handleCreateListing();
  showListings();
  showProfile();
  handleMessages();
});
