import { getProductReducer } from "./productReducers";
import { combineReducers } from "redux";
const rootReducers = combineReducers({
  getProductsData: getProductReducer,
});
export default rootReducers;
