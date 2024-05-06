"use server";
import GetToken from "@/app/auth/getToken";
interface User {
  id: string;
}


const ToggleUserActivity = async (value: User) => {
  const userToken = await GetToken();
  console.log("token: ", userToken);
  const result = await fetch(
    `${process.env.API_ENDPOINT}/users/toggle-user-is-active/${value.id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-type": "application/json",
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
  if (result.status === 404) {
    // clear token
    return { status: "error", message: `${value.type} مورد نظر یافت نشد` };
  }
  if (result.ok) {
    if (result.status === 204) {
      return { status: "success", message: `کاربر با موفقیت بروز شد` };
    }
    const response = await result.json();
    if (response.message) {
      return { status: "error", message: response.message as string };
    }
    return { status: "success", message: `کاربر با موفقیت بروز شد` };
  } else {
    return {
      status: "error",
      message: "خطایی رخ داده لطفا در زمانی دیگر مجددا تلاش کنید",
    };
  }
};

export default ToggleUserActivity;
