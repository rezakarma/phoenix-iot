"use server"
import clearToken from '@/actions/clearToken'
import { cookies } from 'next/headers'
import Cookies from 'js-cookie';
const GetToken =async () => {
    const validateToken = async(token: string) => {
        
        const result = await fetch(`${process.env.API_ENDPOINT}/users/user-data`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
              }
        })   

        if(result.status === 401){
           Cookies.remove('token')
           Cookies.remove('expireDateUtc')
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

    let tokenResult = ''
    if (!token ||!expireDateUtc) {
        tokenResult = '' 
      
    }else {
      const tokenValue = token?.value;

      const tokenIsValid = await validateToken(tokenValue);
      if(tokenIsValid === '') {
        Cookies.remove('token')
           Cookies.remove('expireDateUtc')
          
           tokenResult  = ''
      }else {
        tokenResult = tokenValue
      }
  
      const now = new Date().toISOString();
  const expireDateUtcValue = expireDateUtc?.value;
    if (expireDateUtc && now > expireDateUtcValue) {
        Cookies.remove('token')
        Cookies.remove('expireDateUtc')
      tokenResult = ''
    }
    }
  
    
    return tokenResult

}

export default GetToken