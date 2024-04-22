'use server'
import { cookies } from 'next/headers'

const clearToken =async () => {
    cookies().delete('token');
    cookies().delete('expireDateUtc')
    return true
}

export default clearToken;