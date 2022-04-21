import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";

import { useTimetablesUIContext } from "./TimetableUIContext";
import { TimetableFilter } from "./timetable-filter/TimetablesFilter";
// import { CustomersGrouping } from "../customers/customers-grouping/CustomersGrouping";
import { TimeTables } from "./timetables-table/TimeTable";

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
        {/* {timetableUIProps.ids.length > 0 && <CustomersGrouping />} */}
        <TimeTables />
      </CardBody>
    </Card>
  );
}
