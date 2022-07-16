import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
    name: "list",
    initialState: {
        list: [],
    },
    reducers: {
        addList: (state, action) => {
            state.list.push(action.payload);
        },
        deleteList: (state, action) => {
            const arrIds = action.payload;
            state.list = state.list.filter((_, index) => !arrIds.includes(index));
        }
    }
});

export const { addList, deleteList } = dataSlice.actions;

export default dataSlice.reducer;