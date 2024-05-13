"use client"
 
import { string, z } from "zod"
 
export const loginSchema = z.object({
  username: z.string({ required_error: "نام کاربری الزامی است"}).min(2,{message:'نام کاربری حداقل 2 نویسه است'}).max(50),
  password: z.string({ required_error: "رمز عبور الزامی است"}).min(1,{message:"رمز عبور الزامی است"})
})

export const deviceSchema =z.object({
  identifier: string().min(1,{message:'identifier الزامی است'}),
  switch1Name: string(),
  switch2Name: string(),
  switch3Name: string(),
  switch4Name: string(),
})

export const manualSchema = z.object({
    identifier:	z.string(),
    switch1:	z.boolean(),
    switch2	:	z.boolean(),
    switch3	:	z.boolean(),
    switch4	:	z.boolean(),
})

export const sensorSchema = z.object({
  identifier:	z.string(),
  fanOnAtTemp: z.string(),
  fanOffAtTemp: z.string(),
  waterOffFromHumidity: z.string()
})

export const timerSchema = z.object({
  identifier:	z.string(),
  startTimeAt: z.string(),
  endTimeAt: z.string(),

})

export const AssignUserToDeviceSchema = z.object({
  user: z.string(),
  device: z.string()
})

