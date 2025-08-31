// ====== STEP 0: App State ======
// We'll keep tasks in an array of objects { id, text, completed }
let tasks = [];

// Small helper to create unique-ish IDs.
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

// ====== STEP 1: Grab DOM elements (querySelector) ======
const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');
const countEl = document.querySelector('#count');
const statusEl = document.querySelector('#status');
const emptyEl = document.querySelector('#empty-state');

// ====== STEP 2: Render function ======
function render() {
    // If no tasks, show empty state and clear list
    if (tasks.length === 0) {
        list.innerHTML = '';
        emptyEl.style.display = 'block';
        updateCount();
        return;
    }
    emptyEl.style.display = 'none';

    // Build list items with innerHTML for structure, then set textContent for safety
    list.innerHTML = tasks.map(t => `
        <li class="todo ${t.completed ? 'completed' : ''}" data-id="${t.id}">
          <label>
            <input type="checkbox" class="toggle" ${t.completed ? 'checked' : ''} />
            <span class="text"></span>
          </label>
          <div class="actions">
            <button class="btn btn-danger delete" aria-label="Delete task">Delete</button>
          </div>
        </li>
      `).join('');

    // Now set actual text with textContent to avoid injecting HTML
    list.querySelectorAll('li.todo').forEach((li, idx) => {
        li.querySelector('.text').textContent = tasks[idx].text; // <- textContent
    });

    updateCount();
}

function updateCount() {
    const remaining = tasks.filter(t => !t.completed).length; // <- filter
    countEl.textContent = String(remaining);                  // <- textContent
}

function setStatus(msg, ok = true) {
    statusEl.textContent = msg; // <- textContent
    statusEl.style.color = ok ? 'var(--accent-2)' : 'var(--danger)';
    // Clear after a moment
    clearTimeout(setStatus._t);
    setStatus._t = setTimeout(() => (statusEl.textContent = ''), 1500);
}

// ====== STEP 3: Create (handle form submit + preventDefault) ======
form.addEventListener('submit', (event) => {
    event.preventDefault(); // <- preventDefault() stops page reload

    const text = input.value.trim();
    if (!text) {
        setStatus('Please type something first', false);
        return;
    }

    tasks.push({ id: uid(), text, completed: false }); // <- arrays + push
    input.value = '';
    render();
    setStatus('Task added');
});

// ====== STEP 4: Read/Update/Delete via Event Delegation ======
// We attach ONE listener to the <ul> and inspect event.target to know what was clicked.
list.addEventListener('click', (event) => {
    const li = event.target.closest('li.todo'); // <- event object + closest
    if (!li) return;
    const id = li.dataset.id;                   // <- dataset to retrieve the id

    // DELETE
    if (event.target.matches('button.delete')) {
        tasks = tasks.filter(t => t.id !== id);   // <- filter to remove
        render();
        setStatus('Task deleted');
        return;
    }

    // TOGGLE COMPLETE (Update)
    if (event.target.matches('input.toggle')) {
        const t = tasks.find(t => t.id === id);   // <- find
        if (!t) return;
        t.completed = event.target.checked;
        // Reflect in DOM immediately with classList
        li.classList.toggle('completed', t.completed); // <- classList.toggle
        updateCount();
        setStatus(t.completed ? 'Marked complete' : 'Marked active');
        return;
    }
});

// ====== STEP 5: Initial render ======
render();

// ====== BONUS: Persistence (uncomment to enable localStorage) ======
// function save() { localStorage.setItem('tasks', JSON.stringify(tasks)); }
// function load() { try { tasks = JSON.parse(localStorage.getItem('tasks')||'[]') } catch { tasks = [] } }
// window.addEventListener('beforeunload', save);
// load(); render();