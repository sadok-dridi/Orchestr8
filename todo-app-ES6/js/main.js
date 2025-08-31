// main.js
import { tasks, setTasks, uid } from "./state.js";
import { render, setStatus, updateCount } from "./ui.js";
import { save, load } from "./storage.js";

const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');

// ====== INIT ======
await load();
render();

// ====== CREATE ======
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) {
        setStatus('Please type something first', false);
        return;
    }

    setTasks([...tasks, { id: uid(), text, completed: false }]); // destructuring
    input.value = '';
    render();
    await save();
    setStatus(`Task added: "${text}"`);
});

// ====== UPDATE + DELETE ======
list.addEventListener('click', async (event) => {
    const li = event.target.closest('li.todo');
    if (!li) return;
    const id = li.dataset.id;

    // DELETE
    if (event.target.matches('button.delete')) {
        setTasks(tasks.filter(t => t.id !== id));
        render();
        await save();
        setStatus('Task deleted');
        return;
    }

    // TOGGLE
    if (event.target.matches('input.toggle')) {
        const t = tasks.find(t => t.id === id);
        if (!t) return;
        t.completed = event.target.checked;
        li.classList.toggle('completed', t.completed);
        updateCount();
        await save();
        setStatus(t.completed ? 'Marked complete ✅' : 'Marked active ⏳');
    }
});
