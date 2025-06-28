import { z } from 'zod'

const userNameSchema = z.string().brand<'UserNameBrand'>()
const userAgeSchema = z.number().int().nonnegative().brand<'UserAgeBrand'>()
const userSchema = z
  .object({
    name: userNameSchema,
    age: userAgeSchema,
  })
  .brand<'UserBrand'>()

export type UserNameType = z.infer<typeof userNameSchema>
export type UserAgeType = z.infer<typeof userAgeSchema>
export type UserType = z.infer<typeof userSchema>

function greet(user: UserType) {
  console.log(`hello ${user.name}`)
}

const user: UserType = userSchema.parse({
  name: userNameSchema.parse('7110'),
  age: userAgeSchema.parse(27)
})

greet(user)

const priceSchema = z.number().int().nonnegative().brand<"PriceBrand">()
export type PriceType = z.infer<typeof priceSchema>

const price: PriceType = priceSchema.parse(100)

function getPriceIncludedTax(price: PriceType) {
  return price * 1.1
}

getPriceIncludedTax(price)
// getPriceIncludedTax(user.age)
