import { createApi ,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "../../types/api-types";
import { User } from "../../types/types";
const server = "http://localhost:4000";


export const userAPI = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({baseUrl: `${server}/api/v1/user/`}),
    endpoints: (builder) => ({
        login: builder.mutation<MessageResponse,User>({
            query: (user) =>({
                url: "new",
                method: "POST",
                body: user,
            })
        })
    })
})

export const { useLoginMutation} = userAPI;