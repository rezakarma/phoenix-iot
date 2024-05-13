"use server"

import GetToken from "@/app/auth/getToken";

const GetAllDevices = async () => {
    const userToken = await GetToken();
  const result = await fetch(
    `${process.env.API_ENDPOINT}/device/all-devices`,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  if(result.ok){
    const response = await result.json()
    return response
  }

  return []

}
 
export default GetAllDevices;