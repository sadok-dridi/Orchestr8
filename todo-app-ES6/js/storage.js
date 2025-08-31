// storage.js
import { tasks, setTasks } from "./state.js";

// Simulate async persistence
export async function save() {
    return new Promise((resolve) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        resolve(true);
    });
}

export async function load() {
    return new Promise((resolve) => {
        try {
            const raw = localStorage.getItem('tasks') || '[]';
            setTasks(JSON.parse(raw));
        } catch {
            setTasks([]);
        }
        resolve(tasks);

    });
}
