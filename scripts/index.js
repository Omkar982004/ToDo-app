document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));

  if (storedTasks) {
    storedTasks.forEach((task) => tasks.push(task));
    updateTaskList();
  }
});

let tasks = [];

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();

  if (text) {
    tasks.push({ text: text, completed: false });
    taskInput.value = "";
    updateTaskList();
  }
};

const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  console.log(tasks[index]);
  updateTaskList();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTaskList();
};

const editTask = (index) => {
  const taskInput = document.getElementById("taskInput");
  taskInput.value = tasks[index].text;
  deleteTask(index);
  updateTaskList();
};

const updateStats = () => {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const ratio = (completedTasks / totalTasks) * 100;
  if(completedTasks == totalTasks && totalTasks) blastConfetti();
  document.getElementById("progress").style.width = `${ratio}%`;
  document.getElementById("stats-numbers").innerHTML = `
      ${completedTasks}/${totalTasks}
  `;
};

const updateTaskList = () => {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? "completed" : ""}">
                <input type="checkbox" class="checkbox" ${
                  task.completed ? "checked" : ""
                }>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img  src="./img/edit.png" alt="" onClick = "editTask(${index})">
                <img  src="./img/bin.png" alt="" onClick = "deleteTask(${index})">
            </div>
        </div>
        `;
    listItem.addEventListener("change", () => toggleTaskComplete(index));
    taskList.append(listItem);
  });
  updateStats();
  saveTasks();
};

const newTask = document.getElementById("newTask");
newTask.addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
});

const blastConfetti = () => {
  const count = 200,
    defaults = {
      origin: { y: 0.7 },
    };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

const deleteAllBtn = document.getElementById("deleteAll");

deleteAllBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasks = [];               
    updateTaskList();          
  }
});
