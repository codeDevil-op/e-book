import { useState } from "react"
import BookCard from "../books/BookCard"

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";


const categories = ["Choose a genre", "Business","Fiction","Horror","Adventure"]
const TopSellers = () => {

    
    const [selectedCategory,setSelectedCategory] = useState("Choose a genre")

    const {data: books = []} = useFetchAllBooksQuery()


    const filteredBooks = selectedCategory === "Choose a genre" ? books: books.filter(book => book.category === selectedCategory.toLowerCase())


    // while using query use curly {} braces 
    // while using mutation use angle <> braces 

    
    
  return (
    <div className="py-10">
        <h1 className="text-3xl font-semibold mb-6">Top Sellers</h1>
        {/* category filtering  */}
        <div  className="mb-8 flex items-center">
            <select 
            onChange={(e)=>setSelectedCategory(e.target.value)}
            className="border bg-[#eaeaea] border-red-300 rounded-md px-4 py-2 focus:outline-none cursor-pointer"
            name="category" 
            id="category">
                {
                    categories.map((category,index)=>(
                        <option key={index} value={category}>{category}</option>
                    ))
                }
            </select>
        </div>

        <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          // 768: {
          //   slidesPerView: 2,
          //   spaceBetween: 40,
          // },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1370: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination,Navigation]}
        className="mySwiper"
      >
        
        {
           filteredBooks.length > 0 && filteredBooks.map((book,index)=>(
                <SwiperSlide 
                 key={index}><BookCard book = {book}/></SwiperSlide>
            ))
        }

      </Swiper>

    </div>
  )
}

export default TopSellers