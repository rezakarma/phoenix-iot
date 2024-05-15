"use client";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { manualSchema } from "@/schema/index";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useEffect, useTransition } from "react";
import GetToken from "@/app/auth/getToken";
import { toast } from "sonner";

interface Props {
  value: {
    identifier: string;
    switch1: boolean;
    switch2: boolean;
    switch3: boolean;
    switch4: boolean;
    switch1Name: string;
    switch2Name: string;
    switch3Name: string;
    switch4Name: string;
  };
}

const Manual = (props: Props) => {
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // setValue('switch1', props.value.switch1)
    form.setValue("identifier", props.value.identifier);
    form.setValue("switch1", props.value.switch1);
    form.setValue("switch2", props.value.switch2);
    form.setValue("switch3", props.value.switch3);
    form.setValue("switch4", props.value.switch4);
  }, []);

  const form = useForm<z.infer<typeof manualSchema>>({
    resolver: zodResolver(manualSchema),
    defaultValues: {
      identifier: props.value.identifier,
      switch1: props.value.switch1,
      switch2: props.value.switch2,
      switch3: props.value.switch3,
      switch4: props.value.switch4,
    },
  });

  const updateRelays = async (value: z.infer<typeof manualSchema>) => {
    const userToken = await GetToken();
    const result = await fetch(
      `${process.env.API_ENDPOINT}/device/update-relays`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          identifier: value.identifier,
          fan1: value.switch1,
          fan2: value.switch2,
          water1: value.switch3,
          water2: value.switch4,
        }),
      }
    );
    if (result.ok) {
      toast.success("تنظیمات با موفقیت اپدیت شد");
    } else {
      toast.error("خطایی رخ داده است ، اپدیتانجام  نشد");
    }
  };

  async function onSubmit(data: z.infer<typeof manualSchema>) {
    startTransition(async () => {
      console.log(data);
      await updateRelays(data);
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex-row space-y-6 manual"
      >
        <div>
        <h3 className="mb-4 text-lg font-medium">خاموش/روشن کردن سنسور</h3>
          <div className=" grid grid-cols-2 gap-4 justify-evenly">
            <FormField
              control={form.control}
              name="switch1"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-5 rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {props.value ? props.value.switch1Name : "loading..."}
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="switch2"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-5 rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {props.value ? props.value.switch2Name : "loading..."}
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="switch3"
              render={({ field }) => (
                <FormItem className="flex flex-row  items-center gap-5 rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {props.value ? props.value.switch3Name : "loading..."}
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="switch4"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-5 rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {props.value ? props.value.switch4Name : "loading..."}
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "Please wait" : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default Manual;
