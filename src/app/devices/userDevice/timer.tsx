"use client"
import { useState } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { timerSchema } from "@/schema/index";
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
    startWorkAt: string;
    endWorkAt: string;
  };
}

function Timer(props: Props) {
  const [startTime, setStartTime] = useState<any>(null);
  const [endTime, setEndTime] = useState<any>(null);
  const [identifier, setIdentifier] = useState<any>(null);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // setValue('switch1', props.value.switch1)
    // form.setValue("identifier", props.value.identifier);
    // form.setValue("startTimeAt",props.value.startWorkAt);
    // form.setValue("endTimeAt", props.value.endWorkAt);
    console.log("props", props.value);
    setIdentifier(props.value.identifier);
    const startWorkAt = props.value.startWorkAt.slice(0, -3);
    setStartTime(startWorkAt);
    const endWorkAt = props.value.endWorkAt.slice(0, -3);
    setEndTime(endWorkAt);
  }, [props.value]);

  // const form = useForm<z.infer<typeof timerSchema>>({
  //   resolver: zodResolver(timerSchema),
  //   defaultValues: {
  //     identifier: props.value.identifier,
  //     startTimeAt: props.value.startWorkAt,
  //     endTimeAt: props.value.endWorkAt,
  // });

  const updateRelays = async (value: any) => {
    const userToken = await GetToken();
    const result = await fetch(
      `${process.env.API_ENDPOINT}/device/update-timer`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(value),
      }
    );
    if (result.ok) {
      toast.success("تنظیمات تایمر با موفقیت اپدیت شد");
    } else {
      toast.error("خطایی رخ داده است ، تایمر اپدیت نشد");
    }
  };

  async function onSubmit() {
    const start = startTime.split(":");
    const startHourAt = start[0];
    const startMinAt = start[1];
    const end = endTime.split(":");
    const endHourAt = end[0];
    const endMinAt = end[1];
    const value = {
      identifier: identifier,
      startHourAt: +startHourAt,
      startMinAt: +startMinAt,
      endHourAt: +endHourAt,
      endMinAt: +endMinAt
    }
    startTransition(async () => {
      await updateRelays(value);
    });
  }

  return (
    <div>
               <h3 className="mb-4 text-lg font-medium">تنظیم ساعت سنسور</h3>
      <div className="flex gap-5 justify-center  my-10">
        
        <div>
          <label>ساعت روشن شدن</label>
          <TimePicker
            onChange={(date) => setStartTime(date)}
            value={startTime}
          />
        </div>
        <div>
          <label>ساعت خاموش شدن</label>
          <TimePicker onChange={(date) => setEndTime(date)} value={endTime} />
        </div>
      </div>
      <Button type="button" onClick={onSubmit} disabled={isPending}>
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isPending ? "Please wait" : "Submit"}
      </Button>
    </div>
  );
}

export default Timer;

// import { useState } from 'react';
// import TimePicker from 'react-time-picker';
// function Timer() {

//   const [value, onChange] = useState('10:00');

//   return (
//     <div className='w-full h-full'>
//       <input aria-label="Time" type="time" />
//     </div>
//   );
// }

// export default Timer;
