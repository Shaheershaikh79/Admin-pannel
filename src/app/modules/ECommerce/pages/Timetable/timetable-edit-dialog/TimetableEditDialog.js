import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/Timetable/TimeActions";
import { TimetableEditForm } from "./TimetableEditForm";
import { useTimetablesUIContext } from "../TimetableUIContext";
import { TimetableEditDialogHeader } from "./TimetableEditDialogHeader";

export function TimetableEditDialog({ id, show, onHide }) {
  // Customers UI Context
  const timetableUIContext = useTimetablesUIContext();

  const timetableUIProps = useMemo(() => {
    return {
      initTimetable: timetableUIContext.initTimetable,
    };
  }, [timetableUIContext]);

  // Customers Redux state
  const dispatch = useDispatch();
  // const { actionsLoading, customerForEdit } = useSelector(
  //   (state) => ({
  //     actionsLoading: state.customers.actionsLoading,
  //     customerForEdit: state.customers.customerForEdit,
  //   }),
  //   shallowEqual
  // );

  // useEffect(() => {
  //   // server call for getting Customer by id
  //   dispatch(actions.fetchCustomer(id));
  // }, [id, dispatch]);

  // server request for saving customer
  const saveTimetable = (timetable) => {
    // if (!id) {
    //   // server request for creating customer
    //   dispatch(actions.createCustomer(timetable)).then(() => onHide());
    // } else {
    //   // server request for updating customer
    //   // dispatch(actions.updateCustomer(timetable)).then(() => onHide());
    // }

    // console.log("here is values in main component", timetable);\

    dispatch(actions.createTimetable(timetable)).then(() => onHide());
  };
  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <TimetableEditDialogHeader id={id} />
      <TimetableEditForm
        saveTimetable={saveTimetable}
        actionsLoading={false}
        timetable={timetableUIProps.initTimetable}
        onHide={onHide}
      />
    </Modal>
  );
}
