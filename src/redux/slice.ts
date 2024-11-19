import { createSlice, PayloadAction } from "@reduxjs/toolkit";  
interface InitialStateType  {
    query:Record<string, unknown>,
    modalName:string;
    editId:string;
}

const initialState:InitialStateType = {
    query:{},
    modalName:"",
    editId:"",
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
      state.query = { ...state.query,  ...action.payload};
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

    // set edit it globally
    setEditId:(state, action:PayloadAction<string>)=>{
      state.editId = action.payload;
    },

    resetEditId:(state)=>{
      state.editId = "";
    }
     
  },
});

export const { setQuery, resetQuery, setModalName, resetModalName, setEditId, resetEditId} = initialSlice.actions;
export const defaultReducer = initialSlice.reducer;


