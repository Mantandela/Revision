const formElement = document.getElementById("add-task-form")
const submitBtn = document.getElementById("add-btn-9212")


submitBtn.addEventListener("click",handleSubmit)
let taskId = 1
const taskArr = []

function handleSubmit(e){
    e.preventDefault()
    const taskName = formElement.elements["task"].value

    const task = {
        id: taskId ++,
        name:taskName,
        status: "active"
    }

    taskArr.push(task)

    // console.log()
    
    document.getElementById("active-list").innerHTML=""
    taskArr.map((tasks)=>{
    
        let activeTask = `
      <li> ${tasks.name} <span class = "action-btn" >
      <button class= "delete">Delete</button>
       <button class= "edit">Edit</button> 
       <button class= "complete">Complete</button> </span><li>
    `
        document.getElementById("active-list").innerHTML += activeTask;
    })
   

    console.log(taskArr)
}

// Factory function to create a task store with a unique key
// function createStore(key) {
//     const storageKey = key;

//     // Retrieve current state from localStorage, or default to empty array
//     function getState() {
//         return JSON.parse(localStorage.getItem(storageKey)) || [];
//     }

//     // Save new state to localStorage and return a deep-cloned array
//     function setState(state) {
//         localStorage.setItem(storageKey, JSON.stringify(state));
//         return [...state]; // ensures immutability
//     }

//     return {
//         // Add a new task object to the store
//         add(task) {
//             const state = getState();
//             const newState = [...state, task];
//             return setState(newState);
//         },

//         // Toggle the 'done' status of a task by ID
//         toggle(id) {
//             const state = getState().map(task =>
//                 task.id === id ? { ...task, done: !task.done } : task
//             );
//             return setState(state);
//         },

//         // Remove a task from the store by ID
//         remove(id) {
//             const state = getState().filter(task => task.id !== id);
//             return setState(state);
//         },

//         // Return a deep-cloned list of all tasks
//         list() {
//             return [...getState()];
//         }
//     };
// }

