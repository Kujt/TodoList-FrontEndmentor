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
  <li class="list-item" draggable="true">
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
    draggableElement();
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

// Draggable Function
function draggableElement() {
  const draggables = todoUI.querySelectorAll(".list-item");

  // Drag start and drag end event
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
    });

    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
    });
  });
  // this function helps to keep element draggable only in container div
  todoUI.addEventListener("dragover", (e) => {
    // By defaulet dragg in inside ne element is disabled, this enables it
    e.preventDefault();
    const afterEl = dragElement(todoUI, e.clientY);
    // Only one element has a class dragging in ul list
    const drag = document.querySelector(".dragging");
    // if we are not above anything
    if (afterEl == null) {
      todoUI.appendChild(drag);
    } else {
      todoUI.insertBefore(drag, afterEl);
    }
  });
}

// This function determine in which position your drag element is after we start to drag
// y it determines our mouse position
function dragElement(container, y) {
  const draggableEl = [...container.querySelectorAll("li:not(.dragging)")];
  // this determines our mouse position after en element
  return draggableEl.reduce(
    // first element is value of closest element after mouse cursor
    // second element is these draggable elements
    (closest, child) => {
      // this function is going to give us a rectangel for our box
      const box = child.getBoundingClientRect();
      // distance between center of the box and ouu actual cursor
      const offset = y - box.top - box.height / 2;

      // we are interesting for offset under 0 essentiall we're above the element taht we're hoverin over
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    // initial value of our reduce
    // Negative infinity is that we need this offset value to be far away from our cursor
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
