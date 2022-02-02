# MVP List

Don't Forget the Baby, a Remember the Milk clone, is a website for users to create and organize their own dynamic to-do lists, track their progress, and mark tasks and/or lists as complete.

live link: https://projectw13.herokuapp.com/

## 1. New Account Creation, Log In, Log Out, Demo/Guest Login

* Users can sign up, log in, and log out.
* Users can use a demo log in to try the site.
* Logged in users are directed to their homepage, which shows a list of their tasks and task-lists.
* Logged out users are directed to a splash homepage, which doubles as the sign-in page.

## 2. Hosting on Heroku

## 3. Lists 

* Users are able to add lists.
* Within each list they can see all their tasks.

## 4. Tasks 

* Users can add tasks that belong to specific lists.
* Users can search for tasks or lists by key words.
* Display estimated time to complete remaining tasks

## 5. Task Tracking

* Users will be able to see in real time:
    1. The number of tasks they have left

## 6. Production READme

Don't Forget the Baby is a Remember the Milk clone made using Express and Pug template HTML and Sequelize. 

To set up the app in development:
run in the root directory
`npm install`

create a .env file using the .env example file

set up the database to match .env 

run in the root directory
`npx sequelize db:migrate`

run in the root directory:
`npx sequelize db:seed:all`

run `npm start` to start the servers


## 7. Bonus Features

* When users mark their tasks as complete, the task will show up in the 'Completed' tab
* Users can rename lists and/or tasks
* Tags for list items and smart lists to sort them by tags
* Subtasks for each list item
* Users will be able to see in real time:
    1. The estimated total time it will take to complete all remaining tasks
* Sort tasks by completed tasks
