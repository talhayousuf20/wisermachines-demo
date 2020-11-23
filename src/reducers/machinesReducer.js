import {
  GET_ALL_MACHINES,
  GET_LAST_24H_DATA,
  // GET_LIVE_DATA,
} from "../actions/types";

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

    // case GET_LIVE_DATA:
    //   return {
    //     ...state,
    //     newData: action.payload,
    //   };

    default:
      return state;
  }
}
