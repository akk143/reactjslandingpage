import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `https://dummyjson.com/users?limit=`;

export const fetchCustomers = createAsyncThunk('furnitures/fetchCustomer', async ({limit=24}={}) => {
    const { data } = await axios.get(`${API_URL} ${limit}`);
    // console.log(data);
    // console.log(data.users);

    const customers = data.users.map(user => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        company: `${user.company.name}`,
        title: `${user.company.title}`,
        city: `${user.address.city}`,
        avatar: `${user.image}`,
        review: "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text",
        favourite: false,
        rating: ( user.id % 5 ) + 1
    }));

    // console.log(customers);

    return customers;
});

const customerSlice = createSlice({

    name: 'customers',

    initialState:{
        items: [],
        loading: false,
        error: null
    },

    reducers: {
        toggleFavourite(state, action){
            const id = action.payload;
            const foundData = state.items.find(item => item.id === id);
            if(foundData) foundData.favourite = !foundData.favourite;
        }
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchCustomers.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchCustomers.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        })
        .addCase(fetchCustomers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to load customers';
        })
    }

});

export const { toggleFavourite } = customerSlice.actions;
export default customerSlice.reducer;