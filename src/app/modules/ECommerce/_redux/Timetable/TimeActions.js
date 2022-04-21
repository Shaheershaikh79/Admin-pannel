import * as requestFromServer from "./TimeCrud";
import { timeTableSlice, callTypes } from "./TimeSlice";

const { actions } = timeTableSlice;

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








export const fetchtimeTables=(queryParams)=>(dispatch)=>{
  dispatch(actions.startCall({ callType: callTypes.list }));

  return requestFromServer


  .findtimeTables(queryParams)
  .then((response) => {
    console.log(response)
    console.log(response,"here is response")
    const { totalCount, entities } = response.data.timeTableList;
    console.log(totalCount,"here is tc")
    dispatch(actions.timeTablesFetched({ totalCount,entities}));
  })

  .catch((error) => {

    error.clientMessage = "Can't create customer";
    dispatch(actions.catchError({ error, callType: callTypes.action }));
  });

}


