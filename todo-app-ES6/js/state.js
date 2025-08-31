// state.js
export let tasks = [];

export const uid = () =>
    Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

export function setTasks(newTasks) {
    tasks = newTasks;
}
