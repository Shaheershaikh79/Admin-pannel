// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  Select,
  DatePickerField,
} from "../../../../../../_metronic/_partials/controls";

// Validation schema
const TimetableEditSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Firstname is required"),
  lastName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Lastname is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  subject: Yup.string().required("Subject is required"),
  dateOfBbirth: Yup.mixed()
    .nullable(false)
    .required("Date of Birth is required"),
});

export function TimetableEditForm({
  saveTimetable,

  timetable,
  actionsLoading,
  onHide,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={timetable}
        validationSchema={TimetableEditSchema}
        onSubmit={(values) => {
          saveTimetable(values);
          console.log("called in", values);
          // console.log(values, "val from form");
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  {/* First Name */}
                  <div className="col-lg-4">
                    <Field
                      name="firstName"
                      component={Input}
                      placeholder="First Name"
                      label="First Name"
                    />
                  </div>
                  {/* Last Name */}
                  <div className="col-lg-4">
                    <Field
                      name="lastName"
                      component={Input}
                      placeholder="Last Name"
                      label="Last Name"
                    />
                  </div>
                  {/* Login */}
                </div>
                {/* Email */}
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      type="email"
                      name="email"
                      component={Input}
                      placeholder="Email"
                      label="Email"
                    />
                  </div>
                  {/* Date of birth */}
                  <div className="col-lg-4">
                    <DatePickerField
                      name="dateOfBbirth"
                      label="Date of Birth"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="subject"
                      component={Input}
                      placeholder="subject"
                      label="subject"
                    />
                  </div>
                  {/* IP Address */}
                </div>
                <div className="form-group row">
                  {/* Gender */}
                  <div className="col-lg-4">
                    <Select name="Gender" label="Gender">
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                    </Select>
                  </div>
                  {/* Type */}
                  <div className="col-lg-4">
                    <Select name="type" label="Type">
                      <option value="0">Business</option>
                      <option value="1">Individual</option>
                    </Select>
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                Cancel
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Save
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}