document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');


    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Tää näyttää tehtävät listassa
    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.classList.toggle('completed', todo.completed);
            li.innerHTML = `
                <span>${todo.text}</span>
                <button class="delete-btn" data-index="${index}">Poista</button>
                <input type="checkbox" class="complete-btn" data-index="${index}" ${todo.completed ? 'checked' : ''}>
            `;
            todoList.appendChild(li);
        });
    }

    // Tällä lisätään tehtävä
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const todoText = input.value.trim();

        // Tarkistaa syötteen
        if (todoText === '') {
            input.classList.add('error');
            return;
        } else if (todoText.length < 3) {
            input.classList.add('error');
            input.setCustomValidity('Tehtävän tulee olla vähintään 3 merkkiä pitkä');
            return;
        }

        input.classList.remove('error');
        input.setCustomValidity('');
        
        const newTodo = {
            text: todoText,
            completed: false
        };
        todos.push(newTodo);
        input.value = '';
        renderTodos();
        saveTodos();
    });

    // Poistaa tehtävän
    todoList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const index = event.target.getAttribute('data-index');
            todos.splice(index, 1);
            renderTodos();
            saveTodos();
        }

        if (event.target.classList.contains('complete-btn')) {
            const index = event.target.getAttribute('data-index');
            todos[index].completed = event.target.checked;
            renderTodos();
            saveTodos();
        }
    });

    // Tallentaa tehtävät localiin
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Alustetaan lista
    renderTodos();
});
Vaih
