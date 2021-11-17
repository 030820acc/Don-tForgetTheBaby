import { List, Task } from '../../db/models'

window.addEventListener("load", (event)=>{
    console.log("hello from javascript!")
})

// const logout = document.querySelector('#logoutbutton')
// redirect to login page?

const addList = document.querySelector('#add-list-button')
const newListValue = document.querySelector('.add-list-value')

addList.addEventListener('click', async () => {
    const { userID } = req.session.auth
    const newList = await List.create({
        listName: newListValue.value,
        userID
    })
})
