import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  HiMiniBars3CenterLeft,
  HiOutlineHeart,
  HiOutlineShoppingCart,
  HiOutlineUser,
} from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import avatar from "../assets/avatar.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cartpage" },
  { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const { currentUser, logoutUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logout Successfully!")
      setIsDropDownOpen(false)
    } catch (error) {
      console.log(error);
      toast.error("Error while Logout");
    }
  };
  return (
    <header className="max-w-screen-2xl m-auto px-10 py-6">
      <nav className="flex justify-between items-center">
        {/* left side  */}
        <div className="flex items-center md:gap-10 gap-4">
          <Link to="/">
            <HiMiniBars3CenterLeft className="size-6" />
          </Link>

          {/* search input  */}
          <div className="relative sm:w-72 w-40 space-x-2">
            <IoSearchOutline className="absolute inline-block left-3 inset-y-2" />
            <input
              type="text"
              placeholder="Search here"
              className="bg-[#eaeaea] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none "
            />
          </div>
        </div>

        {/* Right side  */}
        <div className="relative flex items-center md:space-x-3 space-x-2">
          <div>
            {currentUser ? (
              <>
                <button onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
                  <img
                    src={avatar}
                    alt="user login"
                    className={`size-7 rounded-full ${
                      currentUser ? "ring-2 ring-blue-500" : ""
                    }`}
                  />
                </button>
                {/* show dropdown  */}
                {isDropDownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40 transition-all duration-500">
                    <ul className="py-2">
                      {navigation.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => setIsDropDownOpen(false)}
                        >
                          <Link
                            to={item.href}
                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}

                      <li
                     
                      >
                        <button 
                         onClick={handleLogout}className="block px-4 py-2 w-full text-left text-sm hover:bg-gray-100">
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <HiOutlineUser className="size-6" />
              </Link>
            )}
          </div>

          <button>
            <HiOutlineHeart className="size-6 hidden sm:block" />
          </button>

          <Link
            to="/cart"
            className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-md"
          >
            <HiOutlineShoppingCart className="size-6" />
            {cartItems.length > 0 ? (
              <span className="text-sm font-semibold sm:ml-1">
                {cartItems.length}
              </span>
            ) : (
              <span className="text-sm font-semibold sm:ml-1">0</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
