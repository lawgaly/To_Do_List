// Get the Elements by its ID
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById('taskList');
// Get the button elements
const defaultBackgroundButton = document.getElementById('defaultBackgroundButton');
const lightBackgroundButton = document.getElementById('lightBackgroundButton');
const darkBackgroundButton = document.getElementById('darkBackgroundButton');
const smallFontButton = document.getElementById('smallFontButton');
const mediumFontButton = document.getElementById('mediumFontButton');
const largeFontButton = document.getElementById('largeFontButton');
// Get references to the inputs
const colorPicker = document.getElementById('colorPicker');

const textMessage = document.createElement("p");
textMessage.id="message";
const middleColumn = document.querySelector(".column.middle"); // Select div with class "column middle"
middleColumn.insertBefore(textMessage, taskList); // Add above the task list
// Adding Event Listener and calling Functions.
document.getElementById("addTaskButton").addEventListener("click", addTask);
document.getElementById("highlightTasksButton").addEventListener("click",highlightTasks);
document.getElementById("removeCompletedButton").addEventListener("click",remove_Completed_Tasks);
// To check if the Enter key was pressed.
taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") 
        {addTask()}});
taskList.onclick = toggleCompleted;
function addTask(){
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            showMessage("Enter a task, please.");
            return;
        } else if (!isNaN(taskText)) {
            showMessage("Enter a Correct Task, please.");
            return;
            // To check if the Task is already exist.
        } else if ([...taskList.children].some(li => li.textContent.trim().toLowerCase()  === taskText.toLowerCase())) {
            showMessage("This task already exists.");
            return;
        }
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.style.marginRight="80px";
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                li.classList.add("completed");
            } else {
                li.classList.remove("completed");
            }
        });
        li.classList.add("task"); // Add class for styling
        li.appendChild(checkbox);
        // Add task text to <li>
        li.appendChild(document.createTextNode(` ${taskText}`));
        console.log(taskText)
        // Append <li> to the task list
        taskList.appendChild(li);
        taskInput.value = "";
    }

function toggleCompleted(event) {
        if (event.target.type === "checkbox") {
        // Toggle the "completed" class on the task
        event.target.classList.toggle("completed");
    } 
}

function highlightTasks(){
    const tasks = document.getElementsByClassName("task");
    console.log(tasks.length);
    if (tasks.length===0){
        textMessage.textContent = "There are no Tasks in the List.";
        textMessage.style.display = "block"; // Show the message
        hideMessageTimeout(textMessage);
        return;
    }
    const completedTasks = document.querySelectorAll("#taskList .completed");
    if (completedTasks.length===0)
        {
        textMessage.textContent = "There are no Completed Tasks.";
        textMessage.style.display = "block"; // Show the message
        hideMessageTimeout(textMessage);
        return;
        }
    for (const comTask of completedTasks) {
            comTask.style.backgroundColor = "rgb(240, 230, 230)";
    }
}
function remove_Completed_Tasks() {
    const remove_Tasks = document.querySelectorAll(".completed");
    if (remove_Tasks.length===0)
        {
        textMessage.textContent = "There are no Completed Tasks.";
        textMessage.style.display = "block"; // Show the message
        hideMessageTimeout(textMessage);
        return;
        }
    for ( const removeTask of remove_Tasks){
        removeTask.remove();
    }
}
function showMessage(message) {
    textMessage.textContent = message;
    textMessage.style.display = "block";
    hideMessageTimeout(textMessage);
    taskInput.value = "";
}

function  hideMessageTimeout(textMessage){
    setTimeout(() => {
        textMessage.style.display = "none";
    }, 2000);
}
// Function to apply default background
defaultBackgroundButton.addEventListener('click', function() {
    document.body.classList.remove('light-background', 'dark-background');
    document.body.style.backgroundImage = 'linear-gradient(rgba(250, 248, 245, 0.5), rgba(181, 196, 225, 0.558))'; // Apply gradient back to the body
});
// Function to apply light background
lightBackgroundButton.addEventListener('click', function() {
    document.body.classList.add('light-background');
    document.body.classList.remove('dark-background');
    document.body.style.backgroundImage = 'none'; 
});
// Function to apply dark background
darkBackgroundButton.addEventListener('click', function() {
    document.body.classList.add('dark-background');
    document.body.classList.remove('light-background');
    document.body.style.backgroundImage = 'none'; // Remove gradient for solid dark background
});
// Function to change font size to small
smallFontButton.addEventListener('click', function() {
    document.body.style.fontSize = '14px'; 
});
// Function to change font size to medium
mediumFontButton.addEventListener('click', function() {
    document.body.style.fontSize = '18px'; 
});
// Function to change font size to large
largeFontButton.addEventListener('click', function() {
    document.body.style.fontSize = '26px'; 
});
// Handle background color selection
colorPicker.addEventListener('input', function () {
    const color = colorPicker.value; // Get the selected color
    document.body.style.backgroundImage = 'none'; // Remove any existing background image
    document.body.style.backgroundColor = color; 
});