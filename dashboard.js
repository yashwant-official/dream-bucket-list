const dreamList = document.getElementById('dream-list');
const statusFilter = document.getElementById('status-filter');

function updateDashboard() {
  const total = dreams.length;
  const completed = dreams.filter(dream => dream.completed).length;
  const percentage = total ? Math.round(completed / total * 100) : 0;
  document.getElementById('total-count').textContent = total;
  document.getElementById('completed-count').textContent = completed;
  document.getElementById('pending-count').textContent = total - completed;
  document.getElementById('progress-percent').textContent = percentage + '%';
  document.getElementById('progress-fill').style.width = percentage + '%';
  document.getElementById('progress-track').setAttribute('aria-valuenow', percentage);
}

function toggleDream(id) {
  const dream = dreams.find(item => item.id === id);
  if (!dream) return;
  dream.completed = !dream.completed;
  saveDreams();
  refreshUI();
}

function renderDreams() {
  dreamList.replaceChildren();
  const filter = statusFilter.value;
  const visible = dreams.filter(dream => filter === 'all' || (filter === 'completed' ? dream.completed : !dream.completed));
  if (!visible.length) {
    const empty = document.createElement('p');
    empty.className = 'empty';
    empty.textContent = 'No dreams here yet. Add a dream or choose another filter!';
    dreamList.append(empty);
    return;
  }
  visible.forEach(dream => {
    const card = document.createElement('article');
    card.className = 'dream-card' + (dream.completed ? ' is-complete' : '');
    const title = document.createElement('h3'); title.textContent = dream.name;
    const meta = document.createElement('p'); meta.className = 'meta';
    meta.textContent = `${dream.category} · ${dream.priority || 'Medium'} priority${dream.targetDate ? ' · Target: ' + dream.targetDate : ''}`;
    const description = document.createElement('p'); description.textContent = dream.description;
    const status = document.createElement('span'); status.className = 'status';
    status.textContent = dream.completed ? 'Completed ✓' : 'Pending';
    const actions = document.createElement('div'); actions.className = 'actions';
    const toggle = document.createElement('button'); toggle.className = 'complete';
    toggle.textContent = dream.completed ? 'Mark Pending' : 'Mark Completed';
    toggle.addEventListener('click', () => toggleDream(dream.id));
    const edit = document.createElement('button'); edit.className = 'secondary'; edit.textContent = 'Edit';
    edit.addEventListener('click', () => editDream(dream.id));
    const remove = document.createElement('button'); remove.className = 'danger'; remove.textContent = 'Delete';
    remove.addEventListener('click', () => deleteDream(dream.id));
    actions.append(toggle, edit, remove);
    card.append(title, meta, description, status, actions);
    dreamList.append(card);
  });
}

statusFilter.addEventListener('change', renderDreams);
