"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { signUp } from "@/services/api";

const RegisterForm = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    companyName: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    companyName: Yup.string().required("Company Name is required"),
  });

  const handleSubmit = (values) => {
    // Handle form submission and data storage here
    console.log(values);
    signUp(data, headerData)
          .then((res) => {
          alert('Success');
          Router.push()
          })
          .catch((err) => {
            alert('Facing issue with the registration try after some time  ');
          })
  };

  return (
    <div>
      <div className="col-lg-6 mb-5">
        <ul
          className="nav nav-pills nav-justified mb-3"
          id="ex1"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <Link
              className="nav-link"
              href="/register"
              role="tab"
              aria-controls="pills-register"
              aria-selected="true"
            >
              Register
            </Link>
          </li>
          <li className="nav-item" role="presentation">
            <Link
              className="nav-link active"
              href="/login"
              role="tab"
              aria-controls="pills-login"
              aria-selected="false"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-lg">
            <div className="card-body">
              <h5 className="card-title text-center mb-4">Register</h5>
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
                    <label htmlFor="companyName" className="form-label">
                      Company Name
                    </label>
                    <Field
                      type="text"
                      id="companyName"
                      name="companyName"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="companyName"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-block">
                    Sign up
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
