// import GetToken from "@/app/auth/getToken";
// import { Devices, columns } from "./columns";
// import { DataTable } from "@/components/admin/tableData/data-table";
// import GetAllDevices from "../../adminActions/getAllDevices";

// async function getData(): Promise<any[]> {
//   // Fetch data from your API here.
//   const userToken = await GetToken();
//   const response =await GetAllDevices()

//     if (response.items) {

//         const modifiedData = response.items.map(obj => ({
//             id: obj.id,
//             identifier: obj.identifier,
//             setting: obj.setting,
//             belongToUsername: obj.belongToUsername,
//             temperature: obj.temperature,
//             humidity: obj.humidity,
//             isSync: obj.isSync
//           }));

//       return modifiedData;
//     }
//   return [];
// }

// export default async function DeviceList() {
//   const data = await getData();

//   return (
//     <div className="container mx-auto py-10">
//       <DataTable searchOption='identifier' columns={columns} data={data} />
//     </div>
//   );
// }

//

"use client";
import { Devices, columns } from "./columns";
import { DataTable } from "@/components/admin/tableData/data-table";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import GetToken from "@/app/auth/getToken";
import GetAllDevices from "../../adminActions/getAllDevices";
import { createConnection } from "./signalR";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import useSignalR from "@/hook/useSignalR";
import * as signalR from '@microsoft/signalr';

async function getData(): Promise<any[]> {
  // Fetch data from your API here.
  const userToken = await GetToken();
  const response =await GetAllDevices()

    if (response.items) {

        const modifiedData = response.items.map(obj => ({
            id: obj.id,
            identifier: obj.identifier,
            setting: obj.setting,
            belongToUsername: obj.belongToUsername,
            temperature: obj.temperature,
            humidity: obj.humidity,
            isSync: obj.isSync
          }));

      return modifiedData;
    }
  return [];
}



   
   const url = "wss://phoenix.liara.run/hub/update-device-notification";
const DeviceList = () => {
  const [data, setData] = useState<Devices[]>([]);

  const connection = useSignalR((updatedData) => {
    setData((prevDevices) =>
      prevDevices.map((device) =>
        device.id === updatedData.id ? updatedData : device
      )
    );
  });

  useEffect(() => {
    const devices =async () => {
      const data = await getData();
      setData(data)
    }
    devices()
  },[])


  // useEffect(() => {
  //   // const url = "wss://phoenix.liara.run/hub/update-device-notification";
  //   // let connection: any;
  //   const createConnection = async () => {
  //     const updatedData:any = await createConnection()
  //             setData((prevDevices) =>
  //         prevDevices.map((device) =>
  //           device.id === updatedData.id ? updatedData : device
  //         )
  //       );
  //   //   const token = await GetToken();
  //   //    connection = new signalR.HubConnectionBuilder()
  //   //      .withUrl(url, {
  //   //        skipNegotiation: true,
  //   //        transport: signalR.HttpTransportType.WebSockets,
  //   //        accessTokenFactory: () => token,
  //   //      })
  //   //      .withAutomaticReconnect()
  //   //      .build();
  
  //   //    connection.on("OnDeviceUpdated", (param) => {
        
  //   //   //    console.log("Received at: " + new Date());
  //   //     //  console.log(param);
  //   //      const paramArray = param
  //   //     //  const modifiedData = paramArray.map(obj => ({
  //   //     //               id: obj.id,
  //   //     //               identifier: obj.identifier,
  //   //     //               setting: obj.setting,
  //   //     //               belongToUsername: obj.belongToUsername,
  //   //     //               temperature: obj.temperature,
  //   //     //               humidity: obj.humidity,
  //   //     //               isSync: obj.isSync
  //   //     //             }));
  //   //     //             console.log(modifiedData)


  //   //     setData((prevDevices) =>
  //   //       prevDevices.map((device) =>
  //   //         device.id === param.id ? param : device
  //   //       )
  //   //     );
          
  //   //    });
  
  //   //    connection.start()
  //   //      .then(() => {
  //   //        console.log("Connected");
  //   //        console.log("Connection ID: " + connection.connectionId);
  //   //      })
  //   //      .catch((err) => {
  //   //        console.error("There was an error opening the connection:", err);
  //   //      });
  //   //      console.log("here : ", connection)
       
  //    };
  //    createConnection()
  // }, []);




  return (
    <div className="container mx-auto py-10">
      <DataTable searchOption="identifier" columns={columns} data={data} />
    </div>
  );
};

export default DeviceList;
