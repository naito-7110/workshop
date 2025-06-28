import { user } from './user.js'

function greet(name: string) {
    console.log(`hello ${name}`)
}


greet(user.name)

export {
    greet,
    user
}
