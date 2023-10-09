import { apiSlice } from "./apiSlice";

export const adminSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAdminValue: builder.mutation({
      query: (data) => ({
        url: "/api/admin/value",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),
    getAdminValues: builder.query({
      query: () => ({
        url: "/api/admin/value",
      }),
      providesTags: ["Admin"],
    }),
    updateAdminValue: builder.mutation({
      query: ({ data, id }) => ({
        url: `/api/admin/value/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),
    deleteAdminValue: builder.mutation({
      query: ({ id }) => ({
        url: `/api/admin/value/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
});

export const {
  useAddAdminValueMutation,
  useGetAdminValuesQuery,
  useUpdateAdminValueMutation,
  useDeleteAdminValueMutation,
} = adminSlice;
