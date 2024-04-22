"use server";

import { cookies } from 'next/headers'

const isLogin = async() => {

    const validateToken = async(token: string) => {
        const result = await fetch(`${process.env.API_ENDPOINT}/users`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
              }
        })      

        if(result.status === 401){
            cookies().delete('token');
            cookies().delete('expireDateUtc')
            return ''
        }else if(result.ok) {
            const response = await result.json();
            if(response.id){
                return token
            }
        }
        return ''
    }
    const cookieStore = cookies()
    const token = cookieStore.get('token')
    const expireDateUtc = cookieStore.get('expireDateUtc')
    

  let isLoggedIn = true
  if (!token ||!expireDateUtc) {
    isLoggedIn= false 
    
  }else {
    const tokenValue = token?.value;
    const tokenIsValid = await validateToken(tokenValue);
    if(tokenIsValid === '') {
        cookies().delete('token')
    cookies().delete('expireDateUtc')
    return isLoggedIn
    }

    const now = new Date().toISOString();
const expireDateUtcValue = expireDateUtc?.value;
  if (expireDateUtc && now > expireDateUtcValue) {
    cookies().delete('token')
    cookies().delete('expireDateUtc')
    isLoggedIn= false 
  }
  }

  
  return isLoggedIn
}

export default isLogin