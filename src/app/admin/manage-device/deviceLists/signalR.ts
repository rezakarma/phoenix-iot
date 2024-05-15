   // signalRService.js
   import GetToken from '@/app/auth/getToken';
import * as signalR from '@microsoft/signalr';
   
   const url = "wss://phoenix.liara.run/hub/update-device-notification";

   let connection: any;

   const createConnection = async () => {
    const token = await GetToken();
    connection = new signalR.HubConnectionBuilder()
    .withUrl(url, {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets,
      accessTokenFactory: () => token,
    })
    .withAutomaticReconnect()
    .build();

  connection.on("OnDeviceUpdated", (param: any) => {

     return param
  });

  connection.start()
    .then(() => {
      console.log("Connected");
      console.log("Connection ID: " + connection.connectionId);
    })
    .catch((err) => {
      console.error("There was an error opening the connection:", err);
    });
    console.log("here : ", connection)
   };

   export { createConnection };
   
