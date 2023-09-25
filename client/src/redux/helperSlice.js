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
    edit: true,
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
    setBillDetails: (state, action) => {
      state.billDetails = action.payload;
    },
    setQuotationDetails: (state, action) => {
      const { name, data, id } = action.payload;
      if (name === "shipDetails") {
        console.log(id);
        if (id >= 0) {
          console.log(state.quotationDetails.shipToDetails[id]);
          state.quotationDetails.shipToDetails[id] = data;
        } else {
          state.quotationDetails.shipToDetails.push(data);
        }
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
  setBillDetails,
  setQuotationDetails,
  editQuotationDetails,
} = helperSlice.actions;

export default helperSlice.reducer;
