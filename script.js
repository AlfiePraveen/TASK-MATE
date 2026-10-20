// ========================================
// TASK MATER - DAILY TASK SCHEDULER
// ========================================

const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const taskDate = document.getElementById("taskDate");
const taskTime = document.getElementById("taskTime");

const taskList = document.getElementById("taskList");
const taskFilter = document.getElementById("taskFilter");
const emptyMessage = document.getElementById("emptyMessage");

const totalTasks = document.getElementById("totalTasks");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

const currentDate = document.getElementById("currentDate");

let tasks = loadTasks();
let editingTaskId = null;


// ========================================
// DISPLAY CURRENT DATE
// ========================================

function displayCurrentDate() {
    const today = new Date();

    currentDate.textContent = today.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    // Use local date components rather than UTC.
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    taskDate.min = `${year}-${month}-${day}`;
}

displayCurrentDate();


// ========================================
// LOAD TASKS FROM LOCAL STORAGE
// ========================================

function loadTasks() {
    const storageKeys = [
        "taskMaterTasks",
        "taskMater.tasks",
        "tasks"
    ];

    try {
        for (const key of storageKeys) {
            const savedTasks = localStorage.getItem(key);

            if (!savedTasks) {
                continue;
            }

            const parsedTasks = JSON.parse(savedTasks);

            if (!Array.isArray(parsedTasks)) {
                continue;
            }

            const validTasks = parsedTasks.filter(task =>
                task &&
                task.id !== undefined &&
                typeof task.title === "string" &&
                typeof task.date === "string" &&
                typeof task.time === "string"
            ).map(task => ({
                ...task,
                id: String(task.id),
                description: task.description || "",
                completed: Boolean(task.completed),
                createdAt: task.createdAt || new Date().toISOString()
            }));

            // Migrate recovered tasks to the current storage key.
            if (key !== "taskMaterTasks" && validTasks.length > 0) {
                localStorage.setItem(
                    "taskMaterTasks",
                    JSON.stringify(validTasks)
                );
            }

            return validTasks;
        }

        return [];
    } catch (error) {
        console.error("Unable to load saved tasks:", error);

        alert(
            "Task Mater could not read saved tasks. " +
            "Please check your browser storage settings."
        );

        return [];
    }
}



// ========================================
// SAVE TASKS TO LOCAL STORAGE
// ========================================


function saveTasks() {
    try {
        const storageKey = "taskMaterTasks";
        const taskData = JSON.stringify(tasks);

        localStorage.setItem(storageKey, taskData);

        // Verify that the stored data matches the current tasks.
        const savedData = localStorage.getItem(storageKey);

        if (savedData !== taskData) {
            throw new Error("Saved task data could not be verified.");
        }

        return true;

    } catch (error) {
        console.error("Unable to save tasks:", error);

        alert(
            "Your tasks could not be saved. Please ensure browser " +
            "storage is enabled and try again."
        );

        return false;
    }
}



// ========================================
// CREATE A NEW TASK
// ========================================

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    console.log("Add Task button clicked!");

    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();
    const date = taskDate.value;
    const time = taskTime.value;

    if (!title || !date || !time) {
        alert("Please enter the task title, date, and time.");
        return;
    }

    // Update an existing task if editing.
    if (editingTaskId !== null) {
        const task = tasks.find(item => item.id === editingTaskId);

        if (!task) {
            alert("Task not found. Please try again.");
            cancelEditing();
            return;
        }

        const previousTask = { ...task };

        task.title = title;
        task.description = description;
        task.date = date;
        task.time = time;

        if (!saveTasks()) {
            Object.assign(task, previousTask);
            return;
        }

        editingTaskId = null;
        document.querySelector(".add-button").textContent = "+ Add Task";

    } else {
        // Create a new task.
        const newTask = {
            id: createTaskId(),
            title,
            description,
            date,
            time,
            completed: false,
            createdAt: new Date().toISOString()
        };

        tasks.push(newTask);

        if (!saveTasks()) {
            tasks = tasks.filter(item => item.id !== newTask.id);
            return;
        }
    }

    // Reset the form and update the task list.
    taskForm.reset();

    renderTasks();

    alert("Task saved successfully!");
});



// ========================================
// GENERATE A UNIQUE TASK ID
// ========================================

function createTaskId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
        return window.crypto.randomUUID();
    }

    return Date.now().toString(36) +
        Math.random().toString(36).slice(2);
}


// ========================================
// DISPLAY TASKS
// ========================================

function renderTasks() {

    taskList.replaceChildren();

    const filterValue = taskFilter.value;

    let filteredTasks = tasks.filter(task => {

        if (filterValue === "pending") {
            return !task.completed;
        }

        if (filterValue === "completed") {
            return task.completed;
        }

        return true;
    });

    // Sort by date and time.
    filteredTasks.sort((a, b) => {
        const first = `${a.date}T${a.time}`;
        const second = `${b.date}T${b.time}`;

        return first.localeCompare(second);
    });

    filteredTasks.forEach(task => {

        const card = document.createElement("article");
        card.className = "task-card";

        if (task.completed) {
            card.classList.add("completed");
        }

        const content = document.createElement("div");
        content.className = "task-content";

        const title = document.createElement("h3");
        title.textContent = task.title;

        const description = document.createElement("p");
        description.textContent = task.description || "No description added.";

        const taskSchedule = document.createElement("p");
        taskSchedule.className = "task-time";
        taskSchedule.textContent = formatTaskDate(task.date, task.time);

        const status = document.createElement("p");
        status.textContent = task.completed ? "Completed" : "Pending";

        content.append(title, description, taskSchedule, status);

        const actions = document.createElement("div");
        actions.className = "task-actions";

        // Complete / Undo button.
        const completeButton = document.createElement("button");

        completeButton.type = "button";
        completeButton.className = "action-button complete-button";
        completeButton.textContent = task.completed ? "Undo" : "Complete";
        completeButton.setAttribute(
            "aria-label",
            `${task.completed ? "Mark pending" : "Complete"}: ${task.title}`
        );

        completeButton.addEventListener("click", () => {
            toggleTask(task.id);
        });

        // Edit button.
        const editButton = document.createElement("button");

        editButton.type = "button";
        editButton.className = "action-button edit-button";
        editButton.textContent = "Edit";
        editButton.setAttribute("aria-label", `Edit: ${task.title}`);

        editButton.addEventListener("click", () => {
            editTask(task.id);
        });

        // Delete button.
        const deleteButton = document.createElement("button");

        deleteButton.type = "button";
        deleteButton.className = "action-button delete-button";
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("aria-label", `Delete: ${task.title}`);

        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
        });

        actions.append(completeButton, editButton, deleteButton);

        card.append(content, actions);

        taskList.appendChild(card);
    });

    // Display a message when the filtered list is empty.
    emptyMessage.hidden = filteredTasks.length > 0;

    if (filteredTasks.length === 0) {
        emptyMessage.textContent = tasks.length === 0
            ? "No tasks yet. Add your first task above!"
            : "No tasks found in this category.";
    }

    updateStatistics();
}


// ========================================
// FORMAT TASK DATE AND TIME
// ========================================

function formatTaskDate(date, time) {

    const dateObject = new Date(`${date}T00:00:00`);

    const formattedDate = dateObject.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });

    const [hours, minutes] = time.split(":").map(Number);

    const formattedTime = new Date(
        2000, 0, 1, hours, minutes
    ).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit"
    });

    return `${formattedDate} at ${formattedTime}`;
}


// ========================================
// UPDATE DASHBOARD STATISTICS
// ========================================

function updateStatistics() {

    const total = tasks.length;

    const completed = tasks.filter(task => task.completed).length;

    const pending = total - completed;

    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;
}


// ========================================
// MARK TASK COMPLETE OR PENDING
// ========================================

function toggleTask(id) {

    const task = tasks.find(item => item.id === id);

    if (!task) {
        return;
    }

    task.completed = !task.completed;

    if (!saveTasks()) {
        task.completed = !task.completed;
        return;
    }

    renderTasks();
}


// ========================================
// EDIT TASK
// ========================================

function editTask(id) {

    const task = tasks.find(item => item.id === id);

    if (!task) {
        return;
    }

    editingTaskId = id;

    taskTitle.value = task.title;
    taskDescription.value = task.description || "";
    taskDate.value = task.date;
    taskTime.value = task.time;

    document.querySelector(".add-button").textContent = "Save Changes";

    document.querySelector(".task-form-section").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    taskTitle.focus();
}


// ========================================
// DELETE TASK
// ========================================

function deleteTask(id) {

    const task = tasks.find(item => item.id === id);

    if (!task) {
        return;
    }

    const confirmed = confirm(
        `Are you sure you want to delete "${task.title}"?`
    );

    if (!confirmed) {
        return;
    }

    const previousTasks = tasks;

    tasks = tasks.filter(item => item.id !== id);

    if (!saveTasks()) {
        tasks = previousTasks;
        return;
    }

    if (editingTaskId === id) {
        cancelEditing();
    }

    renderTasks();
}


// ========================================
// CANCEL EDITING IF NEEDED
// ========================================

function cancelEditing() {
    editingTaskId = null;
    taskForm.reset();

    document.querySelector(".add-button").textContent = "+ Add Task";
}


// ========================================
// FILTER TASKS
// ========================================

taskFilter.addEventListener("change", renderTasks);


// ========================================
// INITIALIZE APPLICATION
// ========================================

renderTasks();
// ========================================
// TASK MATER - BACKUP AND RESTORE
// ========================================

const exportBackupButton = document.getElementById("exportBackup");
const importBackupButton = document.getElementById("importBackup");
const backupFileInput = document.getElementById("backupFile");
const backupStatus = document.getElementById("backupStatus");


// ========================================
// DISPLAY BACKUP STATUS
// ========================================

function showBackupStatus(message, type = "") {
    backupStatus.textContent = message;
    backupStatus.className = "backup-status";

    if (type) {
        backupStatus.classList.add(type);
    }
}


// ========================================
// EXPORT TASKS TO A JSON FILE
// ========================================

exportBackupButton.addEventListener("click", function () {
    try {
        const backupData = {
            application: "Task Mater",
            version: 1,
            exportedAt: new Date().toISOString(),
            tasks: tasks
        };

        const jsonData = JSON.stringify(backupData, null, 2);

        const blob = new Blob(
            [jsonData],
            { type: "application/json" }
        );

        const downloadURL = URL.createObjectURL(blob);

        const downloadLink = document.createElement("a");

        const today = new Date().toISOString().slice(0, 10);

        downloadLink.href = downloadURL;
        downloadLink.download = `task-mater-backup-${today}.json`;

        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();

        URL.revokeObjectURL(downloadURL);

        showBackupStatus(
            `Backup created successfully with ${tasks.length} task(s).`,
            "success"
        );

    } catch (error) {
        console.error("Backup export failed:", error);

        showBackupStatus(
            "Unable to create the backup file.",
            "error"
        );
    }
});


// ========================================
// OPEN THE BACKUP FILE SELECTOR
// ========================================

importBackupButton.addEventListener("click", function () {
    backupFileInput.click();
});


// ========================================
// VALIDATE A RESTORED TASK
// ========================================

function isValidBackupTask(task) {
    if (!task || typeof task !== "object" || Array.isArray(task)) {
        return false;
    }

    if (typeof task.title !== "string" || !task.title.trim()) {
        return false;
    }

    if (
        typeof task.date !== "string" ||
        !/^\d{4}-\d{2}-\d{2}$/.test(task.date)
    ) {
        return false;
    }

    if (
        typeof task.time !== "string" ||
        !/^([01]\d|2[0-3]):[0-5]\d$/.test(task.time)
    ) {
        return false;
    }

    const date = new Date(`${task.date}T00:00:00`);

    if (
        Number.isNaN(date.getTime()) ||
        date.getFullYear() !== Number(task.date.slice(0, 4)) ||
        date.getMonth() + 1 !== Number(task.date.slice(5, 7)) ||
        date.getDate() !== Number(task.date.slice(8, 10))
    ) {
        return false;
    }

    return true;
}


// ========================================
// READ AND RESTORE A BACKUP FILE
// ========================================

backupFileInput.addEventListener("change", async function () {
    const file = backupFileInput.files[0];

    if (!file) {
        return;
    }

    try {
        if (file.size > 10 * 1024 * 1024) {
            throw new Error("The backup file is too large (maximum 10 MB).");
        }

        const fileText = await file.text();
        const backupData = JSON.parse(fileText);

        // Support both the new backup format and a plain task array.
        let importedTasks;

        if (Array.isArray(backupData)) {
            importedTasks = backupData;
        } else if (
            backupData &&
            backupData.application === "Task Mater" &&
            Array.isArray(backupData.tasks)
        ) {
            importedTasks = backupData.tasks;
        } else {
            throw new Error("This is not a valid Task Mater backup.");
        }

        if (!importedTasks.every(isValidBackupTask)) {
            throw new Error(
                "The backup contains invalid task data. No tasks were restored."
            );
        }

        // Prepare safe task objects and preserve optional properties.
        const preparedTasks = importedTasks.map(task => ({
            ...task,
            id: String(task.id || createTaskId()),
            title: task.title.trim(),
            description:
                typeof task.description === "string"
                    ? task.description
                    : "",
            completed: task.completed === true,
            createdAt:
                typeof task.createdAt === "string"
                    ? task.createdAt
                    : new Date().toISOString()
        }));

        // Ask whether to replace or merge.
        const replaceTasks = confirm(
            "Choose how to restore your backup:\n\n" +
            "OK = Replace all current tasks\n" +
            "Cancel = Merge backup tasks with current tasks"
        );

        let restoredTasks;

        if (replaceTasks) {
            restoredTasks = preparedTasks;
        } else {
            // Avoid duplicate task IDs while merging.
            const existingIds = new Set(tasks.map(task => String(task.id)));

            const newTasks = preparedTasks.map(task => {
                if (existingIds.has(String(task.id))) {
                    return {
                        ...task,
                        id: createTaskId()
                    };
                }

                existingIds.add(String(task.id));
                return task;
            });

            restoredTasks = [...tasks, ...newTasks];
        }

        // Keep the current task list until storage succeeds.
        const previousTasks = tasks;

        tasks = restoredTasks;

        if (!saveTasks()) {
            tasks = previousTasks;
            throw new Error(
                "The tasks could not be saved in browser storage."
            );
        }

        // Exit edit mode if a task was being edited.
        if (typeof cancelEditing === "function") {
            cancelEditing();
        }

        renderTasks();

        showBackupStatus(
            `Successfully restored ${preparedTasks.length} task(s).`,
            "success"
        );

    } catch (error) {
        console.error("Backup restore failed:", error);

        showBackupStatus(
            error.message || "Unable to restore the backup.",
            "error"
        );

        alert(
            "Unable to restore tasks.\n\n" +
            (error.message || "Please select a valid backup file.")
        );

    } finally {
        // Allow the same file to be selected again later.
        backupFileInput.value = "";
    }
});