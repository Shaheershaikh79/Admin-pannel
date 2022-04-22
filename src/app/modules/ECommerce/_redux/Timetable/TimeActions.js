import * as requestFromServer from "./TimeCrud";
import { timeTableSlice, callTypes } from "./TimeSlice";

const { actions } = timeTableSlice;

export const DeleteTimetable = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletetimetable(id)
    .then((response) => {
      dispatch(actions.timetableDeleted({ id }));
      console.log("res send");
    })
    .catch((error) => {
      console.log("res not send");

      error.clientMessage = "Can't delete customer";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createTimetable = (timetableForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));

  return requestFromServer
    .createTimetable(timetableForCreation)

    .then((response) => {
      const { timetable } = response.data;
      console.log(response, "rep");
      dispatch(actions.timeTableCreated({ timetable }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create customer";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const fetchtimeTables = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));

  return requestFromServer

    .findtimeTables(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data.timeTableList;
      dispatch(actions.timeTablesFetched({ totalCount, entities }));
    })

    .catch((error) => {
      error.clientMessage = "Can't create customer";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
