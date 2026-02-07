import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const APIURL = `https://dummyjson.com/products`;

export const fetchFurnitures = createAsyncThunk('furnitures/fetchFurniture', async () => {
    const res = await axios.get(`${APIURL}`);
    return res.data.products;
});

const furnitureSlice = createSlice({

    name: 'furnitures',

    initialState:{
        items: [],
        loading: false,
        error: null
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchFurnitures.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchFurnitures.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        })
        .addCase(fetchFurnitures.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }

});

export default furnitureSlice.reducer;