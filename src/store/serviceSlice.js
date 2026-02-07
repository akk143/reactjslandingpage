import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Mock API Service
const mockDatas = [
    {
        "status": "success",
        "total": 6,
        "datas": [
            {
                "id": 1,
                "name": "Web Development",
                "category": "Technology",
                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text",
                "price": 5000,
                "duration": "4-6 weeks",
                "image": "https://blog.zegocloud.com/wp-content/uploads/2024/03/types-of-web-development-services.jpg",
                "features": [
                    "Responsive Design",
                    "SEO Optimized",
                    "Fast Loading",
                    "Cross-Browser"
                ],
                "rating": 4.5,
                "review": 124,
                "support": "6 months free support"
            },
            {
                "id": 2,
                "name": "Mobile App Development",
                "category": "Technology",
                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text",
                "price": 8000,
                "duration": "6-8 weeks",
                "image": "https://www.webtekdigital.com/wp-content/uploads/2024/10/1711974550479.jpeg",
                "features": [
                    "Native Performance",
                    "Offline Capability",
                    "Push Notifications"
                ],
                "rating": 3.4,
                "review": 89,
                "support": "10 months free support"
            },
            {
                "id": 3,
                "name": "UI/UX Design",
                "category": "Design",
                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text",
                "price": 3000,
                "duration": "2-3 weeks",
                "image": "https://admin.wac.co/uploads/Blog%20Media/ux_ui-01-3_5915c7e99f7fc2e0.jpg",
                "features": [
                    "User Research",
                    "Wireframing",
                    "Prototyping"
                ],
                "rating": 3.2,
                "review": 152,
                "support": "3 months free support"
            },
            {
                "id": 4,
                "name": "Digital Marketing",
                "category": "Marketing",
                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text",
                "price": 2000,
                "duration": "Ongoing",
                "image": "https://s44783.pcdn.co/in/wp-content/uploads/sites/3/2022/02/digital-marketing-2.jpg.optimal.jpg",
                "features": [
                    "Social Media Management",
                    "Content Strategy",
                    "SEO Campaigns"
                ],
                "rating": 4.2,
                "review": 224,
                "support": "Ongoing support"
            },
            {
                "id": 5,
                "name": "Cloud Solutions",
                "category": "Technology",
                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text",
                "price": 5000,
                "duration": "1-2 weeks",
                "image": "https://s3-ap-south-1.amazonaws.com/ricedigitals3bucket/AUPortalContent/2021/08/12060931/Untitled-design-88.png",
                "features": [
                    "Cloud Migration",
                    "DevOps Implementation",
                    "24/7 Monitoring"
                ],
                "rating": 3.8,
                "review": 94,
                "support": "24/7 Monitoring"
            },
            {
                "id": 6,
                "name": "Graphic Design",
                "category": "Design",
                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text",
                "price": 5000,
                "duration": "4-6 weeks",
                "image": "https://www.accesscreative.ac.uk/wp-content/uploads/2024/07/Graphic-design-students-on-work-experience.jpg",
                "features": [
                    "Brand Identity",
                    "Marketing Materials",
                    "Social Media Graphics",
                    "Print Design"
                ],
                "rating": 3.6,
                "review": 105,
                "support": "6 months free support"
            }
        ]
    }
];

const serviceAPI = {

    fetchServices: async () => {

        await new Promise(resolve => setTimeout(resolve, 1000));

        return mockDatas;
    },

    bookingService: async (serviceID, bookingData) => {

        // simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        const data = {
            id: Date.now(),
            serviceID,
            ...bookingData,
            status: 'confirmed',
            bookingDate: new Date().toISOString()
        }

        console.log("BOOKING_CONFIRMED", {
            serviceID,
            booking: data,
        });
        return data;
    }

}

export const fetchServices = createAsyncThunk('service/fetchServices', async (_, rejectWithValue) => {
    
    try{
        const data = await serviceAPI.fetchServices();
        return data;
    }catch(error){
        return rejectWithValue(error.message);
    }

});

export const fetchBookServices = createAsyncThunk('service/fetchBookServices', async ({serviceID, bookingData}, {rejectWithValue}) => {
    
    try{
        const data = await serviceAPI.bookingService(serviceID, bookingData);
        return data;
    }catch(error){
        return rejectWithValue(error.message);
    }

});

const servicesSlice = createSlice({

    name: 'services',

    initialState:{
        items: [],
        bookings: [],
        loading: false,
        bookingLoading: false,
        error: null,
        bookingError: null,

        filters: {
            category: 'All',
            priceRange: { min: 0, max: 10000 },
            rating: 0
        }
    },

    reducers: {
        clearError: (state) => {
            state.error = null,
            state.bookingError = null
        },
        setFilters(state, action){
            state.filters = {...state.filters, ...action.payload};
        },
        clearFilters(state){
            state.filters = {
                category: 'All',
                priceRange: { min: 0, max: 10000 },
                rating: 0 
            }
        }
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchServices.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchServices.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload[0].datas;
        })
        .addCase(fetchServices.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to load services';
        })
        .addCase(fetchBookServices.pending, (state) => {
            state.bookingLoading = true;
            state.bookingError = null;
        })
        .addCase(fetchBookServices.fulfilled, (state, action) => {
            state.bookingLoading = false;
            state.bookings.push(action.payload);
        })
        .addCase(fetchBookServices.rejected, (state, action) => {
            state.bookingLoading = false;
            state.bookingError = action.error.message || 'Failed to load booking services';
        })
    }

});

export const { setFilters, clearFilters, clearError } = servicesSlice.actions;
export default servicesSlice.reducer;