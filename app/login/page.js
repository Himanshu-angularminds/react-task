"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.css";
import { userLogin } from "@/services/api";
import Snackbar from "../components/snackbar/page";
import ModelForget from "../components/Model/ModelForget";

const LoginForm = () => {
  const [result, setResult] = useState(null);
  const router = useRouter();
  const siteKey = process?.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const [showModal, setShowModal] = useState(false);

  const handleCloseSnackbar = () => {
    setResult(null);
  };
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values) => {
    let captcha = await reCAPTCHA();
    const { email, password } = values;
    const formData = {
      email,
      password,
      captcha,
    };
    await userLogin(formData)
      .then((res) => {
        setResult({ success: true, message: "Login Successfully!" });
        const { token } = res;
        localStorage.setItem("UserData", token);
        if (res) {
          router.push("/my-profile");
        }
      })
      .catch((err) => {
        setResult({ success: false, error: err.response.data.message });
        console.log(err, "getting error api ");
      });
  };

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
    <div>
      <div className="row justify-content-center mb-5 mt-5">
        <div className="col-lg-6">
          <div className="card shadow-lg">
            <div className="card-body">
              <h2 className="fw-bold mt-2 mb-4 text-uppercase card-title text-center">
                Login
              </h2>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger"
                    />
                    <div className="row mb-4 mt-5">
                      <div className="col d-flex justify-content-center">
                        <p>
                          Dont have an account? <a href="/register">Sign Up</a>
                        </p>
                      </div>
                      <div className="col">
                        <a href="#!" onClick={() => setShowModal(true)}>Forgot password?</a>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" className="btn btn-danger btn-lg">
                      Sign In
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <ModelForget showModal={showModal} closeModal={() => setShowModal(false)} />
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
    </div>
  );
};

export default LoginForm;
