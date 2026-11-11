// Shared data layer: both teammates use the same dream shape.
const STORAGE_KEY = 'dream-bucket-list-v1';
let dreams = [];
let editingId = null;

function loadDreams() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    dreams = Array.isArray(saved) ? saved : [];
  } catch (error) {
    console.warn('Saved dreams could not be read', error);
    dreams = [];
  }
}

function saveDreams() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(dreams)); }
  catch (error) { console.warn('Could not save dreams', error); }
}

function refreshUI() {
  renderDreams();
  updateDashboard();
}
