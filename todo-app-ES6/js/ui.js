// ui.js
import { tasks } from "./state.js";

// Grab DOM once
const list = document.querySelector('#todo-list');
const countEl = document.querySelector('#count');
const statusEl = document.querySelector('#status');
const emptyEl = document.querySelector('#empty-state');

export function render() {
    if (tasks.length === 0) {
        list.innerHTML = '';
        emptyEl.style.display = 'block';
        updateCount();
        return;
    }
    emptyEl.style.display = 'none';

    list.innerHTML = tasks.map(({ id, text, completed }) => `
    <li class="todo ${completed ? 'completed' : ''}" data-id="${id}">
      <label>
        <input type="checkbox" class="toggle" ${completed ? 'checked' : ''} />
        <span class="text">${text}</span>
      </label>
      <div class="actions">
        <button class="btn btn-danger delete" aria-label="Delete task">Delete</button>
      </div>
    </li>
  `).join('');

    updateCount();
}

export function updateCount() {
    const remaining = tasks.filter(t => !t.completed).length;
    countEl.textContent = `${remaining}`;
}

export function setStatus(msg, ok = true) {
    statusEl.textContent = msg;
    statusEl.style.color = ok ? 'var(--accent-2)' : 'var(--danger)';
    clearTimeout(setStatus._t);
    setStatus._t = setTimeout(() => (statusEl.textContent = ''), 1500);
}
