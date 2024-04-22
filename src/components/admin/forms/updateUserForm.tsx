"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/schema/index";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AddUserOrDeviceAction from "@/app/admin/adminActions/addUserOrDeviceAction";
import { useState, useTransition } from "react";
import NotoficationUi from "@/components/formValidateMessages/notification-ui";
import { Loader2 } from "lucide-react";

interface Notification {
  status: string;
  message: string;
}

interface Props {
    onSubmit : (values: {
        password: string;
        username: string;
    }) =>  Notification
}

const UpdateUserForm = (props : Props) => {
  const [notification, setNotification] = useState({
    status: "",
    message: "",
  });
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    startTransition(async () => {
      const resultOfAddUser: Notification = props.onSubmit(values)
      setNotification(resultOfAddUser);
    });
  }

  return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام کاربری</FormLabel>
                  <FormControl>
                    <Input placeholder="نام کاربری" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رمزعبور</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="رمزعبور" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {notification && <NotoficationUi notification={notification} />}
            <Button type="submit" disabled={isPending}>
              {isPending ? " در حال بارگذاری" : " ساختن کاربر"} 
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            </Button>
          </form>
        </Form>
  );
};

export default UpdateUserForm;
