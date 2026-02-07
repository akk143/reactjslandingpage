import { configureStore } from '@reduxjs/toolkit';
import testimonialSlice from './testimonialSlice';
import contactFormSlice from './contactFormSlice';
import furnitureReducer from './furnitureSlice';
import customerReducer from './customerSlice'
import propertyReducer from './propertySlice'
import serviceReducer from './serviceSlice'

export default configureStore({

    reducer: {
        testimonials: testimonialSlice,
        contactforms: contactFormSlice,
        furnitures: furnitureReducer,
        customers: customerReducer,
        properties: propertyReducer,
        services: serviceReducer
    }

});