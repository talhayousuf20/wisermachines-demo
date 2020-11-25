import { GET_ALL_MACHINES, GET_LAST_24H_DATA, ERROR } from "./types";

import { keys_dev } from "../config/keys_dev";
import { isEmpty } from "../utils/parse";

// import io from "socket.io-client";

// const client = io(keys_dev.SERVER, {
//   transports: ["websocket"],
// });

// export const requestLiveData = (machineID) => {
//   client.emit("send-data-demo-machine", { _id: machineID });
// };

// export const getLiveData = (machineID) => (dispatch) => {
//   client.on(`data-demo-machine-${machineID}`, (msg) => {
//     try {
//       if (msg) {
//         dispatch({
//           type: GET_LIVE_DATA,
//           payload: msg,
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   });
// };

export const getAllMachines = () => (dispatch) => {
  try {
    fetch(`${keys_dev.SERVER}/machines`).then((res) =>
      res.json().then((data) => {
        dispatch({
          type: GET_ALL_MACHINES,
          payload: data,
        });
      })
    );
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: "Cannot connect to server",
    });
  }
};

export const getLast24HDataByMachineID = (machineID) => (dispatch) => {
  try {
    fetch(`${keys_dev.SERVER}/data/${machineID}`).then((res) =>
      res.json().then((data) => {
        if (!isEmpty(data)) {
          dispatch({
            type: GET_LAST_24H_DATA,
            payload: data,
          });
        }
      })
    );
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: "Cannot connect to server",
    });
  }
};
