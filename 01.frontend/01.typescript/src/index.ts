type User = {
  name: string
  age: number
}

const user: User = {
  name: '',
  age: 27,
}

function greet(user: User) {
  console.log(`hello ${user.name}`)
}

const invalidUser = undefined as unknown as User

greet(user)
greet(invalidUser)
