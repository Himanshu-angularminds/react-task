'use client';

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userForget } from "@/services/api";
import Snackbar from "../snackbar/page";
import "bootstrap/dist/css/bootstrap.css";

const siteKey = process?.env?.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const ModelForget = ({ showModal, closeModal, onSubmit }) => {
  const [result, setResult] = useState(null);

  const handleCloseSnackbar = () => {
    setResult(null);
  };

  const { getFieldProps, handleSubmit, resetForm, touched, errors } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required"),
    }),
    onSubmit: async (values) => {
      try {
        const captcha = await reCAPTCHA();
        const { email } = values;
        const formData = {
          email,
          captcha,
        };
        await userForget(formData);
        closeModal();
        setResult({ success: true, message: "Please Check the mail" });
        resetForm();
      } catch (err) {
        console.log(err.response.data.message, "error");
        setResult({ success: false, error: err.response.data.message });
        console.log(err, "getting error api");
      }
    },
  });

  const reCAPTCHA = () => {
    const { grecaptcha } = window;
    return new Promise((resolve, reject) => {
      grecaptcha.ready(function () {
        grecaptcha
          .execute(siteKey, { action: "submit" })
          .then(function (token) {
            resolve(token);
          })
          .catch(function (err) {
            console.error(err);
            reject(err);
          });
      });
    });
  };

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
              <h5 className="modal-title">Forget Password</h5>
              <button type="button" className="btn-close" onClick={closeModal}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="Email" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    {...getFieldProps("email")}
                  />
                  {touched.email && errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </div>
                <button type="submit" className="btn btn-danger">
                  Submit
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

export default ModelForget;
