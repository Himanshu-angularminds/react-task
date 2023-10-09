'use client';

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userProfilePasswordUpdate } from "@/services/api";
import Snackbar from "../snackbar/page";
import "bootstrap/dist/css/bootstrap.css";

const ModelChangePassword = ({ showModal, closeModal, onSubmit }) => {
  let userBearer;
  const [result, setResult] = useState(null);
  const handleCloseSnackbar = () => {
    setResult(null);
  };
  if (typeof window !== "undefined") {
    userBearer = localStorage.getItem("UserData");
  }
  const formik = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
    },
    validationSchema: Yup.object({
      old_password: Yup.string().required("Old Password is required"),
      new_password: Yup.string().required("New Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      // await fetch("/api/index.js").then((res)=>{
      //   console.log("ress ::", res.status);
      // }).catch((err)=>{
      //   console.log("err::", err);
      // });
      await userProfilePasswordUpdate(values,userBearer)
        .then((res) => {
            closeModal();
            setResult({ success: true, message: "Password Changed Successfully!" });
            resetForm();
        })
        .catch((err) => {
          setResult({ success: false, error: err.response.data.message });
          console.log(err, "Password Update API Error ");
        });
      // Perform validation or other actions if needed
      // onSubmit(values);
      // Reset form values
    },
  });

  return (
    <>
    <div
      className={`modal fade ${showModal ? "show" : ""} mt-5`}
      tabIndex="-1"
      style={{ display: showModal ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Change Password</h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="old_password" className="form-label">
                  Old Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="old_password"
                  {...formik.getFieldProps("old_password")}
                />
                {formik.touched.old_password && formik.errors.old_password ? (
                  <div className="text-danger">{formik.errors.old_password}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="new_password" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="new_password"
                  {...formik.getFieldProps("new_password")}
                />
                {formik.touched.new_password && formik.errors.new_password ? (
                  <div className="text-danger">{formik.errors.new_password}</div>
                ) : null}
              </div>
              <button type="submit" className="btn btn-danger">
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          zIndex: "9999",
        }}
      >
        {result && <Snackbar result={result} onClose={handleCloseSnackbar} />}
      </div>
    </>
  );
};

export default ModelChangePassword;
