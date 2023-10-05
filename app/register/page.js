"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signUp } from "@/services/api";
import "bootstrap/dist/css/bootstrap.css";
import { useRouter } from "next/navigation";
import Snackbar from "../components/snackbar/page";

const RegisterForm = () => {
  const [result, setResult] = useState(null);
  const router = useRouter();
  const handleCloseSnackbar = () => {
    setResult(null);
  };

  const initialValues = {
    name: "",
    email: "",
    password: "",
    company: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    company: Yup.string().required("Company Name is required"),
  });

  const handleSubmit = (values) => {
    console.log(values);
    signUp(values)
      .then((res) => {
        setResult({ success: true, message: "Registered successfully!" });
      router.push("/login");
      })
      .catch((err) => {
        console.log(err.response.data.message, "eroorr");
        setResult({ success: false, error: err.response.data.message });
      });
  };

  return (
    <div className="card-body p-5 ">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-lg">
            <div className="card-body">
              <h2 className="fw-bold mt-2 mb-4 text-uppercase card-title text-center">
                Registration
              </h2>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-danger"
                    />
                  </div>

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
                  </div>

                  <div className="mb-3">
                    <label htmlFor="company" className="form-label">
                      Company Name
                    </label>
                    <Field
                      type="text"
                      id="company"
                      name="company"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="company"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <p>
                    Already a member? <a href="/login">Login</a>
                  </p>
                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Sign Up
                    </button>
                  </div>
                </Form>
              </Formik>
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
    </div>
  );
};

export default RegisterForm;
