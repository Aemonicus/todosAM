'use strict'



// Check for existing saved data from Local Storage
const getSavedNotes = () => {
  const todosJSON = localStorage.getItem("todos");
  try {
    return todosJSON ? JSON.parse(todosJSON) : []
  } catch (e) {
    return []
  }

};

// Save todos to LocalStorage
const saveTodos = todos => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Remove todo from the list
const removeTodo = id => {
  const todoIndex = todos.findIndex(todo => todo.id === id);
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

// Change checkbox values
const toggleTodo = id => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
};

// Fonction principale pour filtrer
const renderTodos = (todos, filters) => {
  let filteredTodos = todos.filter(todo => todo.text.toLowerCase().includes(filters.searchText.toLowerCase()));

  filteredTodos = filteredTodos.filter(todo => {
    if (filters.hideCompleted) {
      return !todo.completed;
    } else {
      return true;
    }
  });

  const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);

  // On vide le html pour éviter une liste interminable
  document.querySelector("#todos-list").innerHTML = "";

  document
    .querySelector("#todos-list")
    .appendChild(generateSummaryDOM(incompleteTodos));


  filteredTodos.forEach((todo) => {
    document.querySelector("#todos-list").appendChild(generateTodoDOM(todo));
  });

};

// Get the DOM elements for an individual note
const generateTodoDOM = todo => {
  const todoEl = document.createElement("label");
  const containerEl = document.createElement('div')
  const checkbox = document.createElement("input");
  const todoText = document.createElement("span");
  const removeButton = document.createElement("button");

  // Set up todo checkbox
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  containerEl.appendChild(checkbox);
  checkbox.addEventListener("change", () => {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  // Set up the todo text
  todoText.textContent = todo.text;
  containerEl.appendChild(todoText);

  // Setup container
  todoEl.classList.add('list-item')
  containerEl.classList.add('list-item__container')
  todoEl.appendChild(containerEl)

  // Set up the remove button
  removeButton.textContent = "remove";
  removeButton.classList.add('button', 'button--text')
  todoEl.appendChild(removeButton);
  removeButton.addEventListener("click", () => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });


  return todoEl;
};

// Get the DOM elements for list summary
const generateSummaryDOM = incompleteTodos => {
  const summary = document.createElement("h2");
  summary.classList.add('list-title')
  if (incompleteTodos.length > 1) {
    summary.textContent = `You have ${incompleteTodos.length} todos left`;
  } else {
    summary.textContent = `You have ${incompleteTodos.length} todo left`;
  }
  return summary;
};
