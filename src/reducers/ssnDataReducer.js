import { FETCH_SSNDATA } from '../actions/types';

const initialState = {
	packets: [],
};

export default function (state = initialState, action) {
	switch (action.type) {
		case FETCH_SSNDATA:
			return {
				...state,
				items: action.payload,
			};

		default:
			return state;
	}
}
