import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userProfilePasswordUpdate } from "@/services/api";

const ModelForget = ({ showModal, closeModal, onSubmit }) => {
  let userBearer;

  if (typeof window !== "undefined") {
    userBearer = localStorage.getItem("UserData");
  }
  const formik = useFormik({
    initialValues: {
      old_password: "",
      new_Password: "",
    },
    validationSchema: Yup.object({
      old_password: Yup.string().required("Old Password is required"),
      new_Password: Yup.string().required("New Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log(values,"values for forget");
      await userProfilePasswordUpdate(values,userBearer)
        .then((res) => {
          setResult({ success: true, message: "Data retrieved successfully!" });
          closeModal(); // Close the modal after form submission
          resetForm();
        })
        .catch((err) => {
          setResult({ success: false, error: err.response.data.message });
          console.log(err, "getting error api ");
        });
      // Perform validation or other actions if needed
      // onSubmit(values);
      // Reset form values
    },
  });

  return (
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
                <label htmlFor="new_Password" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="new_Password"
                  {...formik.getFieldProps("new_Password")}
                />
                {formik.touched.new_Password && formik.errors.new_Password ? (
                  <div className="text-danger">{formik.errors.new_Password}</div>
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
  );
};

export default ModelForget;
