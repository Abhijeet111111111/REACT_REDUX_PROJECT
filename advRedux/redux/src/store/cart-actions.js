import {toggleAction} from "./cartToggle";
import {cartActions} from "./cart";


export const fetchCartData = ()=>{
    return (dispatch) =>{
        const fetchData = async () =>{
            const response = await fetch(process.env.REACT_APP_FIRE_BASE_REALTIME_DATABASE_URL);
            if(!response.ok){
                throw  new Error('error occurred....');
            }
            return response.json();
        }
        fetchData()
            .then(data =>{
            dispatch(cartActions.replaceCart({...data,products : data.products ||  []}));
            })
            .catch(e =>{
                dispatch(toggleAction.setNotification({
                    status : 'error',
                    message : 'failed to send the data',
                    title : 'an Error occurred...'
                }))
            })
    }
}

export const sendCartData = (cart) =>{
    return async (dispatch) => {
        dispatch(toggleAction.setNotification({
            status : 'pending',
            message : 'sending your data to backend!',
            title : 'sending...'
        }))
        const  sendReq = async () =>{
            const response = await fetch(process.env.REACT_APP_FIRE_BASE_REALTIME_DATABASE_URL,{
                method : "PUT",
                headers:{
                    "Content-Type" : 'application/json',
                },
                body: JSON.stringify({
                    ...cart
                })
            })
            if(!response.ok){
                throw new Error("failed to send data to firebase...")
            }
            dispatch(toggleAction.setNotification({
                status : 'success',
                message : 'successfully sent your data!',
                title : 'successful!'
            }))
        }
        sendReq().catch(e => {
            dispatch(toggleAction.setNotification({
                status : 'error',
                message : 'failed to send the data',
                title : 'an Error occurred...'
            }))
        });

    }
}
