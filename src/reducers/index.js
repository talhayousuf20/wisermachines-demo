import { combineReducers } from "redux";
import machinesReducer from "./machinesReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  machines: machinesReducer,
  errors: errorReducer,
});
