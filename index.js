const $ = (id) => document.getElementById(id);

function getCurrentTasks() {
  const tasks = JSON.parse(window.localStorage.getItem("tasks") ?? "[]");

  return tasks;
}

function showCurrentTasks() {
  const container = $("currentTasksList");

  const currentTasks = getCurrentTasks();

  if (container) {
    currentTasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.setAttribute("id", index);
      li.innerText = task.title;
      container.appendChild(li);
    });
  }
}

function main() {
  const form = $("taskForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const values = Object.fromEntries(formData);

    const { title, start, end } = values;

    if (!title || !start || !end) {
      return;
    }

    const currentTasks = JSON.parse(
      window.localStorage.getItem("tasks") ?? "[]",
    );

    const newTasks = [...currentTasks, { ...values }];

    window.localStorage.setItem("tasks", JSON.stringify(newTasks));

    event.target.reset();

    showCurrentTasks();
  });

  showCurrentTasks();
}

main();
