'use strict'


let todos = getSavedNotes();

// ------------------- FILTRER dans un search input

// On crée l objet qui va recevoir le texte à chercher
const filters = {
  searchText: "",
  hideCompleted: false
};

// On appelle la fonction si on veut voir quelque chose..
renderTodos(todos, filters);

// On remplit l'objet search avec la valeur recherchée
document.querySelector("#search-text").addEventListener("input", e => {
  filters.searchText = e.target.value;
  renderTodos(todos, filters); // On rappelle la fonction dans le search pour le mettre à jour avec les données entrées dans le search car l'appel initial de la fonction renderNotes n'affiche que les données initiales
});

// ------------------- FILTRER dans un search input

document.querySelector("#todo-form").addEventListener("submit", (e) => {
  const text = e.target.elements[0].value.trim()
  e.preventDefault();

  if (text.length > 0) {
    todos.push({
      id: uuidv4(),
      text,
      completed: false
    });
    saveTodos(todos);
    renderTodos(todos, filters);
    e.target.elements[0].value = "";
  }
});

document.querySelector("#check").addEventListener("change", e => {
  filters.hideCompleted = e.target.checked;
  renderTodos(todos, filters);
});
