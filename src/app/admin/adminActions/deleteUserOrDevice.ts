"use server";
import GetToken from "@/app/auth/getToken";
interface Delete {
  id: string;
  apiPath: string;
  type: string;
}

const DeleteUserOrDeviceAction = async (value: Delete) => {
  const userToken = await GetToken();
  console.log("token: ", userToken);
  const result = await fetch(
    `${process.env.API_ENDPOINT}/${value.apiPath}/${value.id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );
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
      return { status: "success", message: `${value.type} با موفقیت حذف شد` };
    }
    const response = await result.json();
    if (response.message) {
      return { status: "error", message: response.message as string };
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

export default DeleteUserOrDeviceAction;
