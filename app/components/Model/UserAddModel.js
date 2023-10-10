"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Snackbar from "../snackbar/page";
import { CreateUser } from "@/services/usersApi";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";

const UserAdd = ({ show, handleClose, handleSubmit }) => {
  const [result, setResult] = useState(null);
  const handleCloseSnackbar = () => {
    setResult(null);
  };
  let userBearer;
  if (typeof window !== "undefined") {
    userBearer = localStorage.getItem("UserData");
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name Required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email Required"),
      password: Yup.string().required("Password Required"),
      role: Yup.string().required("Role Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
    //   console.log(values, "values");
      console.log(values, userBearer,":::inSubmit");
      await CreateUser(values, userBearer)
        .then((res) => {
          console.log(res, "from the user add");
          handleClose();
          setResult({
            success: true,
            message: "User Added Successfully!",
          });
          resetForm();
        })
        .catch((err) => {
          setResult({ success: false, error: err.response.data.message });
          console.log(err, "User Create API Error ");
        });
    },
  });

  return (
    <>
      <div
        className={`modal fade ${show ? "show" : ""} mt-5`}
        tabIndex="-1"
        style={{ display: show ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add User</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <label className="form-label">Name*</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      id="name"
                      {...formik.getFieldProps("name")}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <div className="text-danger">{formik.errors.name}</div>
                    ) : null}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email*</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-danger">{formik.errors.email}</div>
                    ) : null}
                  </div>
                </div>
                <div className="mt-3 mb-3">
                  <label htmlFor="password" className="form-label">
                    Password*
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    {...formik.getFieldProps("password")}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-danger">{formik.errors.password}</div>
                  ) : null}
                </div>
                <div className="row mt-2">
                  {/* <div className="col-md-6">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      id="password"
                      {...formik.getFieldProps("password")}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div className="text-danger">
                        {formik.errors.password}
                      </div>
                    ) : null}
                  </div> */}
                  <div className="col-md-6">
                    <label className="form-label">Role*</label>
                    <input
                      type="text"
                      className="form-control"
                      id="role"
                      placeholder="Role"
                      {...formik.getFieldProps("role")}
                    />
                    {formik.touched.role && formik.errors.role ? (
                      <div className="text-danger">{formik.errors.role}</div>
                    ) : null}
                  </div>
                  <div className="col-md-5">
                    <button className="btn btn-danger mt-4 d-flex form-label ">
                      Role Update
                    </button>
                  </div>
                </div>
                <hr />
                <button
                  type="submit"
                  className="btn btn-danger mt-3 d-flex justify-content-center"
                >
                  Create User
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

export default UserAdd;
