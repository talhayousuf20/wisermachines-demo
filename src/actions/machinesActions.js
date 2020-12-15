import { GET_ALL_MACHINES, GET_LAST_24H_DATA, ERROR } from "./types";

import { keys_dev } from "../config/keys_dev";
import { placeholder } from "../data/placeholder";

import { isEmpty } from "../utils/parse";

export const getAllMachines = () => (dispatch) => {
  // try {
  //   fetch(`${keys_dev.SERVER}/machines`).then((res) => {
  //     if (!res.ok) {
  //       dispatch({
  //         type: ERROR,
  //         payload: res.error,
  //       });
  //     } else {
  //       res.json().then((data) => {
  //         dispatch({
  //           type: GET_ALL_MACHINES,
  //           payload: data,
  //         });
  //       });
  //     }
  //   });
  // } catch (err) {
  //   console.log(err);
  // }
  dispatch({
    type: GET_ALL_MACHINES,
    payload: placeholder.machines_kolson,
  });
};

export const getLast24HDataByMachineID = (machineID) => (dispatch) => {
  try {
    fetch(`${keys_dev.SERVER}/data/${machineID}`).then((res) => {
      if (!res.ok) {
        dispatch({
          type: ERROR,
          payload: res.error,
        });
      } else {
        res.json().then((data) => {
          if (!isEmpty(data)) {
            dispatch({
              type: GET_LAST_24H_DATA,
              payload: data,
            });
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};
