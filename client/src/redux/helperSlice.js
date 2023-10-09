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
  },
  quotationEdit: {
    status: false,
    id: null,
    name: "",
  },
  adminValues: {},
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
      const { name, data, id } = action.payload;
      if (name === "shipDetails") {
        if (id >= 0) {
          state.quotationDetails.shipToDetails[id] = data;
        } else state.quotationDetails.shipToDetails.push(data);
      }
      state.quotationDetails[name] = data;
    },
    setQuotationEdit: (state, action) => {
      const { data, id, name } = action.payload;
      state.quotationEdit.status = true;
      state.quotationEdit.id = id;
      state.quotationEdit.name = name;
      state.quotationDetails[name] = data;
    },
    clearQuotationEdit: (state, action) => {
      state.quotationEdit.status = false;
      state.quotationEdit.id = null;
      state.quotationDetails = {
        generalDetails: {},
        billToDetails: {},
        shipDetails: null,
        shipToDetails: [],
      };
    },
    setAdminValues: (state, action) => {
      state.adminValues = action.payload.data;
    },
  },
});

export const {
  setCredentials,
  removeCredentials,
  setQuotationDetails,
  setQuotationEdit,
  clearQuotationEdit,
  setAdminValues,
} = helperSlice.actions;

export default helperSlice.reducer;
