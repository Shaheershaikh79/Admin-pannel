import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./TimetableUIHelpers";

const TimetableUIContext = createContext();

export function useTimetablesUIContext() {
  return useContext(TimetableUIContext);
}

export const TimetableUIConsumer = TimetableUIContext.Consumer;

export function TimetableUIProvider({ TimetableUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const initTimetable = {
    id: undefined,
    frstName: "",
    lastiName: "",
    email: "",
    status: 0,
    dateOfBbirth: "",
    type: 1,
    subject: "English",
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initTimetable,
    newTimetableButtonClick: TimetableUIEvents.newTimetableButtonClick,
    openEditTimetablePage: TimetableUIEvents.openEditTimetablePage,
    openDeleteTimetableDialog: TimetableUIEvents.openDeleteTimetableDialog,
    openDeleteTimetablesDialog: TimetableUIEvents.openDeleteTimetablesDialog,
    openFetchTimetablesDialog: TimetableUIEvents.openFetchTimetablesDialog,
    openUpdateTimetablesStatusDialog:
      TimetableUIEvents.openUpdateTimetablesStatusDialog,
  };

  return (
    <TimetableUIContext.Provider value={value}>
      {children}
    </TimetableUIContext.Provider>
  );
}
