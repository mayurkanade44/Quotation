import { apiSlice } from "./apiSlice";

export const quotationSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createQuotation: builder.mutation({
      query: (data) => ({
        url: "/api/quotation",
        method: "POST",
        body: data,
      }),
    }),
    allQuotation: builder.query({
      query: ({ search }) => ({
        url: "/api/quotation",
        params: { search },
      }),
    }),
  }),
});

export const { useCreateQuotationMutation, useAllQuotationQuery } =
  quotationSlice;
