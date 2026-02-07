import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASEURL = `http://localhost:5002/api/todos`;


export const fetchtodos = createAsyncThunk('todos/fetchtodos', async (obj, { rejectWithValue }) => {

    try{
        const res = await axios.get(BASEURL);
        console.log(res);
        return res.data;
    }catch(err){
        return rejectWithValue("Something Went Wrong!!", err);
    }

});

// Add New Todo
export const addtodo = createAsyncThunk('todos/addtodo', async (title, { rejectWithValue }) => {

    try{
        const res = await axios.post(BASEURL, { title });
        console.log(title);
        console.log(res);
        return res.data;
    }catch(err){
        return rejectWithValue(err.response?.todos || "Something Went Wrong!!");
    }

});

// Update Todo
export const updatetodo = createAsyncThunk('todos/updatetodo', async (obj, { rejectWithValue }) => {

    try{
        const res = await axios.put(`${BASEURL}/${obj.id}`, obj);
        console.log(res.data);
        return res.data;
    }catch(err){
        return rejectWithValue("Something Went Wrong!!", err);
    }

});

// Delete Todo
export const deletetodo = createAsyncThunk('todos/deletetodo', async (id, { rejectWithValue }) => {

    try{
        await axios.delete(`${BASEURL}/${id}`);
        console.log(id);
        return id;
    }catch(err){
        return rejectWithValue("Something Went Wrong!!", err);
    }

});

export const todoSlice = createSlice({

    name: 'todos',
    
    initialState: {
        todos: [],
        loading: false,
        error: null
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchtodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchtodos.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.todos = action.payload;
            })
            .addCase(fetchtodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addtodo.fulfilled, (state, action) => {
                state.todos.push(action.payload);
            })
            .addCase(updatetodo.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;

                const index = state.todos.findIndex(todo => todo.id === action.payload.id);
                if(index !== -1) {
                    state.todos[index] = action.payload;
                }

            })
            .addCase(deletetodo.fulfilled, (state, action) => {
                state.todos = state.todos.filter(todo => todo.id !== action.payload);
            })
    }

})


export default todoSlice.reducer;