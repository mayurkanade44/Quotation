import { apiSlice } from "./apiSlice";

export const adminSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAdminValue: builder.mutation({
      query: (data) => ({
        url: "/api/admin/value",
        method: "POST",
        body: data,
      }),
    }),
    getAdminValues: builder.query({
      query: () => ({
        url: "/api/admin/value",
      }),
    }),
    updateAdminValue: builder.mutation({
      query: ({ data, id }) => ({
        url: `/api/admin/value/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteAdminValue: builder.mutation({
      query: ({ id }) => ({
        url: `/api/admin/value/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddAdminValueMutation,
  useGetAdminValuesQuery,
  useUpdateAdminValueMutation,
  useDeleteAdminValueMutation,
} = adminSlice;
