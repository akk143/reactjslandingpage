import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASEURL = `http://localhost:5002/api/contacts`;

export const submitContactForm = createAsyncThunk('contactform/formsubmit', async (formData, { rejectWithValue }) => {
    try{
        const res = await axios.post(`${BASEURL}/formsubmit`, formData);
        return res.data;
    }catch(err){
        return rejectWithValue(err.response?.data?.error || "Something went wrong");
    }
});

const contactFormSubmit = createSlice({

    name: 'contactforms',

    initialState:{
        loading: false,
        error: null,
        success: null
    },

    reducers: {
        resetFormState: (state) =>{
            state.loading = false;
            state.error = null;
            state.success = null;
        }
    },

    extraReducers: (builder) => {
        builder
        .addCase(submitContactForm.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        })
        .addCase(submitContactForm.fulfilled, (state, action) => {
            state.loading = false;
            state.datas = action.payload;
            state.success = action.payload.message;
        })
        .addCase(submitContactForm.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            // state.error = action.error.message;
        })
    }

});

export const { resetFormState } = contactFormSubmit.actions;
export default contactFormSubmit.reducer;