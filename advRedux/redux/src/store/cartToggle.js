import {createSlice} from '@reduxjs/toolkit'

const toggleState = {showCart : false,notification : null}

const toggleSlice = createSlice({
    name : 'toggle',
    initialState : toggleState,
    reducers:{
        Ontoggle(state){
            state.showCart = !state.showCart
        },
        setNotification(state,action){
            state.notification = {
                status : action.payload.status,
                title : action.payload.title,
                message : action.payload.message,
            }
        }

    }
})

export const toggleAction =  toggleSlice.actions
export default toggleSlice