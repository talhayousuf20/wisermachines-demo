import { combineReducers } from 'redux';
import ssnDataReducer from './ssnDataReducer';

export default combineReducers({
	ssnData: ssnDataReducer,
});
