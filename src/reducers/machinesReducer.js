import { GET_ALL_MACHINES, GET_LAST_24H_DATA } from "../actions/types";

const initialState = {
  allMachines: [],
  last24HData: [],
  newData: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_MACHINES:
      return {
        ...state,
        allMachines: action.payload,
      };

    case GET_LAST_24H_DATA:
      return {
        ...state,
        last24HData: action.payload,
      };

    default:
      return state;
  }
}
