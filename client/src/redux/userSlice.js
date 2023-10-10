import { apiSlice } from "./apiSlice";

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/api/user/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    allUser: builder.query({
      query: () => ({
        url: "/api/user",
      }),
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: ({ data, id }) => ({
        url: `/api/user/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    changePassword: builder.mutation({
      query: ({ data, id }) => ({
        url: `/api/user/passwordUpdate/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useAllUserQuery,
  useUpdateUserMutation,
  useChangePasswordMutation,
} = userSlice;
