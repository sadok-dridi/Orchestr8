
// task array of abject { id, text, completed }
let tasks = [];

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');
const emptyLi = document.querySelector('#empty-state');
const countLi = document.querySelector('#count');
const status = document.querySelector('#status');



function render() {
    if (tasks.length === 0) {
        list.innerHTML = '';
        emptyLi.style.display = 'block';
        updateCount()
        return;
    }
    emptyLi.style.display = 'none';

    list.innerHTML = tasks.map(t => `
    <li class="todo ${t.completed ? 'completed' : ''}" data-id="${t.id}">
        <label>
        <input type="checkbox" class="toggle" ${t.completed ? 'checked' : ''}/>
        <span class="text"></span>
        </label>
    <div class="actions">
            <button class="btn btn-danger delete">Delete</button>
    </div>
    </li>


    `).join('');
    list.querySelectorAll('li.todo').forEach((li, idx) =>{
       li.querySelector('.text').textContent = tasks[idx].text;
    });

    updateCount();
}

function updateCount(){
    const remaining = tasks.filter(t => !t.completed).length;
    countLi.textContent = String(remaining);
}

function setStatus(msg , ok = true){
    status.textContent = msg;
    status.style.color = ok ? 'var(--accent-2)' : 'var(--danger)';
    clearTimeout(setStatus._t);
    setStatus._t = setTimeout(()=>(status.textContent = ''),1500);
}





form.addEventListener('submit',(event)=>{
    event.preventDefault();
    const text = input.value.trim();
    if(!text){
        setStatus("type something first",false);
        return;
    }
    tasks.push({id: uid(), text, completed: false});
    input.value='';

    render();
    setStatus("task added");
});

list.addEventListener('click',(event)=>{
    const li = event.target.closest('li.todo');
    if(!li) return;
    const id = li.dataset.id;
    //DELETE
    if(event.target.matches("button.delete")){
        tasks = tasks.filter(t => t.id !== id);
        render();
        setStatus("Task removed");
        return;
    }
    // update
    if(event.target.matches('input.toggle')) {
        const t = tasks.find(t => t.id === id);
        if (!t) return;
        t.completed = event.target.checked;
        li.classList.toggle('completed', t.completed); // <- classList.toggle

        updateCount();
        setStatus(t.completed ? 'Marked complete' : 'Marked active');
        return;
    }
});
render();
