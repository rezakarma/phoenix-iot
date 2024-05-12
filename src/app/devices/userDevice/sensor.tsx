"use client";
import { Loader2 } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { sensorSchema } from "@/schema/index";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useTransition } from "react";
import GetToken from "@/app/auth/getToken";
import { toast } from "sonner";

interface Props {
  value: {
    identifier: string;
    fanSwitchOnAt: number;
    fanSwitchOffAt: number;
    waterSwitchOffAt: number;
  };
}

const Sensor = (props: Props) => {
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // setValue('switch1', props.value.switch1)
    form.setValue("identifier", props.value.identifier);
    form.setValue("fanOnAtTemp", props.value.fanSwitchOnAt.toString());
    form.setValue("fanOffAtTemp", props.value.fanSwitchOffAt.toString());
    form.setValue(
      "waterOffFromHumidity",
      props.value.fanSwitchOffAt.toString()
    );
    console.log("props", props.value);
  }, [props.value]);

  const form = useForm<z.infer<typeof sensorSchema>>({
    resolver: zodResolver(sensorSchema),
    defaultValues: {
      identifier: props.value.identifier,
      fanOnAtTemp: props.value.fanSwitchOnAt.toString(),
      fanOffAtTemp: props.value.fanSwitchOffAt.toString(),
      waterOffFromHumidity: props.value.waterSwitchOffAt.toString(),
    },
  });

  const updateRelays = async (value: z.infer<typeof sensorSchema>) => {
    const userToken = await GetToken();
    const result = await fetch(
      `${process.env.API_ENDPOINT}/device/update-sensor`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          identifier: value.identifier,
          fanOnAtTemp: +value.fanOnAtTemp,
          fanOffAtTemp: +value.fanOffAtTemp,
          waterOffFromHumidity: +value.waterOffFromHumidity,
        }),
      }
    );
    if (result.ok) {
      toast.success("تنظیمات سنسور با موفقیت اپدیت شد");
    } else {
      toast.error("خطایی رخ داده است ، سنسور اپدیت نشد");
    }
  };

  async function onSubmit(data: z.infer<typeof sensorSchema>) {
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
          <h3 className="mb-4 text-lg font-medium">تنظیم سنسور</h3>
          <div className=" flex gap-10 justify-evenly">
            <FormField
              control={form.control}
              name="fanOnAtTemp"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center gap-5 rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {props.value ? "روشن شدن فن در دمای" : "loading..."}
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fanOffAtTemp"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center gap-5 rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {props.value ? "خاموش شدن فن در دمای" : "loading..."}
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="waterOffFromHumidity"
              render={({ field }) => (
                <FormItem className="flex flex-col  items-center gap-5 rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {props.value ? "خاموش شدن شیر آب در دمای" : "loading..."}
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit" disabled={isPending}>
         {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ?'Please wait': 'Submit'}
        </Button>
      </form>
    </Form>
  );
};

export default Sensor;
