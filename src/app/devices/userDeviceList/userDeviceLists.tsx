"use client"
import GetToken from "@/app/auth/getToken";
import { Devices, columns } from "./columns";
import { DataTable } from "@/components/admin/tableData/data-table";
import useSignalR from "@/hook/useSignalR";
import { useEffect, useState } from "react";

async function getData(): Promise<any[]> {
  // Fetch data from your API here.
  const userToken = await GetToken();
  const result = await fetch(
    `${process.env.API_ENDPOINT}/device/user-devices`,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  if (result.ok) {
    const response = await result.json();
    console.log("check ",response)
    if (response.items) {
      const modifiedData = response.items.map((obj) => ({
        id: obj.id,
        identifier: obj.identifier,
        setting: obj.setting,
        belongToUsername: obj.belongToUsername,

        whetherHumidityLimit: obj.whetherHumidityLimit,
        whetherTemperatureLimit: obj.whetherTemperatureLimit,
        soilHumidityLimit: obj.soilHumidityLimit,
        lightBrightnessLimit: obj.lightBrightnessLimit,

        whetherTemperature: obj.whetherTemperature,
        whetherHumidity: obj.whetherHumidity,
        soilHumidity: obj.soilHumidity,
        lightBrightness: obj.lightBrightness,

        isSync: obj.isSync,
        switch1: obj.switch1,
        switch2: obj.switch2,
        switch3: obj.switch3,
        switch4: obj.switch4,
        fanSwitchOnAt: obj.fanSwitchOnAt,
        fanSwitchOffAt: obj.fanSwitchOffAt,
        waterSwitchOffAt: obj.waterSwitchOffAt,
      }));

      return modifiedData;
    }
  }
  return [];
}

export default function UserDeviceList() {
  const [data,setData] = useState<Devices[]>([])
  useEffect(() => {
    const devices =async () => {
      const data: any = await getData();
      setData(data)
    }
    devices()
  },[])
  const connection = useSignalR((updatedData: any) => {
    setData((prevDevices) =>
      prevDevices.map((device) =>
        device.id === updatedData.id ? updatedData : device
      )
    );
  });

  return (
    <div className="container mx-auto py-10">
      <DataTable searchOption="identifier" columns={columns} data={data} />
    </div>
  );
}
