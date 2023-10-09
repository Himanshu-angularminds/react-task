"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userForget, userRestPassword } from "@/services/api";
import Snackbar from "../snackbar/page";
import "bootstrap/dist/css/bootstrap.css";
import { usePathname, useRouter } from "next/navigation";
const siteKey = process?.env?.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const ModelForget = ({ showModal, closeModal, token }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [result, setResult] = useState(null);
  const isResetPassword = pathname === "/auth/reset-password";
  const handleCloseSnackbar = () => {
    setResult(null);
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    password: isResetPassword
      ? Yup.string().required("Password is required")
      : Yup.string(),
  });

  const { getFieldProps, handleSubmit, resetForm, touched, errors } = useFormik(
    {
      initialValues: {
        email: "",
        password: "",
      },
      // validationSchema,
      // onSubmit: async (values) => {
      //   try {
      //     const captcha = await reCAPTCHA();
      //     const { email, password } = values;
      //     let formData = {
      //       email,
      //       captcha,
      //     };

      //     if (isResetPassword) {
      //       formData.password = password;
      //       await userRestPassword(token, formData);
      //     } else {
      //       await userForget(formData);
      //     }
      //     closeModal();
      //     setResult({ success: true, message: "Please Check the mail" });
      //     resetForm();
      //   } catch (err) {
      //     console.error(err);
      //     setResult({ success: false, error: err.response.data.message });
      //   }
      // },
      onSubmit: async (values) => {
        try {
          const { email, password } = values;
          let formData = {
            email,
            captcha: await reCAPTCHA(),
          };
          if (isResetPassword) {
            if (!password) {
              setResult({
                success: false,
                error: "Password is required for reset.",
              });
              return;
            }
            formData = {
              password,
            };
            console.log(formData, "token");
            await userRestPassword(token, formData);
            router.push("/login");
          } else {
            console.log(formData, "formData");
            await userForget(formData);
          }
          closeModal();
          setResult({
            success: true,
            message: "Please check your email for further instructions.",
          });
          resetForm();
        } catch (err) {
          console.error(err);
          setResult({
            success: false,
            error: err.response?.data?.message || "An error occurred.",
          });
        }
      },
    }
  );

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
              <h5 className="modal-title">
                {isResetPassword ? "Reset Password" : "Forget Password"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                {!isResetPassword && (
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
                )}
                {isResetPassword && (
                  <div className="mb-3">
                    <label htmlFor="Password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      {...getFieldProps("password")}
                    />
                    {touched.password && errors.password && (
                      <div className="text-danger">{errors.password}</div>
                    )}
                  </div>
                )}
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
