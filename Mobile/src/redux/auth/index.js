import { createStore,applyMiddleware } from "redux";
import authReducer from "../../redux/auth/authReducer";
import {createLogger} from 'redux-logger'
const logger = createLogger();

export const store = createStore(authReducer, applyMiddleware(logger))
