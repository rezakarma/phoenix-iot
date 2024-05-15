"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { loginSchema } from '@/schema/index'
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import NotoficationUi from '@/components/formValidateMessages/notification-ui'
import login from '@/app/auth/login'
import { useState } from "react"


interface Notification {
  status: string;
  message: string;
}

const LoginPage = () => {
  const [notification, setNotification] = useState({
    status: '',
    message: '',
  })

  const router = useRouter()
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
          username: "",
          password: ""
        },
      })

    //   const login=async (value :z.infer<typeof loginSchema>) => {
    //     console.log(process.env.API_ENDPOINT)    
    //     const result =await fetch(`${process.env.API_ENDPOINT}/users/login`,  {
    //       method: "POST",
    //       headers: {
    //         "Content-type": "application/json",
    //       },
    //       body: JSON.stringify(value),
    //     })
    //     if(result.ok){
    //       const response = await result.json()
    //       if(response.message){
    //         setNotification({
    //           status: 'error',
    //           message:response.message
    //         })
    //         return
    //       }else if(response.token) {
    //         setNotification({
    //           status: 'success',
    //           message:'با موفقیت وارد شدید'
    //         })
    //         const {token,expireDateUtc} = response;
    //         const expireDate = new Date(expireDateUtc);

    // Cookies.set('token', token, { expires: expireDate, secure: true, httpOnly: true ,sameSite: 'strict',
    // domain: 'http://localhost:3000', // Set the cookie domain
    // path: '/', });
    // Cookies.set('expireDateUtc', expireDateUtc, { expires: expireDate, secure: true, httpOnly: true, sameSite: 'strict',
    // domain: 'http://localhost:3000', // Set the cookie domain
    // path: '/', });
    //         // Redirect to a protected route or refresh the page
    //       } else {

    //       }
    //     }
    //   }

      async function onSubmit(values: z.infer<typeof loginSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const loginResponse : Notification =await login(values);
        setNotification(loginResponse);
        if(loginResponse.status === 'success'){
          router.push('/')
        }
        console.log(values)
        // setNotification({
        //   status:"pending",
        //   message:'pending'
        // })
        // await login(values)
      }

    return ( 
      <div className="flex justify-center items-center h-screen w-full">

      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex  flex-col">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="نام کاربری" {...field} />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
          />
          <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input placeholder="رمز عبور" type='password' {...field} />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
          />
          {notification && 
          <NotoficationUi notification={notification}/> 
          }
        <Button className="h-[100%]" type="submit" disabled={notification.status === 'pending' ? true: false}>{notification.status === 'pending' ? 'در حال بار گذاری' : 'ورود'}</Button>
      </form>
    </Form>
          </div>
     );
}
 
export default LoginPage;