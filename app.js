// DOM references
const formElement = document.getElementById("add-task-form");
const submitBtn = document.getElementById("add-btn-9212");
const errMsg = document.getElementById("err-msg");
const SID4 = "9212"

const store = createStore(`focustasks_${SID4}`)
renderTasks(store.list())


submitBtn.addEventListener("click", handleSubmit);

// Handle form submission
function handleSubmit(e) {
  e.preventDefault();
  const taskName = formElement.elements["task"].value;

  if (!taskName || taskName.trim() === "") {
    errMsg.innerText = "Taskfield is empty.Please Enter a task!";
    return;
  }

  errMsg.innerText = "";

  const task = {
    id: Date.now(),
    name: taskName,
    status: "active"
  };
  store.add(task)
  renderTasks(store.list());

  formElement.elements["task"].value = "";
  formElement.elements["task"].focus();
}

// Escape HTML to prevent XSS
function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function renderTasks(tasks) {
  const activeList = document.getElementById("active-list");
  const doneList = document.getElementById("done-list");
  activeList.textContent = "";
  doneList.textContent = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.className = "action-btn";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "Delete";


    const completeBtn = document.createElement("button");
    completeBtn.className = "complete";
    completeBtn.textContent = task.done ? "Undo" : "Complete";

    span.append(deleteBtn,completeBtn);

    const taskTitle = escapeHTML(task.name);
    li.innerHTML = `<span>${taskTitle}</span>`;
    li.appendChild(span);

    // To Delete events
    deleteBtn.addEventListener("click", () => {
      store.remove(task.id);
      renderTasks(store.list());
    });

    // To mark complete events
    completeBtn.addEventListener("click", () => {
      store.toggle(task.id);
      renderTasks(store.list());
    });

    // Append to correct list
    if (task.done) {
      doneList.appendChild(li);
    } else {
      activeList.appendChild(li);
    }
  });

  // To Update analytics
  const totalCount = tasks.length;
  const doneCount = tasks.filter(t => t.done).length;
  const activeCount = totalCount - doneCount;

  document.getElementById("total-count").textContent = totalCount;
  document.getElementById("active-count").textContent = activeCount;
  document.getElementById("done-count").textContent = doneCount;
}


// Closure-based store for localStorage
function createStore(key) {
  const storageKey = key;

  function getTasks() {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  }

  function saveTask(tasks) {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
    return [...tasks];
  }

  return {
    // Add new task
    add(task) {
      const tasks = getTasks();
      const newTasks = [...tasks, task];
      saveTask(newTasks);
    },

    // Toggle task completion
    toggle(id) {
      const tasks = getTasks().map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      );
      saveTask(tasks);
    },

    // Remove task
    remove(id) {
      const tasks = getTasks().filter(task => task.id !== id);
      return saveTask(tasks);
    },

    // List all tasks
    list() {
      return [...getTasks()];
    }
  };
}
