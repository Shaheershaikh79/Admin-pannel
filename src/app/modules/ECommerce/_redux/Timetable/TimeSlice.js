import { createSlice } from "@reduxjs/toolkit";
const initialTimetableList = {
  entities: null,
  error: null,
  listLoading: false,
  actionsLoading: false,
};

export const callTypes = {
  list: "list",
  action: "action",
};

export const timeTableSlice = createSlice({
  name: "Timetables",
  initialState: initialTimetableList,

  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;

      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    timeTableCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.timetable);
    },
  },
});
