type User = {
  name: string
  age: number
}

type Person = {
  name: string
  age: number
  birthDay: Date
}

const user: User = {
  name: "naito",
  age: 27,
}

const person: Person = {
  name: "watanabe",
  age: 27,
  birthDay: new Date()
}

function greet(user: User) {
  console.log(`hello ${user.name}`)
}

const invalidUser = undefined as unknown as User

greet(user)
greet(person)
greet(invalidUser)
