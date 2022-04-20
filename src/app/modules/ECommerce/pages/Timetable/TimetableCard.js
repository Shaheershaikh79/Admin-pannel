import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";

// import { CustomersFilter } from "./customers-filter/CustomersFilter";
// import { CustomersTable } from "./customers-table/CustomersTable";
// import { CustomersGrouping } from "./customers-grouping/CustomersGrouping";
import { useTimetablesUIContext } from "./TimetableUIContext";
import { TimetableFilter } from "./timetable-filter/TimetablesFilter";

export function TimetableCard() {
  const timetableUIContext = useTimetablesUIContext();

  const timetableUIProps = useMemo(() => {
    return {
      ids: timetableUIContext.ids,
      newTimetableButtonClick: timetableUIContext.newTimetableButtonClick,
    };
  }, [timetableUIContext]);

  return (
    <Card>
      <CardHeader title="Timetable list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={timetableUIProps.newTimetableButtonClick}
          >
            New Timetable
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <TimetableFilter />
        {/* {customersUIProps.ids.length > 0 && <CustomersGrouping />} */}
        {/* <CustomersTable /> */}
      </CardBody>
    </Card>
  );
}
