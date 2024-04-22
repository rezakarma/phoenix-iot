"use server";
import GetToken from "@/app/auth/getToken";
interface User {
  data: { username: string; password: string };
  apiPath: string
 type: string

}

interface Device {
 data: { identifier: string }
 apiPath: string
 type: string
}

const AddUserOrDeviceAction = async (value: User | Device) => {
  const userToken = await GetToken();
  console.log("token: ", userToken);
  const result = await fetch(`${process.env.API_ENDPOINT}/${value.apiPath}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(value.data),
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
  if (result.ok) {
    if (result.status === 204) {
      return { status: "success", message: `${value.type} با موفقیت اضافه شد` };
    }
    const response = await result.json();
    if (response.message) {
      return { status: "error", message: response.message as string };
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

export default AddUserOrDeviceAction;
