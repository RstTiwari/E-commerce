"use-strict"
import  {createStore  , combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";


const reducer = combineReducers({})
let intialState = {}
const middleWare = [thunk]
const store = createStore(
    reducer ,
    intialState,
     composeWithDevTools(applyMiddleware(...middleWare)))


export default store
