const themeBtn = document.querySelector(".icons-theme");

const todoUI = document.querySelector("ul");
const form = document.querySelector(".form");
const input = document.getElementById("input");
const filterBtn = document.querySelectorAll(" .btn-radio");
const clear = document.getElementById("clear-completed");
const items = document.getElementById("items-left");

// ///////////////////////

// Button to change theme
themeBtn.addEventListener("click", () => {
  document.querySelector("body").classList.toggle("dark-theme");
});

const createElement = (text) => {
  html = `
  <li class="list-item">
              <button class="btn-check"></button>
              <span class="text">${text}</span>
              <button class="btn-delete">
                <img src="/images/icon-cross.svg" alt="delete" />
              </button>
            </li>
  `;

  todoUI.innerHTML += html;
};

// Adding todo list to UI
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const element = input.value;
  if (element.length) {
    createElement(element);
    input.value = "";

    checkComplete();
    deleteElement();
    counterUpdate(1);
  }
});

// Check mark button
function checkComplete() {
  const checkBtn = document.querySelectorAll(".btn-check");

  checkBtn.forEach((items) => {
    items.addEventListener("click", (item) => {
      item.target.classList.toggle("complete-btn");
      item.target.parentElement.classList.toggle("complete");

      // to count the item left
      if (item.target.parentElement.classList.contains("complete")) {
        counterUpdate(-1);
      } else {
        counterUpdate(1);
      }
    });
  });
}

// Delete one element
function deleteElement() {
  const deleteBtn = document.querySelectorAll(".btn-delete");

  deleteBtn.forEach((items) => {
    items.addEventListener("click", (item) => {
      item.target.parentElement.parentElement.remove();
      console.log();

      // Count item left
      counterUpdate(-1);
    });
  });
}
// Clear completed task
clear.addEventListener("click", () => {
  const todos = todoUI.querySelectorAll("li");
  todos.forEach((todo) => {
    if (todo.classList.contains("complete")) {
      todo.remove();
      counterUpdate(-1);
    }
  });
});

// Filtering the task list

filterBtn.forEach((items) => {
  items.addEventListener("change", (e) => {
    filterTodo(e);
  });
});

function filterTodo(button) {
  const todos = todoUI.querySelectorAll("li");
  const b = button.target;
  todos.forEach((todo) => {
    switch (b.value) {
      case "all":
        todo.style.display = "grid";

        break;
      case "active":
        if (!todo.classList.contains("complete")) {
          todo.style.display = "grid";
        } else {
          todo.style.display = "none";
        }
        break;
      case "completed":
        if (todo.classList.contains("complete")) {
          todo.style.display = "grid";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

// Count the active to do List

function counterUpdate(num) {
  items.innerText = Number(items.innerText) + num;
}
