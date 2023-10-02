import { apiSlice } from "./apiSlice";

export const quotationSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createQuotation: builder.mutation({
      query: (data) => ({
        url: "/api/quotation",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Quotation"],
    }),
    allQuotation: builder.query({
      query: ({ search }) => ({
        url: "/api/quotation",
        params: { search },
      }),
      providesTags: ["Quotation"],
      keepUnusedDataFor: 10,
    }),
    singleQuotation: builder.query({
      query: (id) => ({
        url: `/api/quotation/details/${id}`,
      }),
      providesTags: ["Quotation"],
      keepUnusedDataFor: 10,
    }),
    editQuotation: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/quotation/details/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Quotation"],
    }),
    reviseQuotation: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/quotation/details/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Quotation"],
    }),
    deleteQuotation: builder.mutation({
      query: ({ id }) => ({
        url: `/api/quotation/details/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quotation"],
    }),
  }),
});

export const {
  useCreateQuotationMutation,
  useAllQuotationQuery,
  useSingleQuotationQuery,
  useEditQuotationMutation,
  useReviseQuotationMutation,
  useDeleteQuotationMutation,
} = quotationSlice;
