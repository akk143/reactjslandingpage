import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASEURL = `https://reactjsexpress-sg40.onrender.com/api/contacts`;

export const fetchTestimonials = createAsyncThunk('contacts/testimonials', async () => {
    const res = await axios.get(`${BASEURL}/testimonials`);
    return res.data;
});

const testimonials = createSlice({

    name: 'testimonials',

    initialState:{
        datas: [],
        loading: false,
        error: null
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchTestimonials.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchTestimonials.fulfilled, (state, action) => {
            state.loading = false;
            state.datas = action.payload;
        })
        .addCase(fetchTestimonials.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }

});

export default testimonials.reducer;