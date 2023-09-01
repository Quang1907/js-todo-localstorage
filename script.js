const formElement = document.querySelector(".form");
const todoListElement = document.querySelector(".todo-list");
let todoList = [];

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputtedValue = e.target.elements["input-add-todo"].value;
  if (!inputtedValue) return;
  const todo = {
    id: new Date().getTime().toString(),
    todo: inputtedValue,
  };
  console.log(todo);
  createTodo(todo);
  formElement.reset();
});

todoListElement.addEventListener("click", (e) => {
  const deleteElement = e.target.closest(".todo-item-delete-btn");
  if (!deleteElement) return;

  const currentTodoItemElement = deleteElement.parentElement;
  deleteTodo(currentTodoItemElement.id);
  currentTodoItemElement.remove();
});

const createTodo = (todo) => {
  todoList.push(todo);
  localStorage.setItem("todo-list", JSON.stringify(todoList));
  createTodoItem(todo);
};

const createTodoItem = ({ todo, id }) => {
  const todoItem = `<li id=${id} class="todo-item">
  <p>${todo}</p>
  <button class="todo-item-delete-btn" type="button"><i class="ri-close-line"></i></button>
</li>`;
  todoListElement.insertAdjacentHTML("beforeend", todoItem);
};

const deleteTodo = (id) => {
  const updateTodo = todoList.filter((todo) => todo.id !== id);
  todoList = updateTodo;
  localStorage.setItem("todo-list", JSON.stringify(todoList));
};

const init = () => {
  const allTodo = JSON.parse(localStorage.getItem("todo-list"));
  todoList = allTodo;
  todoList.forEach((todo) => {
    createTodoItem(todo);
  });
};

window.addEventListener("DOMContentLoaded", init);
