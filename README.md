# 📅 Task Mater – Daily Task Scheduler

**Organize your day. Manage your tasks. Achieve your goals.**

Task Mater is a simple, responsive, and user-friendly daily task scheduler built using **HTML, CSS, and JavaScript**. It helps users organize daily activities, schedule tasks, monitor progress, and maintain backups of their tasks for future reference.

The application provides an intuitive interface for managing tasks and includes JSON-based backup and restore functionality to help users recover their saved task data.

---

## ✨ Features

### 📝 Task Management
- **Add Tasks:** Create tasks with a title, description, date, and time.
- **Edit Tasks:** Update existing task details whenever needed.
- **Delete Tasks:** Remove tasks that are no longer required.
- **Completion Tracking:** Mark tasks as completed or pending.
- **Task Scheduling:** Organize tasks according to their scheduled date and time.

### 📊 Dashboard
- **Total Tasks:** View the total number of tasks.
- **Pending Tasks:** Track tasks that still need to be completed.
- **Completed Tasks:** Monitor your completed activities.
- **Task Filtering:** Display all tasks, pending tasks, or completed tasks.
- **Automatic Sorting:** Arrange tasks chronologically by date and time.

### 💾 Backup and Restore
- **Export Backup:** Download your tasks as a JSON file.
- **Restore Backup:** Recover tasks from a previously saved backup.
- **Merge Tasks:** Combine backup tasks with existing tasks.
- **Replace Tasks:** Restore a backup by replacing the current task list.
- **Backup Validation:** Validate imported task data before restoring it.

### 🎨 User Interface
- Clean and modern design.
- Responsive layout for desktop and mobile devices.
- Simple navigation and intuitive controls.
- Clear visual indicators for completed tasks.
- User-friendly task management interface.

### 💻 Data Persistence
- Uses browser Local Storage to save tasks between sessions.
- Supports JSON backup files for additional data protection.
- Works without requiring a dedicated database or user account.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Structures the application interface |
| CSS3 | Provides styling and responsive layouts |
| JavaScript | Implements task management and application logic |
| Local Storage | Stores task data in the browser |
| JSON | Supports task backup and restoration |

---

## 📂 Project Structure

```text
task-mater/
│
├── index.html      # Application structure
├── style.css       # Styling and responsive design
├── script.js       # Task management and backup logic
├── README.md       # Project documentation
├── LICENSE         # Project license (optional)
└── .gitignore      # Files excluded from version control
```

---

## 🚀 Getting Started

Follow these steps to run Task Mater on your computer.

### Prerequisites

You need:
- A modern web browser.
- A text editor such as Visual Studio Code.
- The project source files.

No database installation or package manager is required.

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/YOUR-USERNAME/task-mater.git
```

Replace `YOUR-USERNAME` with your GitHub username.

**2. Navigate to the project directory**

```bash
cd task-mater
```

**3. Open the application**

Open `index.html` in your preferred web browser.

For more reliable browser storage behavior during development, you can use the Live Server extension in Visual Studio Code.

**4. Start managing your tasks**

Add a task, specify its date and time, and use the dashboard to monitor your progress.

---

## 📖 How to Use

### 1. Add a Task
- Enter a task title.
- Add an optional description.
- Select the scheduled date.
- Choose the task time.
- Click **Add Task**.

### 2. Manage Your Tasks
- Click **Complete** to mark a task as finished.
- Click **Undo** to mark a completed task as pending.
- Click **Edit** to modify task details.
- Click **Delete** to remove a task.

### 3. Track Your Progress
Use the dashboard to view total, pending, and completed tasks.

Use the task filter to display all tasks or show only pending or completed tasks.

### 4. Back Up Your Tasks
- Click **Save Backup**.
- The application downloads a JSON file containing your task data.
- Store the file somewhere safe for future use.

### 5. Restore Your Tasks
- Click **Restore Backup**.
- Select a previously downloaded Task Mater backup file.
- Choose whether to replace existing tasks or merge the backup with them.
- Confirm the operation to restore your tasks.

**Tip:** Create a new backup after important changes to keep your backup file up to date.

---

## 🔐 Data Storage and Privacy

Task Mater stores task data locally in your browser using Local Storage.

- No dedicated backend database is required.
- Tasks are associated with the browser and website origin where they were saved.
- Clearing browser storage may permanently remove locally saved tasks.
- JSON backup files provide an additional way to preserve and recover task data.
- Backups must be managed by the user and are not automatically synchronized with cloud storage.

**Important:** Local Storage does not synchronize tasks across different browsers or devices. Keep backup files in a secure location.

---

## 📸 Screenshots

Add screenshots of your application to a folder named `screenshots` and display them here.

For example:

```markdown
![Task Mater Dashboard](screenshots/dashboard.png)
```

Recommended screenshots:
- Main dashboard
- Task creation form
- Task list with sample tasks
- Backup and restore section

---

## 🔮 Future Improvements

Potential enhancements for future versions include:

- [ ] Browser notifications and task reminders
- [ ] Task priorities and categories
- [ ] Search functionality
- [ ] Advanced task filtering and sorting
- [ ] Calendar view
- [ ] Dark mode
- [ ] Cloud synchronization across devices
- [ ] User authentication
- [ ] Improved accessibility

---

## 🎯 Project Objective

The objective of Task Mater is to demonstrate how fundamental web development technologies can be used to build a practical task management application.

The project provides hands-on experience with DOM manipulation, event handling, form validation, browser storage, JSON data processing, and responsive web design.

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

To contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Commit your changes with a descriptive message.
5. Submit a pull request.

---

## 📄 License

This project is distributed under the license specified in the `LICENSE` file, if provided.

If you intend to publish the project for public reuse, consider adding an appropriate open-source license.

---

## 👨‍💻 Author

**Your Name**

- GitHub: [Alfie Praveen](https://github.com/YOUR-USERNAME)

---

⭐ If you find this project useful, consider giving the repository a star!

**Task Mater — Stay Organized. Stay Productive.**
