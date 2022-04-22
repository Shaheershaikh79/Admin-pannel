// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/Timetable/TimeActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
  getSelectRow,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../TimetableUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useTimetablesUIContext } from "../TimetableUIContext";

export function TimeTables() {
  // Customers UI Context
  const timetableUIContext = useTimetablesUIContext();
  const timetablesUIProps = useMemo(() => {
    return {
      ids: timetableUIContext.ids,
      setIds: timetableUIContext.setIds,
      queryParams: timetableUIContext.queryParams,
      setQueryParams: timetableUIContext.setQueryParams,
      openEditCustomerDialog: timetableUIContext.openEditCustomerDialog,
      openDeleteTimetableDialog: timetableUIContext.openDeleteTimetableDialog,
    };
  }, [timetableUIContext]);

  // const currentState

  // Getting curret state of customers list from store (Redux)
  // const { currentState } = useSelector(
  //   (state) => ({ currentState: state.customers }),
  //   shallowEqual
  // );
  // const { totalCount, entities, listLoading } = currentState;
  // console.log(totalCount, "here is total count");
  // console.log(entities, "here is entries");

  // Customers Redux state
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   // clear selections list
  //   customersUIProps.setIds([]);
  //   // server call by queryParams
  //   dispatch(actions.fetchCustomers(customersUIProps.queryParams));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [customersUIProps.queryParams, dispatch]);

  // Table columns
  const { currentState } = useSelector(
    (state) => ({ currentState: state.Timetables }),
    shallowEqual
  );

  const entities = currentState.entities;
  const totalCount = currentState.totalCount;
  const listLoading = useState.listLoading;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchtimeTables(timetablesUIProps.queryParams));
  }, [timetablesUIProps.queryParams, dispatch]);

  console.log("QP", timetablesUIProps.queryParams);

  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "firstName",
      text: "Firstname",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "lastName",
      text: "Lastname",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "Gender",
      text: "Gender",
      sort: false,
      sortCaret: sortCaret,
    },
    {
      dataField: "subject",
      text: "Subject",
      sort: false,
      sortCaret: sortCaret,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      sortCaret: sortCaret,
      formatter: columnFormatters.StatusColumnFormatter,
      headerSortingClasses,
    },
    {
      dataField: "type",
      text: "Type",
      sort: true,
      sortCaret: sortCaret,
      formatter: columnFormatters.TypeColumnFormatter,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditCustomerDialog: timetablesUIProps.openEditCustomerDialog,
        openDeleteTimetableDialog: timetablesUIProps.openDeleteTimetableDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    pageSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: timetablesUIProps.queryParams.pageSize,
    page: timetablesUIProps.queryParams.pageNumber,
  };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                remote
                keyField="id"
                // data={entities === null ? [] : entities}
                data={entities === 0 ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  timetablesUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: timetablesUIProps.ids,
                  setIds: timetablesUIProps.setIds,
                })}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
