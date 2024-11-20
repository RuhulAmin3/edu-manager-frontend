import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialStateType {
  query: Record<string, unknown>;
  modalName: string;
  editId: string;
  formInitialValues: Record<string, string>;
}

const initialState: InitialStateType = {
  query: {},
  modalName: "",
  editId: "",
  formInitialValues: {},
};

const initialSlice = createSlice({
  name: "defaultState",
  initialState: initialState,
  reducers: {

    // query actions
    setQuery: (state, action: PayloadAction<Record<string, unknown>>) => {
      state.query = { ...state.query, ...action.payload };
    },

    resetQuery: (state) => {
      state.query = {};
    },

    // modal actions
    setModalName: (state, action: PayloadAction<string>) => {
      state.modalName = action.payload;
    },
    
    resetModalName: (state) => {
      state.modalName = "";
    },

    // set edit it globally
    setEditId: (state, action: PayloadAction<string>) => {
      state.editId = action.payload;
    },

    resetEditId: (state) => {
      state.editId = "";
    },

    // form initial Value
    setFormInitialValues: (
      state,
      action: PayloadAction<Record<string, string>>
    ) => {
      state.formInitialValues = action.payload;
    },

    resetFormInitialValues: (state) => {
      state.formInitialValues = {};
    },
  },
});

export const {
  setQuery,
  resetQuery,
  setModalName,
  resetModalName,
  setEditId,
  resetEditId,
  setFormInitialValues, 
  resetFormInitialValues,
} = initialSlice.actions;
export const defaultReducer = initialSlice.reducer;
