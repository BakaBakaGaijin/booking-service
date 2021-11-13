import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'; // react

export const apiSlice = createApi({
    reducerPath: 'api', // optional
    baseQuery: fetchBaseQuery({ baseUrl: '/api'}),
    tagTypes: ['User'],
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            providesTags: ['User']
        }),
        editUser: builder.mutation({
            query: initialUser => ({
                url: '/users',
                method: 'POST',
                body: initialUser
            }),
            invalidatesTags: ['User']
        })
    })
})

export const {
    useGetUsersQuery,
    useEditUserMutation
} = apiSlice;