import React from "react";
import { Route } from "react-router-dom";
// import { CustomersLoadingDialog } from "./customers-loading-dialog/CustomersLoadingDialog";
// import { CustomerDeleteDialog } from "./customer-delete-dialog/CustomerDeleteDialog";
// import { CustomersDeleteDialog } from "./customers-delete-dialog/CustomersDeleteDialog";
// import { CustomersFetchDialog } from "./customers-fetch-dialog/CustomersFetchDialog";
// import { CustomersUpdateStateDialog } from "./customers-update-status-dialog/CustomersUpdateStateDialog";
import { TimetableUIProvider } from "./TimetableUIContext";
import { TimetableCard } from "./TimetableCard";
import { TimetableLoadingDialog } from "./timetable-loading-dialog/TimetableLoadingDialog";
import { TimetableEditDialog } from "./timetable-edit-dialog/TimetableEditDialog";

export function Timetable({ history }) {
  const TimetableUIEvents = {
    newTimetableButtonClick: () => {
      history.push("/e-commerce/timetable/new");
    },
    openEditTimetableDialog: (id) => {
      history.push(`/e-commerce/timetable/${id}/edit`);
    },
    openDeleteTimetableDialog: (id) => {
      history.push(`/e-commerce/timetable/${id}/delete`);
    },
    openDeleteTimetablesDialog: () => {
      history.push(`/e-commerce/timetable/deleteCustomers`);
    },
    openFetchTimetableDialog: () => {
      history.push(`/e-commerce/timetable/fetch`);
    },
    openUpdateTimetableStatusDialog: () => {
      history.push("/e-commerce/timetable/updateStatus");
    },
  };

  return (
    <TimetableUIProvider TimetableUIEvents={TimetableUIEvents}>
      <TimetableLoadingDialog />
      <Route path="/e-commerce/timetable/new">
        {({ history, match }) => (
          <TimetableEditDialog
            show={match != null}
            onHide={() => {
              history.push("/e-commerce/timetable");
            }}
          />
        )}
      </Route>
      {/* 

      <Route path="/e-commerce/customers/:id/edit">
        {({ history, match }) => (
          <CustomerEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/e-commerce/customers");
            }}
          />
        )}
      </Route>
      <Route path="/e-commerce/customers/deleteCustomers">
        {({ history, match }) => (
          <CustomersDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/e-commerce/customers");
            }}
          />
        )}
      </Route>

      <Route path="/e-commerce/customers/:id/delete">
        {({ history, match }) => (
          <CustomerDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/e-commerce/customers");
            }}
          />
        )}
      </Route>

      <Route path="/e-commerce/customers/fetch">
        {({ history, match }) => (
          <CustomersFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/e-commerce/customers");
            }}
          />
        )}
      </Route>
      <Route path="/e-commerce/customers/updateStatus">
        {({ history, match }) => (
          <CustomersUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/e-commerce/customers");
            }}
          />
        )}
      </Route> */}

      <TimetableCard />
    </TimetableUIProvider>
  );
}
