import {configureStore} from "@reduxjs/toolkit";
import toggleSlice from "./cartToggle";
import cartSlice from "./cart";
const store = configureStore({
    reducer :{
        cartToggle : toggleSlice.reducer,
        cart : cartSlice.reducer
    }
})

export default store;