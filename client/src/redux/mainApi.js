import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const mainApi = createApi({
    reducerPath: 'mainApi',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    tagTypes: ['RandomForm'],
    endpoints: (builder) => ({
        registerForm: builder.mutation({
            query: (body) => ({
                url: `/api/newform`,
                method: 'POST',
                body: body,
            }),
        }),
        getForms: builder.query({
            query: (params) => ({
                url: `/api/admin/getforms?pwd=${params.pwd}&perPage=${params.perPage}&page=${params.page}&formStatus=${params.formStatus}`,
            }),
        }),
        deleteForm: builder.mutation({
            query: (body) => ({
                url: `/api/admin/form`,
                method: 'DELETE',
                body: body,
            }),
        }),
        getRandomForm: builder.query({
            query: (pwd) => ({
                url: `/api/randomnumber?pwd=${pwd}`,
            }),
            keepUnusedDataFor: 0,
            providesTags: ['RandomForm'],
        }),
        approveForm: builder.mutation({
            query: (body) => ({
                url: `/api/admin/form/approve`,
                method: 'PATCH',
                body: body,
            }),
        }),
        getConsentLogs: builder.query({
            query: (params) => ({
                url: `/api/admin/consent-logs?pwd=${params.pwd}&perPage=${params.perPage}&page=${params.page}`,
            }),
        }),
    }),
})

export const {
    useRegisterFormMutation,
    useLazyGetFormsQuery,
    useDeleteFormMutation,
    useGetRandomFormQuery,
    useApproveFormMutation,
    useLazyGetConsentLogsQuery,
} = mainApi
