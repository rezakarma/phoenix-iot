"use server"
import GetToken from "@/app/auth/getToken";

interface Value {
    userId: string,
    deviceId: string
}



const AssignUserToDeviceAction =async (value : Value) => {
    const userToken = await GetToken();
  console.log("token: ", userToken);
  const result = await fetch(`${process.env.API_ENDPOINT}/device/assign-device-to-user`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(value),
  });
  console.log('ijna ',result)
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
      return { status: "success", message: `کاربر با موفقیت به دستگاه متصل شد` };
    }
    const response = await result.json();
    if (response.message) {
      return { status: "error", message: response.message as string };
    }
    return {
      status: "error",
      message: "1خطایی رخ داده لطفا در زمانی دیگر مجددا تلاش کنید",
    };
  } else {
    console.log(result)
    return {
      status: "error",
      message: "2خطایی رخ داده لطفا در زمانی دیگر مجددا تلاش کنید",
    };
  }
}
 
export default AssignUserToDeviceAction;