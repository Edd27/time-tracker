const $ = (id) => document.getElementById(id);

function taskListItem(task) {
  return `<tr class="bg-white border-b border-gray-200 hover:bg-gray-50">
    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">${
      task.title
    }</th>
    <td class="px-6 py-4">${task.notes}</td>
    <td class="px-6 py-4">${new Date(task.start).toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })}</td>
    <td class="px-6 py-4">${new Date(task.end).toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })}</td>
  </tr>`;
}

function getCurrentTasks() {
  const tasks = JSON.parse(window.localStorage.getItem("tasks") ?? "[]");

  return tasks;
}

function getTotalHours() {
  const currentTasks = getCurrentTasks();

  const totalMinutes = currentTasks.reduce((sum, task) => {
    return sum + (task.end - task.start) / (1000 * 60);
  }, 0);

  const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
  const minutes = String(Math.round(totalMinutes % 60)).padStart(2, "0");

  return `${hours}:${minutes}`;
}

function showCurrentTasks() {
  const container = $("currentTaskTable");

  if (container) {
    const currentTasks = getCurrentTasks();
    container.innerHTML = "";
    currentTasks.forEach((task) => {
      container.innerHTML += taskListItem(task);
    });
  }
}

function showTotalHours() {
  const totalHoursContainer = $("totalHoursContainer");

  if (totalHoursContainer) {
    const totalHours = getTotalHours();
    totalHoursContainer.innerText = totalHours;
  }
}

function main() {
  const form = $("taskForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const values = Object.fromEntries(formData);

    const { title, start, end, notes } = values;

    if (!title || !start || !end) {
      return;
    }

    console.log({ start, end });

    const currentTasks = JSON.parse(
      window.localStorage.getItem("tasks") ?? "[]",
    );

    const newTask = {
      title,
      start: new Date().setHours(start.split(":")[0], start.split(":")[1]),
      end: new Date().setHours(end.split(":")[0], end.split(":")[1]),
      notes,
    };

    const newTasks = [...currentTasks, newTask];

    window.localStorage.setItem("tasks", JSON.stringify(newTasks));

    event.target.reset();

    showCurrentTasks();
    showTotalHours();
  });

  showCurrentTasks();
  showTotalHours();
}

main();
