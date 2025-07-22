import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const initialState = {
    cartItems:[],
    cartTotalAmount:0
}
const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const existintItem = state.cartItems.find(item => item._id===action.payload._id)
            if(!existintItem){
                const tempItem = {...action.payload,cartQuantity:1}
                console.log(tempItem)
                state.cartItems.push(tempItem)
                toast.success(`Book added to the cart`,{position:'top-center',autoClose:3000,theme:'light'})
            }else{
                toast.info(`${action.payload.title.slice(0,8)} already in the cart`,{position:'top-center',autoClose:3000,theme:'light'})
            }
        },
        increaseCart:(state,action)=>{
            const itemIndex = state.cartItems.findIndex(item => item._id===action.payload._id)
            if(state.cartItems[itemIndex].cartQuantity  >= 0){
                state.cartItems[itemIndex].cartQuantity +=1
                toast.success("Quantity Increased By One",{position:'top-center',autoClose:3000,theme:'light'})
            }
        },
        decreaseCart:(state,action)=>{
            const itemIndex = state.cartItems.findIndex(item => item._id===action.payload._id)
            if(state.cartItems[itemIndex].cartQuantity > 1){
                state.cartItems[itemIndex].cartQuantity -=1
                toast.info("Quantity Decreased By One",{position:'top-center',autoClose:3000,theme:'light'})
            }else if(state.cartItems[itemIndex].cartQuantity === 1){
                const remainingCartItems = state.cartItems.filter((item)=>item._id!==action.payload._id)
                state.cartItems = remainingCartItems
                toast.warning("Book Removed from the cart",{position:'top-center',autoClose:3000,theme:'light'})
            }
        },
        calculateSubTotal:(state)=>{
            const subTotal = []
            state.cartItems.map((item)=>{
                const {newPrice,cartQuantity} = item
               const cartItemAmount = newPrice * cartQuantity
                subTotal.push(cartItemAmount)
            })
            const totalAmount = subTotal.reduce((a,b)=>{
                return a + b;
            },0)
            state.cartTotalAmount = totalAmount
        },
        deleteItem:(state,action)=>{
            const remainingCartItems = state.cartItems.filter((item)=>item._id!==action.payload)
            state.cartItems = remainingCartItems
            console.log(action.payload)
            toast.success('Book removed from cart',{position:'top-center',autoClose:3000,theme:'light'})
        },
        clearCart:(state)=>{
            state.cartItems = []
            toast.warning("You removed all items",{position:'top-center',autoClose:3000,theme:'light'}) 
        }
    }
})

export const {addToCart,increaseCart,decreaseCart,calculateSubTotal,deleteItem,clearCart} = cartSlice.actions
export default cartSlice.reducer