"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.css";
import Snackbar from "@/component/snackbar/page";
// import { signIn } from "next-auth/react";
import { userLogin } from "@/services/api";
import { signIn } from "next-auth/react";

const LoginForm = () => {
  const [result, setResult] = useState(null);
  const router = useRouter();
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
    try {
      const response = await userLogin({
        email: values.email,
        password: values.password,
      });
      console.log(response, "API Response");
      if (response.user) {
        // Sign in the user
        console.log("click in singIn");
        try {
          
        signIn("credentials", {
          redirect: false,
          email:JSON.stringify(response)
        });
        } catch (error) {
          console.error("error in sign in ::", error);
        }

        localStorage.setItem("UserData", response.token);
        router.push("/my-profile");
      } else {
        setResult({ success: false, error: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Error during login:", error);

      // Handle specific types of errors if needed
      if (error.statusCode === 401) {
        setResult({ success: false, error: "Invalid credentials" });
      } else {
        setResult({ success: false, error: "Error occurred during login" });
      }
    }
  };

  return (
    <div className="card-body p-5 ">
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
                  </div>
                  <p>
                    Dont have an account? <a href="/register">Sign Up</a>
                  </p>
                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      onClick={() => {
                        console.log("hello");
                        // signIn()
                      }}
                    >
                      Sign In
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

export default LoginForm;
