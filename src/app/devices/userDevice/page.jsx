"use client";

import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Manual from "./manual";
import { useEffect, useState } from "react";
import Sensor from "./sensor";
import Timer from "./timer";
import CustomGaugeChart from "@/components/device/CustomGaugeChart";
import { FadeLoader } from "react-spinners";
const UserDevice = ({ value }) => {
  const [data, setData] = useState({
    identifier: "Loading...",
    switch1: false,
    switch2: false,
    switch3: false,
    switch4: false,
    switch1Name: "loading",
    switch2Name: "loading",
    switch3Name: "loading",
    switch4Name: "loading",
    setting: "Loading...",
    fanSwitchOnAt: 26,
    fanSwitchOffAt: 30,
    waterSwitchOffAt: 70,
    startWorkAt: "21:31:28.4140000",
    endWorkAt: "21:34:00.4140000",
    belongToUsername: null,
    temperature: "29.30",
    humidity: "51.00",
    val1: '{"name":"temp","value":"0","max":"20","min":"0"}',
    val2: '{"name":"temp","value":"0","max":"20","min":"0"}',
    val3: '{"name":"temp","value":"0","max":"20","min":"0"}',
    val4: '{"name":"temp","value":"0","max":"20","min":"0"}',
    val5: '{"name":"temp","value":"0","max":"20","min":"0"}',
    val6: '{"name":"temp","value":"0","max":"20","min":"0"}',
    val7: '{"name":"temp","value":"0","max":"20","min":"0"}',
    val8: '{"name":"temp","value":"0","max":"20","min":"0"}',
    val9: '{"name":"temp","value":"0","max":"20","min":"0"}',
    val10: '{"name":"temp","value":"0","max":"20","min":"0"}',
    val11: '{"name":"temp","value":"0","max":"20","min":"0"}',
    val12: '{"name":"temp","value":"0","max":"20","min":"0"}',
    val13: '{"name":"temp","value":"0","max":"20","min":"0"}',
    val14: '{"name":"temp","value":"0","max":"20","min":"0"}',
    val15: '{"name":"temp","value":"0","max":"20","min":"0"}',
    val16: '{"name":"temp","value":"0","max":"20","min":"0"}',
    val17: '{"name":"temp","value":"0","max":"20","min":"0"}',
    val18: '{"name":"temp","value":"0","max":"20","min":"0"}',
    val19: '{"name":"temp","value":"0","max":"20","min":"0"}',
    val20: '{"name":"temp","value":"0","max":"20","min":"0"}',
    isSync: false,
  });
  useEffect(() => {
    const test = async () => {
      const data = await value();
      console.log("heree: ", data);
      setData(data);
    };
    test();
  }, [value]);
  return (
    <div className="flex flex-col w-full h-full gap-5 manual ltr">
      <div className="w-full flex gap-2 justify-end">
        <Badge className="p-2 font-semibold">id: {data.identifier}</Badge>
        <Badge>sync: {data.isSync.toString()}</Badge>
        <Badge>mode: {data.setting}</Badge>
      </div>
      {/* <div className="flex flex-col gap-5">
        <span className="text-lx">حالت دستگاه:</span>
        <Select
          value={value.setting}
          onValueChange={(value) => {
            console.log(value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="حالت دستگاه" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Manual">دستی</SelectItem>
            <SelectItem value="Sensor">سنسور</SelectItem>
            <SelectItem value="Timer">تایمر</SelectItem>
          </SelectContent>
        </Select>
      </div> */}
     {data.identifier !== "Loading..." && <div>
        <Tabs defaultValue="Manual" className="w-[100%]">
          <TabsList>
            <TabsTrigger value="Manual">دستی</TabsTrigger>
            <TabsTrigger value="Sensor">سنسنور</TabsTrigger>
            <TabsTrigger value="Timer">تایمر</TabsTrigger>
            <TabsTrigger value="Values">values</TabsTrigger>
          </TabsList>
          <TabsContent value="Manual">
            <Manual
              value={{
                identifier: data.identifier,
                switch1: data.switch1,
                switch2: data.switch2,
                switch3: data.switch3,
                switch4: data.switch4,
                switch1Name: data.switch1Name,
                switch2Name: data.switch2Name,
                switch3Name: data.switch3Name,
                switch4Name: data.switch4Name,
              }}
            />
          </TabsContent>
          <TabsContent value="Sensor">
            <Sensor
              value={{
                identifier: data.identifier,
                fanSwitchOnAt: data.fanSwitchOnAt,
                fanSwitchOffAt: data.fanSwitchOffAt,
                waterSwitchOffAt: data.waterSwitchOffAt,
              }}
            />
          </TabsContent>
          <TabsContent value="Timer">
            <Timer
              value={{
                identifier: data.identifier,
                startWorkAt: data.startWorkAt,
                endWorkAt: data.endWorkAt,
              }}
            />
          </TabsContent>
          <TabsContent value="Values">
            <ScrollArea className="h-[500px] w-full rounded-md border p-4 ">
              <div className="grid grid-cols-2 gap-4">
                <CustomGaugeChart {...JSON.parse(data.val1)} />
                <CustomGaugeChart {...JSON.parse(data.val2)} />
                <CustomGaugeChart {...JSON.parse(data.val3)} />
                <CustomGaugeChart {...JSON.parse(data.val4)} />
                <CustomGaugeChart {...JSON.parse(data.val5)} />
                <CustomGaugeChart {...JSON.parse(data.val6)} />
                <CustomGaugeChart {...JSON.parse(data.val7)} />
                <CustomGaugeChart {...JSON.parse(data.val8)} />
                <CustomGaugeChart {...JSON.parse(data.val9)} />
                <CustomGaugeChart {...JSON.parse(data.val10)} />
                <CustomGaugeChart {...JSON.parse(data.val11)} />
                <CustomGaugeChart {...JSON.parse(data.val12)} />
                <CustomGaugeChart {...JSON.parse(data.val13)} />
                <CustomGaugeChart {...JSON.parse(data.val14)} />
                <CustomGaugeChart {...JSON.parse(data.val15)} />
                <CustomGaugeChart {...JSON.parse(data.val16)} />
                <CustomGaugeChart {...JSON.parse(data.val17)} />
                <CustomGaugeChart {...JSON.parse(data.val18)} />
                <CustomGaugeChart {...JSON.parse(data.val19)} />
                <CustomGaugeChart {...JSON.parse(data.val20)} />
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>}
      {data.identifier === "Loading..." && 
      <div className="w-full h-[300px] flex flex-col justify-center items-center">
      <FadeLoader color="#000000" />
      <p className="text-md mt-2">...در حال بارگیری</p>
      </div>
      }
    </div>
  );
};

export default UserDevice;
