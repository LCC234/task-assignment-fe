import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../services/base";
import { setupListeners } from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;


export default store;
