"use server";
import GetToken from "@/app/auth/getToken";
interface User {
  id: string
  apiPath: string
 type: string

}

interface Device {
 id: string
 apiPath: string
 type: string
}

const GetUserOrDeviceAction = async (value: User | Device) => {
  const userToken = await GetToken();
  console.log("token: ", userToken);
  const result = await fetch(`${process.env.API_ENDPOINT}/${value.apiPath}/${value.id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-type": "application/json",
    },
  });
  console.log(result);
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
  if (result.status === 404) {
    // clear token
    return { status: "error", message: `${value.type} مورد نظر یافت نشد` };
  }
  if (result.ok) {
    const response = await result.json();
    if (response.id) {
      return response
    }
    return {
      status: "error",
      message: "خطایی رخ داده لطفا در زمانی دیگر مجددا تلاش کنید",
    };
  } else {
    return {
      status: "error",
      message: "خطایی رخ داده لطفا در زمانی دیگر مجددا تلاش کنید",
    };
  }
};

export default GetUserOrDeviceAction;
