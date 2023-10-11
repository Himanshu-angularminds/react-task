"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Snackbar from "../snackbar/page";
import {
  CreateUser,
  GetUserDetail,
  UpdateUserDetail,
  UpdateUserRole,
} from "@/services/usersApi";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";

const UserAdd = ({ show, handleClose, userId, setRefreshApi }) => {
  const [result, setResult] = useState(null);
  const userBearer = localStorage.getItem("UserData");
  const isEditMode = userId !== null;
  const handleCloseSnackbar = () => {
    setResult(null);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name Required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email Required"),
      password: isEditMode
        ? Yup.string()
        : Yup.string().required("Password Required"),
      role: Yup.string().required("Role Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (isEditMode) {
          const { email, name } = values;
          const updateData = {
            email,
            name,
          };
      
          await UpdateUserDetail(userId, updateData, userBearer);
          setRefreshApi(true);
          handleClose();
          resetForm();
          setResult({
            success: true,
            message: "User Updated Successfully!",
          });
        } else {
          await CreateUser(values, userBearer);
          setRefreshApi(true);
          handleClose();
          resetForm();
          setResult({
            success: true,
            message: "User Created Successfully!",
          });
        }
      } catch (error) {
        console.error("User API Error: ", error);
      
        let errorMessage = "An error occurred";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      
        setResult({
          success: false,
          error: errorMessage,
        });
      }
      
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetUserDetail(userId, userBearer);
        formik.setValues({
          name: response?.name || "",
          email: response?.email || "",
          role: response?.role || "",
        });
      } catch (error) {
        console.error("Get User Detail API Error: ", error);
      }
    };
  
    if (isEditMode) {
      fetchData();
    }
  }, [isEditMode, userBearer, userId]);
  

  const handleRoleUpdate = async (userId, updatedRole) => {

    const role = { role: updatedRole };
    try {
      UpdateUserRole(userId, role, userBearer);
      setRefreshApi(true);
      handleClose();
      resetForm();
      setResult({
        success: true,
        message: "Role Updated Successfully!",
      });
    } catch (error) {
      setResult({
        success: false,
        error: error.response?.data?.message || "An error occurred",
      });
    }
  };

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
              <h5 className="modal-title">
                {!isEditMode ? "Add User" : "Update User"}
              </h5>
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
                {!isEditMode && (
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
                      <div className="text-danger">
                        {formik.errors.password}
                      </div>
                    ) : null}
                  </div>
                )}
                <div className="row mt-2">
                  <div className="col-md-6">
                    <label className="form-label">Role</label>
                    <select
                      className="form-select"
                      id="role"
                      {...formik.getFieldProps("role")}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                    {formik.touched.role && formik.errors.role ? (
                      <div className="text-danger">{formik.errors.role}</div>
                    ) : null}
                  </div>
                  <div className="col-md-5">
                    <button
                      className="btn btn-danger mt-4 d-flex form-label"
                      onClick={() => {
                        handleRoleUpdate(userId, formik.values.role);
                      }}
                    >
                      Role Update
                    </button>
                  </div>
                </div>
                <hr />
                <button
                  type="submit"
                  className="btn btn-danger mt-3 d-flex justify-content-center"
                >
                  {!isEditMode ? "Create User" : "Update User"}
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
