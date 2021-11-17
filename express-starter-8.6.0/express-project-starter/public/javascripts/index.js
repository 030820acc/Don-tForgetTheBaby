const db = require('../../db/models')

window.addEventListener("load", (event)=>{
    console.log("hello from javascript!")
})

// const logout = document.querySelector('#logoutbutton')
// redirect to login page?

const addList = document.querySelector('#add-list-button')
const newListValue = document.querySelector('.add-list-value')

addList.addEventListener('click', async () => {
    const { userId } = req.session.auth
    const newList = await db.List.create({
        listName: newListValue.value,
        userID: userId
    })
})
