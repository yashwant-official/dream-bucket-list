const form = document.getElementById('dream-form');
const nameInput = document.getElementById('dream-name');
const categoryInput = document.getElementById('dream-category');
const descriptionInput = document.getElementById('dream-description');
const dateInput = document.getElementById('dream-date');
const priorityInput = document.getElementById('dream-priority');
const saveButton = document.getElementById('save-button');
const cancelButton = document.getElementById('cancel-edit');
const formMessage = document.getElementById('form-message');

function resetForm() {
  form.reset();
  editingId = null;
  saveButton.textContent = 'Add Dream';
  cancelButton.hidden = true;
  formMessage.textContent = '';
}

function handleDreamSubmit(event) {
  event.preventDefault();
  const name = nameInput.value.trim();
  const description = descriptionInput.value.trim();
  const category = categoryInput.value;
  if (!name || !description || !category) {
    formMessage.textContent = 'Please fill in the name, category and description.';
    return;
  }
  const fields = { name, category, description, targetDate: dateInput.value, priority: priorityInput.value };
  if (editingId !== null) {
    const dream = dreams.find(item => item.id === editingId);
    if (dream) Object.assign(dream, fields);
  } else {
    dreams.unshift({ id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, ...fields, completed: false });
  }
  saveDreams();
  resetForm();
  refreshUI();
}

function editDream(id) {
  const dream = dreams.find(item => item.id === id);
  if (!dream) return;
  editingId = id;
  nameInput.value = dream.name;
  categoryInput.value = dream.category;
  descriptionInput.value = dream.description;
  dateInput.value = dream.targetDate || '';
  priorityInput.value = dream.priority || 'Medium';
  saveButton.textContent = 'Save Changes';
  cancelButton.hidden = false;
  form.scrollIntoView({ behavior: 'smooth', block: 'center' });
  nameInput.focus();
}

function deleteDream(id) {
  if (!confirm('Delete this dream?')) return;
  dreams = dreams.filter(item => item.id !== id);
  if (editingId === id) resetForm();
  saveDreams();
  refreshUI();
}

form.addEventListener('submit', handleDreamSubmit);
cancelButton.addEventListener('click', resetForm);
