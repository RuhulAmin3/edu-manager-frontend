import { createSlice, PayloadAction } from "@reduxjs/toolkit";  
interface InitialStateType  {
    query:Record<string, unknown>,
    modalName:string;
}

const initialState:InitialStateType = {
    query:{},
    modalName:"",
}

const initialSlice = createSlice({
  name: "defaultState",
  initialState: initialState,
  reducers: {

    // query actions
    setQuery: (
      state,
      action: PayloadAction<Record<string, unknown>>
    ) => {
      state.query = action.payload;
    },
    resetQuery: (state) => {
      state.query = {};
    },

    // modal actions
    setModalName: (
      state,
      action: PayloadAction<string>
    ) => {
      state.modalName = action.payload;
    },
    resetModalName: (state) => {
      state.modalName = "";
    },
  },
});

export const { setQuery, resetQuery, setModalName, resetModalName } = initialSlice.actions;
export const defaultReducer = initialSlice.reducer;


