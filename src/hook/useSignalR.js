import { useState, useEffect } from "react";
import GetToken from "@/app/auth/getToken";
import * as signalR from "@microsoft/signalr";

const url = `${process.env.WEBSOCKET_ENDPOINT}`;

const useSignalR = (onDeviceUpdated) => {
  const [connection, setConnection] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");

  useEffect(() => {
    const createConnection = async () => {
      const token = await GetToken();
      const connection = new signalR.HubConnectionBuilder()
        .withUrl(url, {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets,
          accessTokenFactory: () => token,
        })
        .withAutomaticReconnect()
        .build();

      connection.on("OnDeviceUpdated", (param) => {
        onDeviceUpdated(param);
      });

      connection.start()
        .then(() => {
          console.log("Connected");
          console.log("Connection ID: " + connection.connectionId);
          setConnectionStatus("connected");
        })
        .catch((err) => {
          console.error("There was an error opening the connection:", err);
        });

      setConnection(connection);
    };

    createConnection();
  }, []);

  // useEffect(() => {
  //   if (connection && connectionStatus === "connected") {
  //     return () => {
  //       connection.stop();
  //       setConnection(null);
  //       setConnectionStatus("disconnected");
  //     };
  //   }
  // }, [connection, connectionStatus]);

  return connection;
};

export default useSignalR;