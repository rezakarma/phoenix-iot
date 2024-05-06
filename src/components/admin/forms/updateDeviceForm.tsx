"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SyncLoader } from "react-spinners";
import { deviceSchema } from "@/schema/index";
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
import { useEffect, useState, useTransition } from "react";
import NotoficationUi from "@/components/formValidateMessages/notification-ui";
import { Loader2 } from "lucide-react";

interface Notification {
  status: string;
  message: string;
}

interface Props {
  onSubmit: (values: { identifier: string }) => Notification;

  deviceData: () => {
    identifier: string;
    switch1Name: string;
    switch2Name: string;
    switch3Name: string;
    switch4Name: string;
  };
}

const UpdateDeviceForm = (props: Props) => {
  const [notification, setNotification] = useState({
    status: "",
    message: "",
  });
  const [isPending, startTransition] = useTransition();

  // useEffect(() => {
  //   const fetchDevice = async () => {
  //     const deviceData = await props.deviceData();
  //     form.setValue("identifier", deviceData.identifier)
  //     setFormData(deviceData);
  //     console.log('here: ',deviceData)
  //   };

  //   fetchDevice()
  // }, []);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchDevice = async () => {
      const deviceData = await props.deviceData();
      console.log(deviceData)
        form.setValue('identifier', deviceData.identifier);
        form.setValue('switch1Name', deviceData.switch1Name);
        form.setValue('switch2Name', deviceData.switch2Name);
        form.setValue('switch3Name', deviceData.switch3Name);
        form.setValue('switch4Name', deviceData.switch4Name);
        setIsLoading(false);
    };

    fetchDevice();
  }, []);

  const form = useForm<z.infer<typeof deviceSchema>>({
    resolver: zodResolver(deviceSchema),
    defaultValues: {
      identifier: '',
      switch1Name: '',
      switch2Name:'',
      switch3Name: '',
      switch4Name: '',
    },
  });

  // 2. Define a submit handler.

  async function onSubmit(values: z.infer<typeof deviceSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    startTransition(async () => {
      const resultOfAddUser: Notification = props.onSubmit(values);
      setNotification(resultOfAddUser);
    });
  }

  return (
    <Form {...form}>
      {isLoading && 
      <div className="flex justify-center">
        <SyncLoader/>
      </div>
        }
      
      {!isLoading && <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>identifier</FormLabel>
              <FormControl>
                <Input placeholder="identifier" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="switch1Name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>switch1 Name</FormLabel>
              <FormControl>
                <Input placeholder="switch1Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="switch2Name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>switch2 Name</FormLabel>
              <FormControl>
                <Input placeholder="switch2Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="switch3Name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>switch3 Name</FormLabel>
              <FormControl>
                <Input placeholder="switch3Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="switch4Name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>switch4 Name</FormLabel>
              <FormControl>
                <Input placeholder="switch4Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {notification && <NotoficationUi notification={notification} />}
        <Button type="submit" disabled={isPending}>
          {isPending ? " در حال بارگذاری" : "  ویرایش دستگاه"}
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        </Button>
      </form>}
    </Form>
  );
};

export default UpdateDeviceForm;
