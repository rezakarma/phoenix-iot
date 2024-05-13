"use server"

import GetToken from "@/app/auth/getToken";

const GetAllUsers = async () => {
    const userToken = await GetToken();
    const result = await fetch(
      `${process.env.API_ENDPOINT}/users/get-all-users`,
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
 
export default GetAllUsers;