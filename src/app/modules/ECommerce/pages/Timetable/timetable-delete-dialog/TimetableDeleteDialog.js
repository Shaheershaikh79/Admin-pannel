import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/Timetable/TimeActions";
import { useTimetablesUIContext } from "../TimetableUIContext";

export function TimetableDeleteDialog({ id, show, onHide }) {
  // Customers UI Context
  const timeTablesUIContext = useTimetablesUIContext();
  const timeTablesUIProps = useMemo(() => {
    return {
      setIds: timeTablesUIContext.setIds,
      queryParams: timeTablesUIContext.queryParams,
    };
  }, [timeTablesUIContext]);
  const dispatch = useDispatch();
  // Customers Redux state

  // const { isLoading } = useSelector(
  //   (state) => ({ isLoading: state.customers.actionsLoading }),
  //   shallowEqual
  // );

  // if !id we should close modal
  // useEffect(() => {
  //   if (!id) {
  //     onHide();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [id]);

  // // looking for loading/dispatch
  // useEffect(() => {}, [isLoading, dispatch]);

  const deleteCustomer = () => {
    dispatch(actions.DeleteTimetable(id)).then(() => {
      dispatch(actions.fetchtimeTables(timeTablesUIProps.queryParams));
      timeTablesUIProps.setIds([]);
      onHide();
    });
    // dispatch(
    //   actions.deleteTimetable(id).then(() => {
    //     onHide();
    //   })
    // );
    //   // server request for deleting customer by id
    //   // dispatch(actions.deleteCustomer(id)).then(() => {
    //   //   // refresh list after deletion
    //   //   dispatch(actions.fetchCustomers(timeTablesUIProps.queryParams));
    //   //   // clear selections list
    //   //   timeTablesUIProps.setIds([]);
    //   //   // closing delete modal
    //   //   onHide();
    //   dispatch(actions.deleteTimetable(id)).then(() => {
    //     // dispatch(actions.fetchtimeTables(timeTablesUIProps.queryParams));
    //     onHide();
    //   });
    //   console.log("caleed");
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {/* {isLoading && <ModalProgressBar />} */}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Customer Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* {!isLoading && ( */}
        <span>Are you sure to permanently delete this customer?</span>
        {/* )} */}
        {/* {isLoading && <span>Customer is deleting...</span>} */}
        {/* <span>Customer is deleting...</span> */}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={() => deleteCustomer()}
            className="btn btn-primary btn-elevate"
          >
            Delete1
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
