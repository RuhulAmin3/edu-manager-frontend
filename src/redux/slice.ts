import { createSlice, PayloadAction } from "@reduxjs/toolkit";  
interface InitialStateType  {
    query:Record<string, unknown>
}

const initialState:InitialStateType = {
    query:{},
}

const initialSlice = createSlice({
  name: "defaultState",
  initialState: initialState,
  reducers: {
    setQuery: (
      state,
      action: PayloadAction<Record<string, unknown>>
    ) => {
      state.query = action.payload;
    },
    resetQuery: (state) => {
      state.query = {};
    },
  },
});

export const { setQuery, resetQuery } = initialSlice.actions;
export const defaultReducer = initialSlice.reducer;


