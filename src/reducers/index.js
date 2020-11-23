import { combineReducers } from "redux";
import machinesReducer from "./machinesReducer";

export default combineReducers({
  machines: machinesReducer,
});