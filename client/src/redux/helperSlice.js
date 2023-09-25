import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  quotationDetails: {
    generalDetails: {},
    billToDetails: {},
    shipDetails: null,
    shipToDetails: [],
    edit: false,
  },
};

const helperSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    removeCredentials: (state) => {
      state.user = null;
      localStorage.clear();
    },

    setQuotationDetails: (state, action) => {
      const { name, data } = action.payload;
      if (name === "shipDetails" || name === "Add Ship To") {
        state.quotationDetails.shipToDetails.push(data);
      }
      state.quotationDetails[name] = data;
    },
    editQuotationDetails: (state, action) => {
      state.quotationDetails.edit = !state.quotationDetails.edit;
    },
  },
});

export const {
  setCredentials,
  removeCredentials,
  setQuotationDetails,
  editQuotationDetails,
} = helperSlice.actions;

export default helperSlice.reducer;
