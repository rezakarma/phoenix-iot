"use client"
 
import { string, z } from "zod"
 
export const loginSchema = z.object({
  username: z.string({ required_error: "نام کاربری الزامی است"}).min(2,{message:'نام کاربری حداقل 2 نویسه است'}).max(50),
  password: z.string({ required_error: "رمز عبور الزامی است"}).min(1,{message:"رمز عبور الزامی است"})
})

export const deviceSchema =z.object({
  identifier: string().min(1,{message:'identifier الزامی است'})
})

export const manualSchema = z.object({
    identifier:	z.string(),
    fan1:	z.boolean(),
    fan2	:	z.boolean(),
    water1	:	z.boolean(),
    water2	:	z.boolean(),
})