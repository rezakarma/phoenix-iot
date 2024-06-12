"use client";
import { useReducer, useState } from "react";

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
import TimeInput from "@/components/device/timeInput";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Props {
  value: {
    identifier: string;
    relay1StartWorkAt: string;
    relay1EndWorkAt: string;
    relay2StartWorkAt: string;
    relay2EndWorkAt: string;
    relay3StartWorkAt: string;
    relay3EndWorkAt: string;
    relay4StartWorkAt: string;
    relay4EndWorkAt: string;
  };
}

const initialState = {
  // startHourAtRelay1: "00:00:00",
  // startMinAtRelay1: "00:00:00",
  // endHourAtRelay1: "00:00:00",
  // endMinAtRelay1: "00:00:00",
  // startHourAtRelay2: "00:00:00",
  // startMinAtRelay2: "00:00:00",
  // endHourAtRelay2: "00:00:00",
  // endMinAtRelay2: "00:00:00",
  // startHourAtRelay3: "00:00:00",
  // startMinAtRelay3: "00:00:00",
  // endHourAtRelay3: "00:00:00",
  // endMinAtRelay3: "00:00:00",
  // startHourAtRelay4: "00:00:00",
  // startMinAtRelay4: "00:00:00",
  // endHourAtRelay4: "00:00:00",
  // endMinAtRelay4: "00:00:00",
  identifier: null,
  relay1StartWorkAt: "08:00:00",
  relay1EndWorkAt: "12:00:00",
  relay2StartWorkAt: "08:00:00",
  relay2EndWorkAt: "12:00:00",
  relay3StartWorkAt: "08:00:00",
  relay3EndWorkAt: "12:00:00",
  relay4StartWorkAt: "08:00:00",
  relay4EndWorkAt: "12:00:00",
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_IDENTIFIER":
      return { ...state, identifier: action.payload };
    case "SET_RELAY_1_START":
      return { ...state, relay1StartWorkAt: action.payload };
    case "SET_RELAY_1_END":
      return { ...state, relay1EndWorkAt: action.payload };
    case "SET_RELAY_2_START":
      return { ...state, relay2StartWorkAt: action.payload };
    case "SET_RELAY_2_END":
      return { ...state, relay2EndWorkAt: action.payload };
    case "SET_RELAY_3_START":
      return { ...state, relay3StartWorkAt: action.payload };
    case "SET_RELAY_3_END":
      return { ...state, relay3EndWorkAt: action.payload };
    case "SET_RELAY_4_START":
      return { ...state, relay4StartWorkAt: action.payload };
    case "SET_RELAY_4_END":
      return { ...state, relay4EndWorkAt: action.payload };
  }
};

function Timer(props: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

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
    setStateValue("SET_IDENTIFIER", props.value.identifier, false);

    setStateValue("SET_RELAY_1_START", props.value.relay1StartWorkAt, false);
    setStateValue("SET_RELAY_1_END", props.value.relay1EndWorkAt, false);

    setStateValue("SET_RELAY_2_START", props.value.relay2StartWorkAt, false);
    setStateValue("SET_RELAY_2_END", props.value.relay2EndWorkAt, false);

    setStateValue("SET_RELAY_3_START", props.value.relay3StartWorkAt, false);
    setStateValue("SET_RELAY_3_END", props.value.relay3EndWorkAt, false);

    setStateValue("SET_RELAY_4_START", props.value.relay4StartWorkAt, false);
    setStateValue("SET_RELAY_4_END", props.value.relay4EndWorkAt, false);
  }, []);

  // const form = useForm<z.infer<typeof timerSchema>>({
  //   resolver: zodResolver(timerSchema),
  //   defaultValues: {
  //     identifier: props.value.identifier,
  //     startTimeAt: props.value.startWorkAt,
  //     endTimeAt: props.value.endWorkAt,
  // });

  const setStateValue = (type: string, value: string, isTime = true) => {
    let structuredValue = value;
    if (isTime) {
      structuredValue = structuredValue.slice(0, -3);
    }
    dispatch({ type: type, payload: structuredValue });
  };

  const createTimeSeterFn = (type: string) => (value: string) => {
    dispatch({ type: type, payload: value });
  };

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
    console.log(result)
    if (result.ok) {
      toast.success("تنظیمات تایمر با موفقیت اپدیت شد");
    } else {
      toast.error("خطایی رخ داده است ، تایمر اپدیت نشد");
    }
  };

  async function onSubmit() {
    const relay1start = state.relay1StartWorkAt.split(":");
    const relay1end = state.relay1EndWorkAt.split(":");
    console.log(relay1start)
    const relay2start = state.relay2StartWorkAt.split(":");
    const relay2end = state.relay2EndWorkAt.split(":");

    const relay3start = state.relay3StartWorkAt.split(":");
    const relay3end = state.relay3EndWorkAt.split(":");

    const relay4start = state.relay4StartWorkAt.split(":");
    const relay4end = state.relay4EndWorkAt.split(":");


    const value = {
      identifier: state.identifier,
      startHourAtRelay1: +relay1start[0],
      startMinAtRelay1: +relay1start[1],
      endHourAtRelay1: +relay1end[0],
      endMinAtRelay1: +relay1end[1],
      startHourAtRelay2: +relay2start[0],
      startMinAtRelay2: +relay2start[1],
      endHourAtRelay2: +relay2end[0],
      endMinAtRelay2: +relay2end[1],
      startHourAtRelay3: +relay3start[0],
      startMinAtRelay3: +relay3start[1],
      endHourAtRelay3: +relay3end[0],
      endMinAtRelay3: +relay3end[1],
      startHourAtRelay4: +relay4start[0],
      startMinAtRelay4: +relay4start[1],
      endHourAtRelay4: +relay4end[0],
      endMinAtRelay4: +relay4end[1],
    };
    startTransition(async () => {
      await updateRelays(value);
    });
  }

  return (
    <div>
      <h3 className="mb-4 text-lg font-medium">تنظیم ساعت سنسور</h3>
      <div className="flex flex-col gap-5 justify-center  my-10">
        {/* <div>
          <label>ساعت روشن شدن</label>
          <TimePicker
            className="rounded-2xl"
            onChange={(date) => setStartTime(date)}
            value={startTime}
          />
        </div>
        <div>
          <label>ساعت خاموش شدن</label>
          <TimePicker onChange={(date) => setEndTime(date)} value={endTime} />
        </div>*/}
        <Card  className="flex justify-evenly py-5 px-2">
          <TimeInput
            title="ساعت روشن شدن رله ی 1"
            setTime={createTimeSeterFn("SET_RELAY_1_START")}
            time={state.relay1StartWorkAt}
          />
          <TimeInput
            title="ساعت خاموش شدن رله ی 1"
            setTime={createTimeSeterFn("SET_RELAY_1_END")}
            time={state.relay1EndWorkAt}
          />
        </Card>
        <Card  className="flex justify-evenly py-5 px-2">
          <TimeInput
            title="ساعت روشن شدن رله ی 2"
            setTime={createTimeSeterFn("SET_RELAY_2_START")}
            time={state.relay2StartWorkAt}
          />
          <TimeInput
            title="ساعت خاموش شدن رله ی 2"
            setTime={createTimeSeterFn("SET_RELAY_2_END")}
            time={state.relay2EndWorkAt}
          />
        </Card>
        <Card  className="flex justify-evenly py-5 px-2">
          <TimeInput
            title="ساعت روشن شدن رله ی 3"
            setTime={createTimeSeterFn("SET_RELAY_3_START")}
            time={state.relay3StartWorkAt}
          />
          <TimeInput
            title="ساعت خاموش شدن رله ی 3"
            setTime={createTimeSeterFn("SET_RELAY_3_END")}
            time={state.relay3EndWorkAt}
          />
        </Card>
        <Card  className="flex justify-evenly py-5 px-2">
          <TimeInput
            title="ساعت روشن شدن رله ی 4"
            setTime={createTimeSeterFn("SET_RELAY_4_START")}
            time={state.relay4StartWorkAt}
          />
          <TimeInput
            title="ساعت خاموش شدن رله ی 4"
            setTime={createTimeSeterFn("SET_RELAY_4_END")}
            time={state.relay4EndWorkAt}
          />
        </Card>
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
