const bcrypt = require('bcryptjs')

const password = 'demo'

// async function printHash(pw) {
//     const hashedPassword = await bcrypt.hash(pw, 10)
//     return hashedPassword
//     // console.log(hashedPassword)
// }

// const demoTest = printHash(password)

// // printHash(password)

// //$2a$10$xwWuUvjV851XiLwLRPduqudfrQFY67B751aQ6kIqYgXPo8rsaZ.v.

// const compareFx = async(hash) => {
//     const boolean = await bcrypt.compare('demo', hash.toString())
//     console.log(boolean)
// }

// compareFx(demoTest)

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync("B4c0/\/", salt);

const saltRounds2 = 8;
const hash2 = bcrypt.hashSync('bacon', saltRounds2);

console.log(bcrypt.compareSync("B4c0/\/", hash)); // true
console.log(bcrypt.compareSync("not_bacon", hash)); // false
console.log(bcrypt.compareSync("bacon", hash2)); // true

const demoHash = bcrypt.hashSync('demo', 17)
console.log(bcrypt.compareSync('demo', demoHash))
