const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(
    localStorage.getItem("tasks")
) || [];

let currentFilter = "all";


function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}


function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "active") {

        filteredTasks =
            tasks.filter(
                task => !task.completed
            );
    }

    if (currentFilter === "completed") {

        filteredTasks =
            tasks.filter(
                task => task.completed
            );
    }

    filteredTasks.forEach(task => {

        const li =
            document.createElement("li");

        li.dataset.id = task.id;

        if (task.completed) {

            li.classList.add(
                "completed"
            );
        }

        li.innerHTML = `
            <span>${task.text}</span>

            <div class="actions">

                <button class="complete-btn">
                    ✓
                </button>

                <button class="edit-btn">
                    Edit
                </button>

                <button class="delete-btn">
                    Delete
                </button>

            </div>
        `;

        taskList.appendChild(li);
    });
}



addBtn.addEventListener("click", () => {

    const text =
        taskInput.value.trim();

    if (text === "") return;

    tasks.push({
        id: Date.now(),
        text,
        completed: false
    });

    saveTasks();

    renderTasks();

    taskInput.value = "";
});


taskList.addEventListener(
    "click",
    (e) => {

        const li =
            e.target.closest("li");

        if (!li) return;

        const id =
            Number(li.dataset.id);


        if (
            e.target.classList.contains(
                "delete-btn"
            )
        ) {

            tasks =
                tasks.filter(
                    task =>
                    task.id !== id
                );

            saveTasks();

            renderTasks();
        }



        if (
            e.target.classList.contains(
                "complete-btn"
            )
        ) {

            tasks =
                tasks.map(task => {

                    if (task.id === id) {

                        task.completed = !task.completed;
                    }

                    return task;
                });

            saveTasks();

            renderTasks();
        }

        if (
            e.target.classList.contains(
                "edit-btn"
            )
        ) {

            const task =
                tasks.find(
                    t => t.id === id
                );

            const updatedText =
                prompt(
                    "Edit Task",
                    task.text
                );

            if (
                updatedText &&
                updatedText.trim() !== ""
            ) {

                task.text =
                    updatedText.trim();

                saveTasks();

                renderTasks();
            }
        }
    }
);


document
    .querySelector(".filters")
    .addEventListener(
        "click",
        (e) => {

            if (
                e.target.tagName ===
                "BUTTON"
            ) {

                currentFilter =
                    e.target.dataset.filter;

                renderTasks();
            }
        }
    );


renderTasks();