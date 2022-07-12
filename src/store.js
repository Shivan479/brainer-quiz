import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'
// import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import rootReducer from './reducers';

const initialState = {
  app_name: 'Brainer Quiz',
};


const persistConfig = {
  // configuration object for redux-persist
  key: 'root',
  storage: AsyncStorage, // define which storage to use
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(logger));
const persistor = persistStore(store);
export {store, persistor};
// export default store;
