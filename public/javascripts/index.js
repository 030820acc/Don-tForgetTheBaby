// import { List, Task } from '../../db/models'
// const db = require('../../db/models')
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
    timeDisplay.innerText = `${Math.floor(time / 60)} Hours and ${time % 60} Minutes`
})
const demoButton = document.querySelector('#demo-user')
const demoUser = document.querySelector('#creds-input')
const demoSecret = document.querySelector('#pw-input')
demoButton.addEventListener('click', () => {
    console.log('inside demo click')
    demoUser.value = 'demo_user'
    demoSecret.value = 'demo'
})

