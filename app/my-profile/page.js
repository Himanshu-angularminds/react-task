"use client";
import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import AuthGuard from "@/utils/authGuard";
import { userProfile } from "@/services/api";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.css";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  let userBearer;
  const router = useRouter();

  if (typeof window !== "undefined") {
    userBearer = localStorage.getItem("UserData");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userProfile(userBearer); 
        setUserData(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const initialValues = {
    name: userData?.name || "",
    email: userData?.email || "",
    role: userData?.role || "",
    isEmailVerified: userData?.isEmailVerified || "",
    companyName: userData?.companyName || "",
  };
  console.log(initialValues, "initialValues");
 

  // const logout = () => {
  //   localStorage.removeItem("UserData");
  //   router.push('/')
  // };

  return (
    <>
      <AuthGuard>
        <div className="container rounded bg-white mt-5 mb-5">
          <div className="row justify-content-center">
            <div className="col-md-4 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img
                  className="rounded-circle mt-5"
                  src="https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/h0kvromeujgdyexmj42o"
                  width="150px"
                  alt="Profile Picture"
                />
                <span className="font-weight-bold">{userData?.name}</span>
                <span className="text-black-50">{userData?.email}</span>
              </div>
            </div>
            <div className="col-md-6 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Profile Settings</h4>
                </div>
                <Formik
                  initialValues={initialValues}
                  // validationSchema={validationSchema}
                  // onSubmit={handleSubmit}
                >
                  <Form>
                    <div className="col mt-2 mb-2">
                      <label className="labels">Name</label>
                      <Field
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="col-md-12 mb-2">
                      <label className="labels">Email ID</label>
                      <Field
                        type="text"
                        name="email"
                        className="form-control"
                        placeholder="Enter Email ID"
                      />
                    </div>
                    <div className="col-md-12 mb-2">
                      <label className="labels">Role</label>
                      <Field
                        type="text"
                        name="role"
                        className="form-control"
                        placeholder="Role"
                      />
                    </div>
                    <div className="col-md-12 mb-2">
                      <label className="labels">Is Email Verified</label>
                      <Field
                        type="text"
                        name="isEmailVerified"
                        className="form-control"
                        placeholder="Is Email Verified"
                      />
                    </div>
                    <div className="col-md-12 mb-2">
                      <label className="labels">Company Name</label>
                      <Field
                        type="text"
                        name="companyName"
                        className="form-control"
                        placeholder="Company Name"
                      />
                    </div>
                    <div className="mt-5 text-center">
                      <button
                        className="btn btn-primary profile-button"
                        // onClick={logout()}
                      >
                        Logout
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </AuthGuard>
    </>
  );
};

export default Profile;
