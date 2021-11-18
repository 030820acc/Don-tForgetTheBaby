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
})

// const logout = document.querySelector('#logoutbutton')
// redirect to login page?

// const addList = document.querySelector('#add-list-button')
// const newListValue = document.querySelector('.add-list-value')

// addList.addEventListener('click', async (e) => {
//     e.preventDefault()

//     let listName = newListValue.value
//     console.log(newListValue.value)
//     if (listName) {

//     }

// })
