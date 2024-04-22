import GetToken from './getToken'

const GetUserSession = async () => {
    const userToken =await GetToken();
    console.log('token: ', userToken)
    if(userToken) {
        const result =await fetch(`${process.env.API_ENDPOINT}/users/user-data`, {
            headers : {  
                    'Authorization': `Bearer ${userToken}`
            }
        })

        if(result.status === 401) {
            return { message: 'کاربر وارد نشده است'}
        }

        if(result.status === 403) {
            return { message: 'کاربر دسترسی ندارد'}
        }

        if(result.ok) {
            const response = await result.json();
            if(response.id){
                return response
            }
        }

    } else {
        return { message: 'کاربر وارد نشده است'}
    }
}

export default GetUserSession;