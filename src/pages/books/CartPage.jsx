import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getImgUrl } from "../../utils/getImgUrl";
import { FaTrashAlt } from "react-icons/fa";
import { calculateSubTotal, clearCart, decreaseCart, deleteItem, increaseCart } from "../../redux/features/Cart/cartSlice";
import { useEffect } from "react";
const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotalAmount = useSelector((state)=>state.cart.cartTotalAmount)
  const dispatch = useDispatch()


  const handleIncrease = (item)=>{
    dispatch(increaseCart(item))
  }
  const handleDecrease = (item)=>{
    dispatch(decreaseCart(item))
  }

  const handleClearCart =()=>{
    dispatch(clearCart())
  }
  const handleDelete = (id)=>{
    dispatch(deleteItem(id))
  }
  useEffect(()=>{
    dispatch(calculateSubTotal())
  },[dispatch,cartItems])
// const handleCheckout = ()=>{
//     if(currentUser) navigate("/checkout")
//     if(!currentUser) navigate("/login")
//   }
  return (
    <section>
      <div className="w-full overflow-x-scroll md:overflow-x-hidden">
        <h1 className="font-semibold text-2xl">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <>
            <p className="my-4">Your cart is currently empty</p>
            <br />
            <div>
              <Link to="/#books" className="hover:text-secondary hover:text-lg">
                &larr; Continue Shopping
              </Link>
            </div>
          </>
        ) : (
          <>
            <table className="border-collapse w-full text-lg mt-4 text-secondary">
              <thead className="border-t-2 border-t-blue-400 border-b-2 border-blue-400">
                <tr className="border border-[#ccc] even:bg-[#eee]">
                  <th className="border border-gray-400 text-left align-top p-2">
                    s/n
                  </th>
                  <th className="border border-gray-400 text-left align-top p-2">
                    Product
                  </th>
                  <th className="border border-gray-400 text-left align-top p-2">
                    Price
                  </th>
                  <th className="border border-gray-400 text-left align-top p-2">
                    Quantity
                  </th>
                  <th className="border border-gray-400 text-left align-top p-2">
                    Total
                  </th>
                  <th className="border border-gray-400 text-left align-top p-2">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {cartItems.map((item, index) => {
                  const { _id, title, coverImage, newPrice, cartQuantity } =
                    item;
                  return (
                    <>
                      <tr key={_id} className="border border-[#ccc] even:bg-[#eee]">
                        <td className="text-left align-top p-2">{index + 1}</td>
                        <td className="text-left align-top p-2">
                          <p>
                            <b>{title}</b>
                          </p>
                          <img
                            src={getImgUrl(coverImage)}
                            alt={title}
                            width={100}
                          />
                        </td >
                        <td className="text-left align-top p-2">{newPrice}</td>
                        <td className="text-left align-top p-2">
                          <div className="flex items-center gap-1">
                            <button
                            onClick={()=>handleDecrease(item)} 
                            className="w-4 h-4 hover:w-5 hover:h-5 transition-all duration-300 bg-gray-300 rounded flex justify-center items-center">-</button>
                            <p>
                              <b>{cartQuantity}</b>
                            </p>
                            <button
                            onClick={()=>handleIncrease(item)}
                             className="w-4 h-4 hover:w-5 hover:h-5 transition-all duration-300 bg-gray-300 rounded flex justify-center items-center">+</button>
                          </div>
                        </td>
                        <td className="text-left align-top p-2">{(newPrice * cartQuantity).toFixed(2)}</td>
                        <td
                        onClick={()=>handleDelete(_id)}
                         className="text-left align-top p-2 cursor-pointer">
                          <FaTrashAlt size={19} color="red" />
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
            <div className="flex items-center justify-between mt-5">
                <button
                onClick={handleClearCart}
                 className="py-2 px-4 bg-primary rounded font-semibold">Clear Cart</button>
              <Link
                to="/#books"
                className="hover:text-secondary hover:text-lg transition-all duration-200"
              >
                &larr; Continue Shopping
              </Link>
            </div>
            <div className="border mt-6 shadow-md bg-white space-y-3 p-4">
            <h1>Cart Items (s): {cartItems.length}</h1>
            <div className="flex justify-between">
                <h1 className="text-secondary font-semibold text-xl">SubTotal:</h1>
                <p className="text-secondary">${cartTotalAmount.toFixed(2)}</p>
            </div>
            <p className="text-sm text-gray-400">Taxes and shipping calculated at checkout</p>
            <Link 
             to='/checkout'
            // onClick={handleCheckout}
            >
            <button className="bg-primary text-secondary w-full py-2 font-bold rounded  hover:bg-yellow-300 transition-all duration-300">CheckOut</button>
            </Link>
          </div>
          </>
        )}
        
      </div>
    </section>
  );
};

export default CartPage;
