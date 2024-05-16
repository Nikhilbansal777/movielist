import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import moviesReducer from "../reducers/moviesReducer";
import { todosApi } from "../reducers/rtkquery";
import searchReducer from "../reducers/searchReducer";
import todoReducer from "../reducers/todoReducer";


const persistConfig = {
    key: "root",
    storage
};

const rootReducer = combineReducers({
    flag: todoReducer,
    search: searchReducer,
    movies: moviesReducer,
    [todosApi.reducerPath]: todosApi.reducer
},);

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }).concat(todosApi.middleware)

}); 