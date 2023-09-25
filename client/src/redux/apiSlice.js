import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { removeCredentials } from "./helperSlice";
import { toast } from "react-toastify";

const baseQuery = fetchBaseQuery({ baseUrl: "/" });
const authBaseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    toast.error("Unauthorized!! logged out");
    api.dispatch(removeCredentials());
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: authBaseQuery,
  tagTypes: ["User", "Quotation", "Contract"],
  endpoints: (builder) => ({}),
});
