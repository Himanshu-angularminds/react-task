"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.css";
import { socialLogin, userLogin } from "@/services/api";
import Snackbar from "../components/snackbar/page";
import ModelForget from "../components/Model/ModelForget";
import GoogleLogin from "@dump-work/react-google-login";
import Script from "next/script";

const LoginForm = () => {
  const router = useRouter();
  const siteKey = process?.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const googleSecretKey = process?.env.NEXT_PUBLIC_GOOGLE_SECRET_KEY;

  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState(null);
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
      let captcha = await reCAPTCHA();
      const { email, password } = values;
      const formData = {
        email,
        password,
        captcha,
      };
      const res = await userLogin(formData);
      setResult({ success: true, message: "Login Successfully!" });
      const { token } = res;
      localStorage.setItem("UserData", token);
      router.push("/my-profile");
    } catch (error) {
      setResult({ success: false, error: error.response?.data?.message });
      console.error(error);
    }
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

  const handleGoogleResponse = async (response) => {
    try {
      let reCaptcha = await reCAPTCHA();
      const { tokenObj } = response;
      const data = {
        token: tokenObj.id_token,
        captcha: reCaptcha,
      };
      const res = await socialLogin(data);
      setResult({ success: true, message: "Login Successfully!" });
      const { token } = res;
      localStorage.setItem("UserData", token);
      router.push("/my-profile");
    } catch (error) {
      setResult({ success: false, error: error.response?.data?.message });
      console.error(error);
    }
  };

  return (
    <div>
      <Script src="https://www.google.com/recaptcha/api.js?render=6LevmbQZAAAAAMSCjcpJmuCr4eIgmjxEI7bvbmRI" />
      <section style={{ backgroundColor: "#DC3545" }}>
        <div className="container py-5 ">
          <div className="row d-flex justify-content-center align-items-center ">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="login_image.svg"
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
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
                            <span className="h1 fw-bold mb-0">Login</span>
                          </div>

                          <h5
                            className="fw-normal mb-3 pb-3"
                            style={{ letterSpacing: "1px" }}
                          >
                            Sign into your account
                          </h5>

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
                            {/* <label className="form-label" for="form2Example17">
                              Email address
                            </label> */}
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

                          <div className="pt-1 mb-4">
                            <button
                              type="submit"
                              className="btn btn-outline-danger btn-lg "
                            >
                              Sign In
                            </button>

                            <div className="ml-3 btn mr-3">
                              <GoogleLogin
                                clientId={googleSecretKey}
                                buttonText="Continue with google "
                                onSuccess={handleGoogleResponse}
                                onFailure={handleGoogleResponse}
                                cookiePolicy={"single_host_origin"}
                              />
                            </div>
                          </div>
                          <a
                            className="small text-muted"
                            href="#!"
                            onClick={() => setShowModal(true)}
                          >
                            Forgot password?
                          </a>
                          <p
                            className="mb-5 pb-lg-2"
                            style={{ color: "#393f81" }}
                          >
                            Dont have an account?{" "}
                            <a href="/register" style={{ color: "#393f81" }}>
                              Register here
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
      <ModelForget
        showModal={showModal}
        closeModal={() => setShowModal(false)}
      />
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
