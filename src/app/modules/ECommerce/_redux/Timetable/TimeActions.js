import * as requestFromServer from "./TimeCrud";
import { timeTableSlice, callTypes } from "./TimeSlice";

const { actions } = timeTableSlice;

export const createTimetable = (timetableForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));

  return requestFromServer
    .createTimetable(timetableForCreation)

    .then((response) => {
      const { timetable } = response.data;
      dispatch(actions.timeTableCreated({ timetable }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create customer";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
