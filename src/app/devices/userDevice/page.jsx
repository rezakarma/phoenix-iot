"use client";

import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Manual from "./manual";
import { useEffect, useState } from "react";
import Sensor from "./sensor";
import Timer from "./timer";

const UserDevice = ({ value }) => {
  const [data, setData] = useState({
    identifier: "",
    switch1: false,
    switch2: false,
    switch3: false,
    switch4: false,
    switch1Name: "loading",
    switch2Name: "loading",
    switch3Name: "loading",
    switch4Name: "loading",
    setting: "Manual",
    fanSwitchOnAt: 26,
    fanSwitchOffAt: 30,
    waterSwitchOffAt: 70,
    startWorkAt: "21:31:28.4140000",
    endWorkAt: "21:34:00.4140000",
    belongToUsername: null,
    temperature: "29.30",
    humidity: "51.00",
    val1: "val1[]",
    val2: "val2[]",
    val3: "val3[]",
    val4: "val4[]",
    val5: "val5[]",
    val6: "val6[]",
    val7: "val7[]",
    val8: "val8[]",
    val9: "val9[]",
    val10: "val10[]",
    val11: "val11[]",
    val12: "val12[]",
    val13: "val13[]",
    val14: "val14[]",
    val15: "val15[]",
    val16: "val16[]",
    val17: "val17[]",
    val18: "val18[]",
    val19: "val19[]",
    val20: "val20[]",
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
      <div>
        <Tabs defaultValue="Manual" className="w-[100%]">
          <TabsList>
            <TabsTrigger value="Manual">دستی</TabsTrigger>
            <TabsTrigger value="Sensor">سنسنور</TabsTrigger>
            <TabsTrigger value="Timer">تایمر</TabsTrigger>
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
        </Tabs>
      </div>
    </div>
  );
};

export default UserDevice;
