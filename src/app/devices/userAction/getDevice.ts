

import GetToken from "@/app/auth/getToken";

const GetDevice = async (id:string) => {
  console.log('id: ', id)
    const userToken = await GetToken();
    const result = await fetch(
      `${process.env.API_ENDPOINT}/device/get-device/${id}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    console.log('here', result)
    if (result.status === 401) {
        // clear token
        return {
          status: "error",
          message: "توکن شما نامعتبر است لطف مجددا وارد حساب خود شوید",
        };
      }
      if (result.status === 403) {
        // clear token
        return { status: "error", message: "شما دسترسی این کار را ندارید" };
      }
      if (result.ok) {
        
        const response = await result.json();
        if (response.message) {
          return { status: "error", message: response.message as string };
        }
        if(response.id){
            return response;
        }
        return {
          status: "error",
          message: "خطایی رخ داده لطفا در زمانی دیگر مجددا تلاش کنید1",
        };
      } else {
        return {
          status: "error",
          message: "خطایی رخ داده لطفا در زمانی دیگر مجددا تلاش کنید",
        };
      }

    
  };

  export default GetDevice