
const input = document.querySelector(".input");
const list = document.querySelector(".list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function updateLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderList() {
  list.innerHTML = "";
  todos.forEach((item, index) => addItem(item.text, item.done, index));
}

function addItem(text, done = false, index = todos.length - 1) {
  const li = document.createElement("li");
  li.className = "li";
  if (done) li.classList.add("done");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  checkbox.checked = done;

  const textSpan = document.createElement("span");
  textSpan.textContent = text;
  textSpan.classList.add("task-text");

  const deleteItem = document.createElement("span");
  deleteItem.textContent = "Delete";
  deleteItem.classList.add("delete");

  checkbox.addEventListener("click", () => {
    todos[index].done = checkbox.checked;
    updateLocalStorage();
    renderList();
  });

  deleteItem.addEventListener("click", () => {
    todos.splice(index, 1);
    updateLocalStorage();
    renderList();
  });

  li.appendChild(checkbox);
  li.appendChild(textSpan);
  li.appendChild(deleteItem);
  list.appendChild(li);
}

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const value = input.value.trim();
    if (value !== "") {
      todos.push({ text: value, done: false });
      updateLocalStorage();
      renderList();
      input.value = "";
    }
  }
});

renderList();
