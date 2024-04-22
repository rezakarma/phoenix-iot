"use server";

import { cookies } from 'next/headers'


const login = async (value : {username: string , password: string}) => {
  const result = await fetch(`${process.env.API_ENDPOINT}/users/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(value),
  });
  if (result.ok) {
    const response = await result.json();
    if (response.message) {
      return {
        status: "error",
        message: response.message as string,
      };
    } else if (response.token) {
      
      const { token, expireDateUtc } = response;
      const expireDate = new Date(expireDateUtc);

      cookies().set("token", token,{expires: expireDate, secure: true , httpOnly: true});
      cookies().set("expireDateUtc", expireDateUtc , {expires: expireDate, secure: true , httpOnly: true});
      // Redirect to a protected route or refresh the page

      return {
        status: "success",
        message: "با موفقیت وارد شدید",
      };
    } else {
        return {
            status: "error",
            message: 'خطایی زخ داده است',
          };

    }
  

  }
  return {
    status: "error",
    message: 'خطایی زخ داده است',
  };
};

export default login;
