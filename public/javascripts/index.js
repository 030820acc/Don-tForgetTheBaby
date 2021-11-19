// import { List, Task } from '../../db/models'
// const db = require('../../db/models')

window.addEventListener("load", (event)=>{
    console.log("hello from javascript!")
    const search = document.getElementsByClassName('searchbar')
    const searchbutton = document.getElementById('searchbutton')


    searchbutton.addEventListener('click', (e) => {
        e.preventDefault()
        const result = Task.findAll({where: {taskName: search.value}})
    })

    const taskCount = document.querySelector('#task-count')

    let numTasks = document.querySelectorAll('#task-row')
    let counter = numTasks.length
    taskCount.innerText = counter
})

const demoButton = document.querySelector('#demo-user')
const demoUser = document.querySelector('#creds-input')
const demoSecret = document.querySelector('#pw-input')



demoButton.addEventListener('click', () => {
    console.log('inside demo click')
    demoUser.value = 'demo_user'
    demoSecret.value = 'demo'
})
