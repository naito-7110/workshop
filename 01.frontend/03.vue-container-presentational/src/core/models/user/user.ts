import { z } from "zod";

export const userIdSchema = z.string().uuid().brand<"UserIdBrand">()
export const userNameSchema = z.string().brand<"UserNameBrand">()
export const userProfileSchema = z.string().brand<"UserProfileBrand">()
export const userBioSchema = z.string().brand<"UserBioBrand">()
export const userSchema = z.object({
    userId: userIdSchema,
    name: userNameSchema,
    profile: userProfileSchema,
    bio: userBioSchema
}).brand<"UserBrand">()

export type UserIdType = z.infer<typeof userIdSchema>
export type UserNameType = z.infer<typeof userNameSchema>
export type UserProfileType = z.infer<typeof userProfileSchema>
export type UserBioType = z.infer<typeof userBioSchema>
export type UserType = z.infer<typeof userSchema>
export type UserInputType = z.input<typeof userSchema>