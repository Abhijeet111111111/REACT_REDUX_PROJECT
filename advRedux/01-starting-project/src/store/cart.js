import {createSlice} from "@reduxjs/toolkit";

const cartState = {products :[{
        title:'Test',
        price:6,
        quantity : 1,
        id : "p1"
}],
    totalQuantity : 1,
    changed : false,
}

const cartSlice = createSlice({
    name :'cart',
    initialState:cartState,
    reducers:{
        addToCart(state,action){
            state.changed = true;
            const existingItem = state.products.find(product => product.id === action.payload.id);
            state.totalQuantity++;
            if(existingItem){
                existingItem.quantity ++;
                return ;
            }
            state.products.push(action.payload);
        },
        updateCart(state,action){
            state.changed = true;
            const item = state.products.find(product => product.id === action.payload.id);
            const itemIndex = state.products.indexOf(item);
            item.quantity += action.payload.change;
            state.totalQuantity += action.payload.change;
            if(item.quantity === 0){
                state.products = state.products.filter(product => product.id !== action.payload.id);
                return ;
            }
            state.products[itemIndex] = item;
        },
        replaceCart(state,action){
            state.products = action.payload.products;
            state.totalQuantity = action.payload.totalQuantity;
        }
    }
})

export const cartActions = cartSlice.actions;
export default cartSlice