// import { List, Task } from '../../db/models'
// const db = require('../../db/models')
window.onload = function() {
window.addEventListener("load", (event)=>{
    console.log("hello from javascript!")

    const taskCountDisplay = document.querySelector('#task-count')

    let numTasks = document.querySelectorAll('#task-row')
    let taskCounter = numTasks.length
    taskCountDisplay.innerText = taskCounter

    const timeDisplay = document.querySelector('#time-left')
    let taskTimes = document.querySelectorAll('#task-time')

    let time = 0
    taskTimes.forEach(task => {
        time += parseInt(task.className)
    })
    timeDisplay.innerText = `${time} min`

    const completedTaskDisplay = document.querySelector('#done-tasks')
    let completedTasks

    if(!completedTasks) {
        completedTaskDisplay.innerText = 0
    }
    else {
        completedTaskDisplay.innerText = completedTasks
    }
    
    

})

const completionButton = document.querySelector('.completion')

completionButton.addEventListener('click', () => {
    console.log('inside button event')
    // fetch('/completed', {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         taskId: completionButton.value
    //     })
    // })
    //     .then((res) => res.json())
    //     .then(console.log(resData))
})

const demoButton = document.getElementById('demo-user')
const demoUser = document.getElementById('creds-input')
const demoSecret = document.getElementById('pw-input')

demoButton.addEventListener('click', (e) => {
    console.log('inside demo click')
    demoUser.value = 'demo_user'
    demoSecret.value = 'demo'
})
}
