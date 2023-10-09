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
  }),
});

export const { useAddAdminValueMutation, useGetAdminValuesQuery } = adminSlice;
