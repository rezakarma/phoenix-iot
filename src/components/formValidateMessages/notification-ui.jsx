"use client"
      

import SuccessForm from './formSuccess'
import ErrorForm from './formError'

const NotoficationUi = (props) => {

    return ( 
        // {props.notification.status === 'success' && <SuccessForm message={props.notification.message}/>}
        <>
        {
            props.notification.status === "success" && <SuccessForm message={props.notification.message}/>
        }
        {
            props.notification.status === "error" && <ErrorForm message={props.notification.message}/>
        }
        </>
     );
}
 
export default NotoficationUi;