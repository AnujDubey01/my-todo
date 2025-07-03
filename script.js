const itemNameInput = document.getElementById("itemName");
const deadlineInput = document.getElementById("deadline");
const prioritySelect = document.getElementById("priority");
const addItemButton = document.getElementById("addItem");
const todayList = document.getElementById("todayList");
const futureList = document.getElementById("futureList");
const completedList = document.getElementById("completedList");

const todayTasks = [];
const futureTasks = [];

addItemButton.addEventListener("click", function() {
  const name = itemNameInput.value.trim();
  const deadline = deadlineInput.value;
  const priority = prioritySelect.value;



  if (!name || !deadline || !priority) {
    alert("Please fill all fields.");
    return;
  }

  const itemDate = new Date(deadline);

  const task = {
    name,
    deadline: itemDate,
    priority
  };

  if (isToday(itemDate)) {
    todayTasks.push(task);
    todayTasks.sort((a, b) => getPriorityValue(a.priority) - getPriorityValue(b.priority));
    renderList(todayList, todayTasks);
  } else {
    futureTasks.push(task);
    futureTasks.sort((a, b) => getPriorityValue(a.priority) - getPriorityValue(b.priority));
    renderList(futureList, futureTasks);
  }

  // Clear form
  itemNameInput.value = "";
  deadlineInput.value = "";
  prioritySelect.value = "";
});

function getPriorityValue(priority) {
  switch (priority) {
    case "High": return 1;
    case "Medium": return 2;
    case "Low": return 3;
    default: return 4;
  }
}

function isToday(date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}


function renderList(listElement, tasks) {
  listElement.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const textSpan = document.createElement("span");
    textSpan.textContent = `${index + 1}. ${task.name}`;

    const dateSpan = document.createElement("span");
    dateSpan.className = "date";
    dateSpan.textContent = formatDate(task.deadline);

    const prioritySpan = document.createElement("span");
    prioritySpan.className = "priority";
    prioritySpan.textContent = "Priority: " + task.priority;

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "actions";

    const completeButton = document.createElement("button");
    completeButton.innerHTML = "✔️";
    completeButton.addEventListener("click", function() {
      completedList.appendChild(li);
    });

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "🗑️";
    deleteButton.addEventListener("click", function() {
      li.remove();
      const idx = tasks.indexOf(task);
      if (idx !== -1) tasks.splice(idx, 1);
      renderList(listElement, tasks);
    });

    actionsDiv.appendChild(completeButton);
    actionsDiv.appendChild(deleteButton);

    li.appendChild(textSpan);
    li.appendChild(dateSpan);
    li.appendChild(prioritySpan);
    li.appendChild(actionsDiv);

    listElement.appendChild(li);
  });
}


function formatDate(date) {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

deadlineInput.addEventListener("focus", function() {
  this.type = "date";
  this.placeholder = "dd-mm-yyyy";
});

deadlineInput.addEventListener("blur", function() {
  this.type = "text";
  this.placeholder = "deadline";
});
