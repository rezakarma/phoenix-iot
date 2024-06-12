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
import useSignalR from "@/hook/useSignalR";

const UserDevice = ({ value }) => {
  const [data, setData] = useState({
    id: "",
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
    // fanSwitchOnAt: 26,
    // fanSwitchOffAt: 30,
    // waterSwitchOffAt: 70,
    // startWorkAt: "21:31:28.4140000",
    // endWorkAt: "21:34:00.4140000",
    whetherHumidityLimit: 0,
    whetherTemperatureLimit: 0,
    soilHumidityLimit: 0,
    lightBrightnessLimit: 0,
    relay1StartWorkAt: "08:00:00",
    relay1EndWorkAt: "12:00:00",
    relay2StartWorkAt: "08:00:00",
    relay2EndWorkAt: "12:00:00",
    relay3StartWorkAt: "08:00:00",
    relay3EndWorkAt: "12:00:00",
    relay4StartWorkAt: "08:00:00",
    relay4EndWorkAt: "12:00:00",

    belongToUsername: null,
    whetherTemperature: "29.30",
    whetherHumidity: "51.00",
    soilHumidity: "10",

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
  const [gageValues, setGageValues] = useState({
    id: "",
    isSync: false,
    setting: "Loading...",
    identifier: "Loading...",
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
  });

  useEffect(() => {
    console.log(data);
  }, [data]);
  useEffect(() => {
    const test = async () => {
      const data = await value();
      console.log("heree: ", data);
      setData(data);
      setGageValues({
        id: data.id,
        identifier: data.identifier,
        isSync: data.isSync,
        setting: data.setting,
        val1: data.val1,
        val2: data.val2,
        val3: data.val3,
        val4: data.val4,
        val5: data.val5,
        val6: data.val6,
        val7: data.val7,
        val8: data.val8,
        val9: data.val9,
        val10: data.val10,
        val11: data.val11,
        val12: data.val2,
        val13: data.val3,
        val14: data.val4,
        val15: data.val5,
        val16: data.val6,
        val17: data.val17,
        val18: data.val18,
        val19: data.val19,
        val20: data.val20,
      });
    };
    test();
  }, []);
  const connection = useSignalR((updatedData) => {
    setGageValues((prevDevices) =>
      prevDevices.id === updatedData.id ? updatedData : prevDevices
    );
  });
  return (
    <div className="flex flex-col w-full h-full overflow-y-auto gap-5 manual ltr">
      <div className="w-full flex gap-2 justify-end">
        <Badge className="p-2 font-semibold">id: {gageValues.identifier}</Badge>
        <Badge>sync: {gageValues.isSync.toString()}</Badge>
        <Badge>mode: {gageValues.setting}</Badge>
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
      {data.identifier !== "Loading..." && (
        <div>
          <Tabs defaultValue="Manual" className="w-[100%]">
            <TabsList>
              <TabsTrigger value="Manual">دستی</TabsTrigger>
              <TabsTrigger value="Sensor">سنسور</TabsTrigger>
              <TabsTrigger value="Timer">تایمر</TabsTrigger>
              <TabsTrigger value="Values">مقادیر</TabsTrigger>
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
                  whetherHumidityLimit: data.whetherHumidityLimit,
                  whetherTemperatureLimit: data.whetherTemperatureLimit,
                  soilHumidityLimit: data.soilHumidityLimit,
                  lightBrightnessLimit: data.lightBrightnessLimit,
                }}
              />
            </TabsContent>
            <TabsContent value="Timer">
              <Timer
                value={{
                  identifier: data.identifier,
                  relay1StartWorkAt: data.relay1StartWorkAt,
                  relay1EndWorkAt: data.relay1EndWorkAt,
                  relay2StartWorkAt: data.relay2StartWorkAt,
                  relay2EndWorkAt: data.relay2EndWorkAt,
                  relay3StartWorkAt: data.relay3StartWorkAt,
                  relay3EndWorkAt: data.relay3EndWorkAt,
                  relay4StartWorkAt: data.relay4StartWorkAt,
                  relay4EndWorkAt: data.relay4EndWorkAt,
                }}
              />
            </TabsContent>
            <TabsContent value="Values">
              <ScrollArea className="h-[500px] w-full rounded-md border p-4 ">
                <div className="grid grid-cols-2 gap-4">
                  {/* <CustomGaugeChart {...JSON.parse(gageValues.val1)} />
                <CustomGaugeChart {...JSON.parse(gageValues.val2)} />
                <CustomGaugeChart {...JSON.parse(gageValues.val3)} />
                <CustomGaugeChart {...JSON.parse(gageValues.val4)} />
                <CustomGaugeChart {...JSON.parse(gageValues.val5)} />
                <CustomGaugeChart {...JSON.parse(gageValues.val6)} />
                <CustomGaugeChart {...JSON.parse(gageValues.val7)} />
                <CustomGaugeChart {...JSON.parse(gageValues.val8)} />
                <CustomGaugeChart {...JSON.parse(gageValues.val9)} />
                <CustomGaugeChart {...JSON.parse(gageValues.val10)} />
                <CustomGaugeChart {...JSON.parse(gageValues.val11)} />
                <CustomGaugeChart {...JSON.parse(gageValues.val12)} />
                <CustomGaugeChart {...JSON.parse(gageValues.val13)} />
                <CustomGaugeChart {...JSON.parse(gageValues.val14)} />
                <CustomGaugeChart {...JSON.parse(gageValues.val15)} />
                <CustomGaugeChart {...JSON.parse(gageValues.val16)} />
                <CustomGaugeChart {...JSON.parse(gageValues.val17)} />
                <CustomGaugeChart {...JSON.parse(gageValues.val18)} />
                <CustomGaugeChart {...JSON.parse(gageValues.val19)} />
                <CustomGaugeChart {...JSON.parse(gageValues.val20)} /> */}

                  {gageValues.val1 !== null && (
                    <CustomGaugeChart {...JSON.parse(gageValues.val1)} />
                  )}
                  {gageValues.val2 !== null && (
                    <CustomGaugeChart {...JSON.parse(gageValues.val2)} />
                  )}

                  {gageValues.val3 !== null && (
                    <CustomGaugeChart {...JSON.parse(gageValues.val3)} />
                  )}
                  {gageValues.val4 !== null && (
                    <CustomGaugeChart {...JSON.parse(gageValues.val4)} />
                  )}
                  {gageValues.val5 !== null && (
                    <CustomGaugeChart {...JSON.parse(gageValues.val5)} />
                  )}
                  {gageValues.val6 !== null && (
                    <CustomGaugeChart {...JSON.parse(gageValues.val6)} />
                  )}
                  {gageValues.val7 !== null && (
                    <CustomGaugeChart {...JSON.parse(gageValues.val7)} />
                  )}
                  {gageValues.val8 !== null && (
                    <CustomGaugeChart {...JSON.parse(gageValues.val8)} />
                  )}
                  {gageValues.val9 !== null && (
                    <CustomGaugeChart {...JSON.parse(gageValues.val9)} />
                  )}
                  {gageValues.val10 !== null && (
                    <CustomGaugeChart {...JSON.parse(gageValues.val10)} />
                  )}
                  {gageValues.val11 !== null && (
                    <CustomGaugeChart {...JSON.parse(gageValues.val11)} />
                  )}
                  {gageValues.val12 !== null && (
                    <CustomGaugeChart {...JSON.parse(gageValues.val12)} />
                  )}
                  {gageValues.val13 !== null && (
                    <CustomGaugeChart {...JSON.parse(gageValues.val13)} />
                  )}
                  {gageValues.val14 !== null && (
                    <CustomGaugeChart {...JSON.parse(gageValues.val14)} />
                  )}
                  {gageValues.val15 !== null && (
                    <CustomGaugeChart {...JSON.parse(gageValues.val15)} />
                  )}
                  {gageValues.val16 !== null && (
                    <CustomGaugeChart {...JSON.parse(gageValues.val16)} />
                  )}
                  {gageValues.val17 !== null && (
                    <CustomGaugeChart {...JSON.parse(gageValues.val17)} />
                  )}
                  {gageValues.val18 !== null && (
                    <CustomGaugeChart {...JSON.parse(gageValues.val18)} />
                  )}
                  {gageValues.val19 !== null && (
                    <CustomGaugeChart {...JSON.parse(gageValues.val19)} />
                  )}
                  {gageValues.val20 !== null && (
                    <CustomGaugeChart {...JSON.parse(gageValues.val20)} />
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      )}
      {data.identifier === "Loading..." && (
        <div className="w-full h-[300px] flex flex-col justify-center items-center">
          <FadeLoader color="#000000" />
          <p className="text-md mt-2">...در حال بارگیری</p>
        </div>
      )}
    </div>
  );
};

export default UserDevice;
