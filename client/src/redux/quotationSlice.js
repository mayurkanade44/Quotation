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
  }),
});

export const {
  useCreateQuotationMutation,
  useAllQuotationQuery,
  useSingleQuotationQuery,
} = quotationSlice;
