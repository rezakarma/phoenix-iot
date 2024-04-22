"use server";

import { cookies } from 'next/headers'

const ClearToken =() => {

   
            cookies().delete('token');
            cookies().delete('expireDateUtc')
            const hasToken = cookies().has("token");
            if(!hasToken) {
                return true
            }else {
                return false
            }
}

export default ClearToken