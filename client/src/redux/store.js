import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
import userReducer from "./userRedux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

    //if any reducer without persist on reloading and any with persist then

    // const persistedReducer = persistReducer(persistConfig, userReducer);
    // export const store = configureStore({
    //   reducer: {
    //         user: persistedReducer,
    //         cart:cartReducer         //for example: not persist on reloading
    // },

    //   //if any reducer with persist
    //   reducer:{
    //       user: persist
    //   }
    //   middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({
    //       serializableCheck: {
    //         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //       },
    //     }),
    // });

    
    
    //with all reducers persist on reloading

    const rootReducer = combineReducers({ user: userReducer, cart: cartReducer });

    const persistedReducer = persistReducer(persistConfig, rootReducer);
    
    export const store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
    });
    
    export let persistor = persistStore(store);