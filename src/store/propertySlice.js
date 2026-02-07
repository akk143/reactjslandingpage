import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `https://dummyjson.com/products?limit=`;

export const fetchProperties = createAsyncThunk('property/fetchProperties', async ({limit=24}={}) => {
    
    const { data } = await axios.get(`${API_URL}${limit}`);
    // console.log(data);
    console.log(data.products);

    const cities = ['Yangon', 'Mandalay', 'Pyin Oo Lwin', 'Taungyi', 'Bago', 'Mawlamyine'];
    const statuses = ['For Sale', 'For Rent', 'Sold Out'];
    const bedLists = [1, 2, 3, 4, 5];
    const bathLists = [1, 2, 3];

    const properties = data.products.map((product, idx) => ({
        id: product.id,
        name: product.title,
        title: product.description,
        price: product.price,
        thumbnail: product.thumbnail || product.images?.[0],
        rating: product.rating,

        city: cities[idx % cities.length],
        status: statuses[idx % statuses.length],
        beds: bedLists[idx % bedLists.length],
        baths: bathLists[idx % bathLists.length],
        area: 600 + (idx % 10) * 100,
    }));
    ;

    // console.log(properties);

    return properties;

});

const propertySlice = createSlice({

    name: 'properties',

    initialState:{
        items: [],
        loading: false,
        error: null,

        filters: {
            query: '',
            city: 'all',
            status: 'all',
            minPrice: '',
            maxPrice: ''
        }
    },

    reducers: {
        setFilters(state, action){
            state.filters = {...state.filters, ...action.payload};
        },
        clearFilters(state){
            state.filters = {
                query: '',
                city: 'all',
                status: 'all',
                minPrice: '',
                maxPrice: '' 
            }
        }
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchProperties.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProperties.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        })
        .addCase(fetchProperties.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to load properties';
        })
    }

});

export const { setFilters, clearFilters } = propertySlice.actions;
export default propertySlice.reducer;