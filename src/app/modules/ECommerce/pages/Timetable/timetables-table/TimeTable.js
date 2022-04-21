// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
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
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../TimetableUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useTimetablesUIContext } from "../TimetableUIContext";

export function TimeTables() {
  // Customers UI Context
  const timetableUIContext = useTimetablesUIContext();
  const customersUIProps = useMemo(() => {
    return {
      ids: timetableUIContext.ids,
      setIds: timetableUIContext.setIds,
      queryParams: timetableUIContext.queryParams,
      setQueryParams: timetableUIContext.setQueryParams,
      openEditCustomerDialog: timetableUIContext.openEditCustomerDialog,
      openDeleteCustomerDialog: timetableUIContext.openDeleteCustomerDialog,
    };
  }, [timetableUIContext]);

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

    const dispatch = useDispatch();
    console.log(customersUIProps.queryParams,"here is query")

    useEffect(()=>{
      dispatch(actions.fetchtimeTables(customersUIProps.queryParams))
    },[customersUIProps.queryParams,dispatch])

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
      dataField: "gender",
      text: "Gender",
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
    // {
    //   dataField: "action",
    //   text: "Actions",
    //   formatter: columnFormatters.ActionsColumnFormatter,
    //   formatExtraData: {
    //     openEditCustomerDialog: customersUIProps.openEditCustomerDialog,
    //     openDeleteCustomerDialog: customersUIProps.openDeleteCustomerDialog,
    //   },
    //   classes: "text-right pr-0",
    //   headerClasses: "text-right pr-3",
    //   style: {
    //     minWidth: "100px",
    //   },
    // },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalCount: 10,
    totalSize: 100,

    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: customersUIProps.queryParams.pageSize,
    page: customersUIProps.queryParams.pageNumber,
  };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination isLoading={false} paginationProps={paginationProps}>
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                remote
                keyField="id"
                // data={entities === null ? [] : entities}
                data={[
                  {
                    id: 1,
                    firstName: "shaheer",
                    lastName: "shaikh",
                    email: "shaheershaikh79@gmail.com",
                    gender: "male",
                    status: "1",
                  },
                  {
                    id: 2,
                    firstName: "shaheer",
                    lastName: "shaikh",
                    email: "shaheershaikh79@gmail.com",
                    gender: "male",
                    status: 0,
                    type: 1,
                  },
                  {
                    id: 3,
                    firstName: "shaheer",
                    lastName: "shaikh",
                    email: "shaheershaikh79@gmail.com",
                    gender: "male",
                    status: 0,
                    type: 1,
                  },
                ]}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  customersUIProps.setQueryParams
                )}
                // selectRow={getSelectRow({
                //   entities,
                //   ids: customersUIProps.ids,
                //   setIds: customersUIProps.setIds,
                // })}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={[]} />
                <NoRecordsFoundMessage entities={[]} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
