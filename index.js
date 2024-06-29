document.addEventListener("DOMContentLoaded", () => {
    const TODOS_PER_PAGE = 10;
    const API_URL = 'https://jsonplaceholder.typicode.com/todos';
    let currentPage = 1;
    let totalPages;

    const fetchTodos = async (page) => {
        const response = await fetch(`${API_URL}?_page=${page}&_limit=${TODOS_PER_PAGE}`);
        const todos = await response.json();
        totalPages = Math.ceil(response.headers.get('x-total-count') / TODOS_PER_PAGE);
        return todos;
    };

    const renderTodos = (todos) => {
        const todoList = document.getElementById('todo-list');
        todoList.innerHTML = '';

        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = 'todo-item';
            li.textContent = todo.title;
            todoList.appendChild(li);
        });
    };

    const renderPagination = () => {
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.addEventListener('click', () => {
                currentPage = i;
                updateTodos();
            });
            pagination.appendChild(button);
        }
    };

    const updateTodos = async () => {
        const todos = await fetchTodos(currentPage);
        renderTodos(todos);
        renderPagination();
    };

    updateTodos();
});
