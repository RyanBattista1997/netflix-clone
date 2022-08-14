import { configureStore } from "@reduxjs/toolkit";
import headerReducer from './headerSlice'

const store = configureStore({
    reducer: {
        header: headerReducer,
    }
})

export default store;