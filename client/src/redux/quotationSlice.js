import { apiSlice } from "./apiSlice";

export const quotationSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createQuotation: builder.mutation({
      query: (data) => ({
        url: "/api/quotation/create",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateQuotationMutation } = quotationSlice;
