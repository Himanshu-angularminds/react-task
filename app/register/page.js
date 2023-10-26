"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signUp } from "@/services/api";
import "bootstrap/dist/css/bootstrap.css";
import { useRouter } from "next/navigation";
import Snackbar from "../components/snackbar/page";
import Lottie from "lottie-react";
import animationData from "../../public/register.json";

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
    <>
      <div>
        <section style={{ backgroundColor: "#DC3545" }}>
          <div className="container py-5 ">
            <div className="row d-flex justify-content-center align-items-center ">
              <div className="col col-xl-10">
                <div className="card" style={{ borderRadius: "1rem" }}>
                  <div className="row g-0">
                    <div className="col-md-6 mt-40px col-lg-5 mt-5">
                      {/* <img
                        src="sign_up.svg"
                        alt="sign_up form"
                        className="img-fluid"
                        style={{ borderRadius: "1rem 0 0 1rem" }}
                      /> */}
                      <Lottie animationData={animationData} />
                    </div>
                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                      <div className="card-body p-4 p-lg-5 text-black">
                        <Formik
                          initialValues={initialValues}
                          validationSchema={validationSchema}
                          onSubmit={handleSubmit}
                        >
                          <Form>
                            <div className="d-flex align-items-center mb-3 pb-1">
                              <i
                                className="fas fa-cubes fa-2x me-3"
                                style={{ color: "#ff6219" }}
                              ></i>
                              <span className="h1 fw-bold mb-0">
                                Registration
                              </span>
                            </div>
                            <div className="form-outline mb-4">
                              <label htmlFor="name" className="form-label">
                                Name
                              </label>
                              <Field
                                type="text"
                                id="name"
                                name="name"
                                className="form-control form-control-lg"
                              />

                              <ErrorMessage
                                name="name"
                                component="div"
                                className="text-danger"
                              />
                            </div>

                            <div className="form-outline mb-4">
                              <label htmlFor="email" className="form-label">
                                Email
                              </label>
                              <Field
                                type="email"
                                id="email"
                                name="email"
                                className="form-control form-control-lg"
                              />
                              <ErrorMessage
                                name="email"
                                component="div"
                                className="text-danger"
                              />
                            </div>

                            <div className="form-outline mb-4">
                              <label htmlFor="password" className="form-label">
                                Password
                              </label>
                              <Field
                                type="password"
                                id="password"
                                name="password"
                                className="form-control form-control-lg"
                              />
                              <ErrorMessage
                                name="password"
                                component="div"
                                className="text-danger"
                              />
                            </div>

                            <div className="form-outline mb-4">
                              <label htmlFor="company" className="form-label">
                                Company Name
                              </label>
                              <Field
                                type="text"
                                id="company"
                                name="company"
                                className="form-control form-control-lg"
                              />
                              <ErrorMessage
                                name="company"
                                component="div"
                                className="text-danger"
                              />
                            </div>

                            <div className="pt-1 mb-4">
                              <button
                                type="submit"
                                className="btn btn-outline-danger btn-lg "
                              >
                                Sign Up
                              </button>
                            </div>

                            <p
                              className="mb-5 pb-lg-2"
                              style={{ color: "#393f81" }}
                            >
                              Already a member{" "}
                              <a href="/login" style={{ color: "#393f81" }}>
                                Login here
                              </a>
                            </p>
                          </Form>
                        </Formik>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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

export default RegisterForm;
