import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import baseUrl from "../../../utils/baseUrl.js";

const baseUrl = "http://localhost:5000"
const ordersApi = createApi({
    reducerPath: "ordersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}/api/orders`,
        credentials: 'include'
    }),
    tagTypes:['Orders'],
    endpoints:(builder)=>({
        createOrder: builder.mutation({
            query: (newOrder) =>({
                url: '/',
                method: "POST",
                body: newOrder,
                credentials: 'include'
            })
        })
    })
})

export const {useCreateOrderMutation} = ordersApi 

export default ordersApi