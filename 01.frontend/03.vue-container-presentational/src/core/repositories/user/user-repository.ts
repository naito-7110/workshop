import { userSchema } from '@/core/models'
import { faker } from '@faker-js/faker'

export async function getUserList() {
  return Array.from({ length: 10 }, () =>
    userSchema.parse({
      userId: faker.string.uuid(),
      profile: faker.image.avatar(),
      name: faker.person.fullName(),
      bio: faker.person.bio(),
    })
  )
}
