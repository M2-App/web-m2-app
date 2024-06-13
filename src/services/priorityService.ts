import { Priority } from "../data/priority/priority";
import { CreatePriority, UpdatePriorityReq } from "../data/priority/priority.request";
import { apiSlice } from "./apiSlice";

export const priorityService = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPriorities: builder.mutation<Priority[], string>({
            query: (id) => `/priority/all/${id}`,
            transformResponse: (response: {data: Priority[]}) => response.data
        }),
        createPriority: builder.mutation<void, CreatePriority>({
            query: (priority) => ({
                url: '/priority/create',
                method: 'POST',
                body: {...priority}
            })
        }),
        getPriority: builder.mutation<Priority, string>({
            query: (id) => `/priority/one/${id}`,
            transformResponse: (response: {data: Priority}) => response.data
        }),
        updatePriority: builder.mutation<void, UpdatePriorityReq>({
            query: (priority) => ({
              url: '/priority/update',
              method: 'PUT',
              body: {...priority}
            })
          })
    })
})

export const {useGetPrioritiesMutation, useCreatePriorityMutation, useGetPriorityMutation, useUpdatePriorityMutation} = priorityService